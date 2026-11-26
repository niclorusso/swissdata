#!/usr/bin/env python3
"""
Keep the source watcher's state and its report in ONE GitHub issue (label "sources").

  load-state  choose the issue: the open issue with the label "sources" opened by the
              workflow (if several are open, the most recently updated, and the report
              says so); if none is open, the most recently updated closed one. Read the
              state stored at the bottom of its body. If that issue has no readable state,
              the report says so and the run counts as a first run: no older issue and no
              seed is used in its place. Only when no such issue exists at all is the
              committed seed (scripts/watch/state.json) used.
  publish     after watch.py, on the SAME issue that load-state chose:
              - items to report and the issue is open: rewrite its body (current report and
                state) and, only once that worked, add a comment with the report (one
                notification);
              - items and no open issue: open a new one, titled with the date;
              - no items and no issue at all (first run in CI): open one issue, once, to keep
                the state; it can be closed at once;
              - no items, but the state changed (a failure counter, a gap closed): rewrite the
                body only, without a comment;
              - no items and no change: do nothing.

The state lives in the issue, not in the repository: no commit, no deploy, and the
workflow needs only `issues: write`. The body stays under GitHub's 65,536 characters:
the visible report is shortened, never the state; if the state alone does not fit, the
step fails before sending anything. Standard library only; uses GITHUB_TOKEN.
--dry-run reads only and prints what would be sent.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

API = "https://api.github.com"
LABEL = "sources"
BOT = "github-actions[bot]"
BEGIN, END = "<!-- watch-state:begin", "watch-state:end -->"
BODY_LIMIT = 65536 - 500   # GitHub allows 65,536 characters in an issue body or comment; keep a margin
META_KEYS = ("_issue", "_notes", "_load_error", "_source")


def gh(method, path, token, body=None):
    req = urllib.request.Request(API + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Accept": "application/vnd.github+json",
                                          "X-GitHub-Api-Version": "2022-11-28",
                                          "User-Agent": "SwissData-source-watcher"})
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    if body is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
            return resp.status, (json.loads(data) if data else None)
    except urllib.error.HTTPError as err:
        return err.code, None
    except (urllib.error.URLError, OSError) as err:
        return 0, str(err)


def bot_issues(repo, token):
    status, issues = gh("GET", f"/repos/{repo}/issues?labels={LABEL}&state=all&sort=updated&direction=desc&per_page=50", token)
    if status != 200 or not isinstance(issues, list):
        raise SystemExit(f"cannot list the issues of {repo} (HTTP {status}): stopping rather than guessing the state")
    return [i for i in issues if "pull_request" not in i and (i.get("user") or {}).get("login") == BOT]


def choose_issue(issues):
    """-> (issue or None, notes). Open first, most recently updated; else the most recently updated closed one."""
    notes = []
    by_update = sorted(issues, key=lambda i: i.get("updated_at") or "", reverse=True)
    open_ones = [i for i in by_update if i.get("state") == "open"]
    if len(open_ones) > 1:
        others = ", ".join(f"#{i['number']}" for i in open_ones[1:])
        notes.append(f"{len(open_ones)} open issues have the label '{LABEL}': this run uses #{open_ones[0]['number']} "
                     f"(the most recently updated). Close the others ({others}).")
    chosen = open_ones[0] if open_ones else (by_update[0] if by_update else None)
    return chosen, notes


def extract_state(body):
    """-> (state or None, reason if None)."""
    if not body or BEGIN not in body or END not in body:
        return None, "has no state block"
    raw = body.split(BEGIN, 1)[1].split(END, 1)[0]
    try:
        state = json.loads(raw)
    except ValueError as err:
        return None, f"has a state block that is not valid JSON ({err})"
    if not isinstance(state, dict) or not isinstance(state.get("probes"), dict):
        return None, "has a state block of the wrong shape"
    return state, None


def embed_state(state):
    clean = {k: v for k, v in state.items() if k not in META_KEYS}
    raw = json.dumps(clean, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    raw = raw.replace("-->", "--\\u003e")  # cannot end the HTML comment early
    return f"{BEGIN}\n{raw}\n{END}"


def comparable(state):
    s = {k: v for k, v in (state or {}).items() if k not in META_KEYS and k not in ("run", "note")}
    return json.dumps(s, sort_keys=True)


def make_body(report, state, run_url, started=False):
    head = ("This issue is written by the workflow `.github/workflows/watch-sources.yml` "
            "(`scripts/watch/watch.py`). It changes nothing on the site: each item says which file "
            "and key to edit by hand. The body always shows the latest report; new findings are also "
            "added as comments. Close the issue when the items are dealt with; the next finding opens "
            "a new one. Keep the label `sources`: the watcher finds its issue by it.\n\n")
    if started:
        head += ("**First run: nothing needs doing now.** This issue keeps the watcher's state "
                 "(at the bottom). It can be closed; it is still read when closed.\n\n")
    tail = ("\n\n<details><summary>Watcher state (read by the next run; do not edit)</summary>\n\n"
            + embed_state(state) + "\n</details>\n")
    room = BODY_LIMIT - len(head) - len(tail)
    if room < 400:
        raise SystemExit(f"the watcher state alone needs {len(tail)} characters, more than an issue body holds "
                         f"({BODY_LIMIT}): nothing was sent. Reduce the registry or the stored state.")
    if len(report) > room:
        cut = f"\n\n(Report shortened to fit the issue. The full report is in the job summary: {run_url})"
        report = report[: room - len(cut)] + cut
    return head + report + tail


def shorten(report, run_url):
    if len(report) <= BODY_LIMIT:
        return report
    cut = f"\n\n(Shortened. The full report is in the job summary: {run_url})"
    return report[: BODY_LIMIT - len(cut)] + cut


def cmd_load_state(args):
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    issues = bot_issues(args.repo, token)
    issue, notes = choose_issue(issues)
    if issue is None:
        state = json.loads(Path(args.fallback).read_text("utf-8"))
        state.update(_issue=None, _source=f"seed {args.fallback}", _notes=notes)
        source = f"seed {args.fallback} (no issue with label '{LABEL}' yet)"
    else:
        meta = {"number": issue["number"], "state": issue.get("state"), "updated_at": issue.get("updated_at")}
        state, reason = extract_state(issue.get("body"))
        if state is None:
            state = {"_load_error": f"Issue #{issue['number']} {reason}", "_issue": meta, "_notes": notes}
            source = f"issue #{issue['number']}: {reason} (the run will count as a first run)"
        else:
            state.update(_issue=meta, _source=f"issue #{issue['number']}", _notes=notes)
            source = f"issue #{issue['number']} ({issue.get('state')})"
    Path(args.out).write_text(json.dumps(state, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"state loaded from {source}")
    for n in notes:
        print(f"note: {n}")
    return 0


def plan(args, report, state, summary, previous, run_url):
    """-> list of (method, path, payload). Raises SystemExit if the state cannot fit."""
    issue = previous.get("_issue") if isinstance(previous.get("_issue"), dict) else None
    damaged = bool(previous.get("_load_error"))
    date = summary["date"]
    actions = []
    if summary["has_items"]:
        if issue and issue.get("state") == "open":
            body = make_body(report, state, run_url)
            actions.append(("PATCH", f"/repos/{args.repo}/issues/{issue['number']}", {"body": body}))
            actions.append(("POST", f"/repos/{args.repo}/issues/{issue['number']}/comments", {"body": shorten(report, run_url)}))
        else:
            actions.append(("LABEL", LABEL, None))
            actions.append(("POST", f"/repos/{args.repo}/issues",
                            {"title": f"Source watcher: {date}", "body": make_body(report, state, run_url), "labels": [LABEL]}))
    elif issue is None:
        actions.append(("LABEL", LABEL, None))
        actions.append(("POST", f"/repos/{args.repo}/issues",
                        {"title": f"Source watcher: started on {date}", "body": make_body(report, state, run_url, started=True),
                         "labels": [LABEL]}))
    elif damaged or comparable(state) != comparable(previous):
        actions.append(("PATCH", f"/repos/{args.repo}/issues/{issue['number']}", {"body": make_body(report, state, run_url)}))
    return actions


def cmd_publish(args):
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    out = Path(args.out_dir)
    report = (out / "report.md").read_text("utf-8")
    state = json.loads((out / "state.json").read_text("utf-8"))
    summary = json.loads((out / "summary.json").read_text("utf-8"))
    previous = json.loads(Path(args.previous_state).read_text("utf-8")) if args.previous_state else {}
    run_url = os.environ.get("GITHUB_SERVER_URL", "https://github.com") + f"/{args.repo}/actions/runs/{os.environ.get('GITHUB_RUN_ID', '')}"

    actions = plan(args, report, state, summary, previous, run_url)   # fails here, before sending, if too large
    if args.write_body:
        bodies = [payload["body"] for method, _, payload in actions
                  if payload and (method == "PATCH" or (method == "POST" and "title" in payload))]
        Path(args.write_body).write_text(bodies[0] if bodies else make_body(report, state, run_url), encoding="utf-8")
    if not actions:
        print("nothing to report and the state is unchanged: no issue opened or changed")
        return 0
    for method, path, payload in actions:
        if args.dry_run:
            what = f"{method} {path}"
            if payload and "title" in payload:
                what += f"  title={payload['title']!r} labels={payload['labels']}"
            if payload and "body" in payload:
                what += f"  body: {len(payload['body'])} characters"
            print("dry run, would send:", what)
            continue
        if method == "LABEL":
            status, _ = gh("GET", f"/repos/{args.repo}/labels/{LABEL}", token)
            if status == 404:
                status, _ = gh("POST", f"/repos/{args.repo}/labels", token,
                               {"name": LABEL, "color": "c5def5", "description": "Source watcher: new editions and moved links"})
                if status not in (200, 201):
                    raise SystemExit(f"cannot create the label '{LABEL}' (HTTP {status})")
            continue
        status, _ = gh(method, path, token, payload)
        if status not in (200, 201):
            # stop here: a failed rewrite of the body must not be followed by a comment
            # (otherwise the same comment would come back every day)
            raise SystemExit(f"{method} {path} failed with HTTP {status}; nothing else was sent")
        print(f"{method} {path}: HTTP {status}")
    return 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("load-state")
    a.add_argument("--repo", required=True)
    a.add_argument("--out", required=True)
    a.add_argument("--fallback", required=True, help="seed state, used only when no watcher issue exists")
    b = sub.add_parser("publish")
    b.add_argument("--repo", required=True)
    b.add_argument("--out-dir", required=True)
    b.add_argument("--previous-state", required=True, help="the file written by load-state (it names the issue)")
    b.add_argument("--dry-run", action="store_true", help="send nothing; print what would be sent")
    b.add_argument("--write-body", help="write the issue body that would be sent to this file")
    args = ap.parse_args(argv)
    return cmd_load_state(args) if args.cmd == "load-state" else cmd_publish(args)


if __name__ == "__main__":
    sys.exit(main())
