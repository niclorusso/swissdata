#!/usr/bin/env python3
"""
Keep the source watcher's state and its report in ONE GitHub issue (label "sources").

  load-state  find the newest issue with label "sources" opened by the workflow and
              read the state stored at the bottom of its body; without one, copy the
              fallback (the seed state committed in scripts/watch/state.json).
  publish     after watch.py:
              - items to report and an open issue: add a comment with the report
                (one notification) and refresh the state in the issue body;
              - items and no open issue: open one, titled with the date;
              - no items, but the state changed (a failure counter, a gap closed):
                rewrite only the state in the newest issue, without a comment;
              - no items and no issue at all (first run in CI): open one issue,
                once, to keep the state; it can be closed at once;
              - no items and no change: do nothing.

The state lives in the issue, not in the repository: no commit, no deploy, and the
workflow needs only `issues: write`. Standard library only; uses GITHUB_TOKEN.
--dry-run prints what would be sent and writes the body to a file; it only reads.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

API = "https://api.github.com"
LABEL = "sources"
BOT = "github-actions[bot]"
BEGIN, END = "<!-- watch-state:begin", "watch-state:end -->"
BODY_LIMIT = 65000  # GitHub allows 65,536 characters in an issue body or comment


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


def bot_issues(repo, token):
    status, issues = gh("GET", f"/repos/{repo}/issues?labels={LABEL}&state=all&sort=created&direction=desc&per_page=30", token)
    if status != 200 or not isinstance(issues, list):
        raise SystemExit(f"cannot list issues of {repo} (HTTP {status})")
    return [i for i in issues if "pull_request" not in i and (i.get("user") or {}).get("login") == BOT]


def extract_state(body):
    if not body or BEGIN not in body:
        return None
    raw = body.split(BEGIN, 1)[1].split(END, 1)[0]
    try:
        state = json.loads(raw)
    except ValueError:
        return None
    return state if isinstance(state, dict) and "probes" in state else None


def embed_state(state):
    raw = json.dumps(state, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    raw = raw.replace("-->", "--\\u003e")  # cannot end the HTML comment early
    return f"{BEGIN}\n{raw}\n{END}"


def comparable(state):
    s = dict(state or {})
    s.pop("run", None)
    s.pop("note", None)
    return json.dumps(s, sort_keys=True)


def make_body(report, state, run_url, started=False):
    head = ("This issue is written by the workflow `.github/workflows/watch-sources.yml` "
            "(`scripts/watch/watch.py`). It changes nothing on the site: each item says which file "
            "and key to edit by hand. Later findings are added as comments. Close the issue when "
            "the items are dealt with; the next finding opens a new one.\n\n")
    if started:
        head += ("**First run: nothing needs doing.** This issue only keeps the watcher's state "
                 "(at the bottom). It can be closed now; it is still read when closed.\n\n")
    tail = ("\n\n<details><summary>Watcher state (read by the next run; do not edit)</summary>\n\n"
            + embed_state(state) + "\n</details>\n")
    room = BODY_LIMIT - len(head) - len(tail)
    if len(report) > room:
        cut = f"\n\n(Report shortened. The full report is in the job summary: {run_url})"
        report = report[: room - len(cut)] + cut
    return head + report + tail


def cmd_load_state(args):
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    source = None
    try:
        for issue in bot_issues(args.repo, token):
            state = extract_state(issue.get("body"))
            if state:
                Path(args.out).write_text(json.dumps(state, indent=1, ensure_ascii=False), encoding="utf-8")
                source = f"issue #{issue['number']} ({issue['state']})"
                break
    except SystemExit as err:
        print(f"warning: {err}; using the fallback", file=sys.stderr)
    if not source:
        Path(args.out).write_text(Path(args.fallback).read_text("utf-8"), encoding="utf-8")
        source = f"fallback {args.fallback}"
    print(f"state loaded from {source}")
    return 0


def cmd_publish(args):
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    out = Path(args.out_dir)
    report = (out / "report.md").read_text("utf-8")
    state = json.loads((out / "state.json").read_text("utf-8"))
    summary = json.loads((out / "summary.json").read_text("utf-8"))
    previous = json.loads(Path(args.previous_state).read_text("utf-8")) if args.previous_state else {}
    run_url = os.environ.get("GITHUB_SERVER_URL", "https://github.com") + f"/{args.repo}/actions/runs/{os.environ.get('GITHUB_RUN_ID', '')}"
    date = summary["date"]

    issues = [] if args.offline else bot_issues(args.repo, token)
    open_issue = next((i for i in issues if i["state"] == "open"), None)
    newest = issues[0] if issues else None
    body = make_body(report, state, run_url)
    actions = []

    if summary["has_items"]:
        if open_issue:
            comment = report if len(report) <= BODY_LIMIT else report[:BODY_LIMIT - 200] + f"\n\n(Shortened; full report: {run_url})"
            actions.append(("POST", f"/repos/{args.repo}/issues/{open_issue['number']}/comments", {"body": comment}))
            actions.append(("PATCH", f"/repos/{args.repo}/issues/{open_issue['number']}",
                            {"body": replace_state(open_issue.get("body") or body, state, report, run_url)}))
        else:
            actions.append(("LABEL", LABEL, None))
            actions.append(("POST", f"/repos/{args.repo}/issues",
                            {"title": f"Source watcher: {date}", "body": body, "labels": [LABEL]}))
    elif not issues:
        # First run in CI and nothing to report: the state needs a place to live, or a
        # source that keeps failing could never reach its third failed run. Open one
        # issue, once; it can be closed right away and keeps the state.
        body = make_body(report, state, run_url, started=True)
        actions.append(("LABEL", LABEL, None))
        actions.append(("POST", f"/repos/{args.repo}/issues",
                        {"title": f"Source watcher: started on {date}", "body": body, "labels": [LABEL]}))
    elif comparable(state) != comparable(previous):
        actions.append(("PATCH", f"/repos/{args.repo}/issues/{newest['number']}",
                        {"body": replace_state(newest.get("body") or body, state, report, run_url)}))
    if args.write_body:
        Path(args.write_body).write_text(body, encoding="utf-8")

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
                gh("POST", f"/repos/{args.repo}/labels", token,
                   {"name": LABEL, "color": "c5def5", "description": "Source watcher: new editions and moved links"})
            continue
        status, _ = gh(method, path, token, payload)
        if status not in (200, 201):
            raise SystemExit(f"{method} {path} failed with HTTP {status}")
        print(f"{method} {path}: HTTP {status}")
    return 0


def replace_state(body, state, report, run_url):
    """Swap the state block of an existing body; rebuild the body if it has none."""
    if BEGIN in body and END in body:
        before, rest = body.split(BEGIN, 1)
        after = rest.split(END, 1)[1]
        new = before + embed_state(state) + after
        if len(new) <= BODY_LIMIT:
            return new
    return make_body(report, state, run_url)


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("load-state")
    a.add_argument("--repo", required=True)
    a.add_argument("--out", required=True)
    a.add_argument("--fallback", required=True)
    b = sub.add_parser("publish")
    b.add_argument("--repo", required=True)
    b.add_argument("--out-dir", required=True)
    b.add_argument("--previous-state")
    b.add_argument("--dry-run", action="store_true", help="read only; print what would be sent")
    b.add_argument("--offline", action="store_true", help="with --dry-run: do not read the issues either")
    b.add_argument("--write-body", help="write the issue body that would be posted to this file")
    args = ap.parse_args(argv)
    if args.cmd == "publish" and args.offline and not args.dry_run:
        ap.error("--offline needs --dry-run")
    return cmd_load_state(args) if args.cmd == "load-state" else cmd_publish(args)


if __name__ == "__main__":
    sys.exit(main())
