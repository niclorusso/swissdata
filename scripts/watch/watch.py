#!/usr/bin/env python3
"""
Source watcher: notices when an official source used by the site has a newer
edition, or when a source link shown to visitors has moved or broken.

Usage:
  python3 scripts/watch/watch.py [--state FILE] [--out-dir DIR] [--root DIR]

It reads the registry (scripts/watch/sources.json), the data files of the site
(to know which period each figure shows and which link visitors see), calls
every probe, compares with the state of the previous run and writes:

  <out-dir>/report.md     what a person should look at, with file, key and URL
  <out-dir>/state.json    the state to give to the next run
  <out-dir>/summary.json  counts, runtime, requests per host, has_items

It changes nothing on the site. Standard library only (Python 3.9+).
Exit code 0 unless the registry or the arguments are invalid (2).
"""

from __future__ import annotations

import argparse
import concurrent.futures
import datetime as dt
import hashlib
import json
import re
import socket
import sys
import tempfile
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
PROJECT_ROOT = HERE.parents[1]
REPO_URL = "https://github.com/niclorusso/swissdata"
USER_AGENT = f"SwissData-source-watcher/1.0 (+{REPO_URL})"

TIMEOUT = 20          # seconds per request
ATTEMPTS = 3          # first try + 2 retries
BACKOFF = (3, 8)      # seconds before retry 1 and 2
PAUSE = 1.0           # seconds between two requests to the same host
MAX_FILE = 5_000_000  # bytes read for a content hash
MAX_PAGE = 2_000_000  # bytes read for a regex on a page
MAX_LINK = 262_144    # bytes read for a link check
FAIL_ESCALATE = 3     # consecutive failed runs before a failure counts as an item
MANUAL_DAYS = 90      # a manual check is due after this many days
HOST_GIVE_UP = 2      # failed requests in a row (after retries) before a host is skipped for the run

# What the state keeps of each probe's info: enough for "before" in the report and for
# the next run (the state lives in an issue body, limited to 65,536 characters).
STATE_INFO = {
    "fso-dam": ("asset", "published", "provisional", "period"),
    "fso-pxweb": ("updated", "last_period", "newest_year", "title"),
    "eurostat": ("updated", "last_period"),
    "snb-cube": ("published", "last_period"),
    "http-headers": ("etag", "last_modified"),
    "http-hash": ("size",),
    "http-regex": ("matches",),
}

KINDS = {"fso-dam", "fso-pxweb", "eurostat", "snb-cube", "http-headers", "http-hash", "http-regex", "calendar-year"}
STATE_VERSION = 1


# ---------------------------------------------------------------------------
# HTTP: one request at a time per host, a pause between requests, timeouts,
# retries with backoff. Every request is counted per host.
# ---------------------------------------------------------------------------

class FetchError(Exception):
    pass


class Response:
    def __init__(self, status, url, headers, body, truncated):
        self.status = status
        self.url = url
        self.headers = headers
        self.body = body
        self.truncated = truncated

    def header(self, name):
        return self.headers.get(name.lower())

    def text(self):
        ctype = self.header("content-type") or ""
        m = re.search(r"charset=([\w-]+)", ctype)
        return self.body.decode(m.group(1) if m else "utf-8", "replace")


class Http:
    def __init__(self, pause=PAUSE, timeout=TIMEOUT, host_pause=None):
        self.pause = pause
        self.host_pause = host_pause or {}
        self.timeout = timeout
        self.locks = defaultdict(threading.Lock)
        self.last = {}
        self.counts = Counter()
        self.retries = Counter()
        self.seconds = Counter()
        self.bad = Counter()      # consecutive requests that failed even after retries
        self.bad_reason = {}
        self.guard = threading.Lock()

    def request(self, url, method="GET", max_bytes=MAX_PAGE, accept=None, ok_statuses=None):
        """Return a Response. HTTP errors are returned as responses (status >= 400)
        when ok_statuses is "any"; otherwise they raise FetchError.
        Network errors, timeouts, 429 and 5xx are retried with backoff. After
        HOST_GIVE_UP requests in a row have failed that way, the host is not asked
        again in this run (so one host that is down cannot stretch the run)."""
        host = urllib.parse.urlsplit(url).hostname or "?"
        headers = {"User-Agent": USER_AGENT, "Accept-Language": "de,en;q=0.8"}
        if accept:
            headers["Accept"] = accept
        last_error = None
        with self.guard:
            lock = self.locks[host]
        with lock:
            if self.bad[host] >= HOST_GIVE_UP:
                raise FetchError(f"not asked: {host} failed {self.bad[host]} times in a row in this run "
                                 f"({self.bad_reason.get(host)})")
            for attempt in range(ATTEMPTS):
                if attempt:
                    with self.guard:
                        self.retries[host] += 1
                wait = self.last.get(host, 0) + self.host_pause.get(host, self.pause) - time.monotonic()
                if wait > 0:
                    time.sleep(wait)
                with self.guard:
                    self.counts[host] += 1
                started = time.monotonic()
                try:
                    req = urllib.request.Request(url, headers=headers, method=method)
                    with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                        body = b"" if method == "HEAD" else resp.read(max_bytes + 1)
                        result = Response(resp.status, resp.geturl(),
                                          {k.lower(): v for k, v in resp.headers.items()},
                                          body[:max_bytes], len(body) > max_bytes)
                    self._done(host, started, ok=True)
                    return result
                except urllib.error.HTTPError as err:
                    transient = err.code in (429, 500, 502, 503, 504)
                    # a 404 proves the host works (reset); a 429/5xx counts only once retries are used up
                    self._done(host, started, ok=not (transient and attempt + 1 == ATTEMPTS),
                               reason=f"HTTP {err.code}" if transient else None)
                    body = b""
                    try:
                        body = err.read(65536)
                    except Exception:
                        pass
                    retry_after = err.headers.get("Retry-After") if err.headers else None
                    if transient and attempt + 1 < ATTEMPTS:
                        delay = BACKOFF[attempt] * (3 if err.code == 429 else 1)
                        if retry_after and retry_after.isdigit():
                            delay = min(max(delay, int(retry_after)), 30)
                        time.sleep(delay)
                        last_error = f"HTTP {err.code}"
                        continue
                    response = Response(err.code, err.geturl() or url,
                                        {k.lower(): v for k, v in (err.headers or {}).items()}, body, False)
                    if ok_statuses == "any":
                        return response
                    raise FetchError(f"HTTP {err.code} from {host}") from None
                except (urllib.error.URLError, socket.timeout, TimeoutError, ConnectionError, OSError) as err:
                    reason = getattr(err, "reason", err)
                    last_error = f"{type(err).__name__}: {reason}"
                    final = attempt + 1 == ATTEMPTS
                    self._done(host, started, ok=not final, reason=last_error)
                    if not final:
                        time.sleep(BACKOFF[attempt])
                        continue
            raise FetchError(f"network error after {ATTEMPTS} attempts ({last_error})")

    def _done(self, host, started, ok, reason=None):
        now = time.monotonic()
        self.last[host] = now
        with self.guard:
            self.seconds[host] += now - started
            if ok:
                self.bad[host] = 0 if reason is None else self.bad[host]
            else:
                self.bad[host] += 1
                self.bad_reason[host] = reason

    def json(self, url):
        resp = self.request(url, accept="application/json")
        try:
            return json.loads(resp.text())
        except ValueError:
            raise FetchError(f"the answer from {urllib.parse.urlsplit(url).hostname} is not JSON") from None


# ---------------------------------------------------------------------------
# Periods
# ---------------------------------------------------------------------------

def period_end_year(text):
    """Last complete year described by a period string such as '1990-2023',
    '2000, 2003, 2010-2024', '1.6.1914-31.10.2026' (-> 2025) or '2025Q3' (-> 2024)."""
    if not text:
        return None
    s = str(text).strip()
    tokens = list(re.finditer(r"(\d{1,2})\.(\d{1,2})\.(\d{4})|(\d{4})(?:\s*[-/]?\s*([QKM])\s*(\d{1,2}))?", s))
    if not tokens:
        return None
    t = tokens[-1]
    if t.group(3):
        day, month, year = int(t.group(1)), int(t.group(2)), int(t.group(3))
        return year if (day, month) == (31, 12) else year - 1
    year = int(t.group(4))
    if t.group(5):
        sub = int(t.group(6))
        full = 4 if t.group(5) in "QK" else 12
        return year if sub == full else year - 1
    return year


def years_in(text):
    return [int(y) for y in re.findall(r"(?<!\d)(19\d\d|20\d\d)(?!\d)", text or "")]


def short_hash(data):
    if isinstance(data, str):
        data = data.encode("utf-8")
    return hashlib.sha256(data).hexdigest()[:16]


def fmt_date(iso):
    """'2026-02-04...' -> '4 February 2026'."""
    try:
        d = dt.date.fromisoformat(str(iso)[:10])
    except ValueError:
        return str(iso)
    return f"{d.day} {d.strftime('%B')} {d.year}"


def expand_url(url, today):
    return re.sub(r"\{today:([^}]+)\}", lambda m: today.strftime(m.group(1)), url)


# ---------------------------------------------------------------------------
# Probes. Each returns a dict:
#   fingerprint  str or None  (compared with the state; a change = new edition)
#   newest_year  int or None  (last complete year the source offers)
#   info         dict         (what the report and the change-log draft may say)
# and raises FetchError when it cannot check.
# ---------------------------------------------------------------------------

def dam_lang(order_nr):
    m = re.match(r"^[a-z]+-([defi])-", order_nr)
    return {"d": "de", "e": "en", "f": "fr", "i": "it"}.get(m.group(1) if m else "d", "de")


def probe_fso_dam(http, p, today, prev=None):
    order = p["orderNr"]
    data = http.json("https://dam-api.bfs.admin.ch/hub/api/dam/assets?orderNr=" + urllib.parse.quote(order))
    assets = data.get("data") or []
    if not assets:
        raise FetchError(f"the FSO DAM API knows no asset with order number {order}")
    current = [a for a in assets if (a.get("bfs", {}).get("lifecycle") or {}).get("code") == "CURRENT"] or assets
    a = max(current, key=lambda x: x.get("bfs", {}).get("embargo") or "")
    bfs = a.get("bfs", {})
    desc = a.get("description", {})
    period = (desc.get("bibliography") or {}).get("period")
    asset_id = a.get("ids", {}).get("damId")
    published = (bfs.get("embargo") or "")[:10]
    info = {
        "asset": asset_id,
        "published": published,
        "provisional": bool(bfs.get("provisional")),
        "period": period,
        "title": (desc.get("titles") or {}).get("main"),
        "orderNr": order,
        "file": f"https://dam-api.bfs.admin.ch/hub/api/dam/assets/{asset_id}/master",
        "page": f"https://www.bfs.admin.ch/asset/{dam_lang(order)}/{order}",
    }
    return {
        "fingerprint": f"{asset_id}|{published}|{int(info['provisional'])}",
        "newest_year": period_end_year(period),
        "info": info,
    }


def probe_fso_pxweb(http, p, today, prev=None):
    cube = p["cube"]
    base = f"https://www.pxweb.bfs.admin.ch/api/v1/de/{cube}"
    listing = http.json(base)
    entry = next((e for e in listing if e.get("id") == f"{cube}.px"), None) if isinstance(listing, list) else None
    if not entry:
        raise FetchError(f"the PXWeb API does not list the table {cube}.px")
    prev = prev or {}
    if prev.get("updated") == entry.get("updated") and prev.get("last_period") and prev.get("title"):
        # unchanged since the last run: the time variable is the same, no need to ask
        # for the metadata (PXWeb answers 429 when asked too often)
        return {
            "fingerprint": f"{entry.get('updated')}|{prev['last_period']}",
            "newest_year": period_end_year(prev["last_period"]) if prev.get("newest_year") is None else prev["newest_year"],
            "info": dict(prev, cube=cube, page=f"https://www.pxweb.bfs.admin.ch/pxweb/de/{cube}/"),
        }
    meta = http.json(f"{base}/{cube}.px")
    variables = meta.get("variables") or []
    if p.get("time_var"):
        tvar = next((v for v in variables if v.get("code") == p["time_var"]), None)
    else:
        tvar = next((v for v in variables if v.get("time")), None)
    if not tvar:
        raise FetchError(f"no time variable in {cube}")
    periods = [str(v) for v in tvar.get("values") or []]
    years = [y for y in (period_end_year(v) for v in periods) if y is not None]
    last = max(periods, key=lambda v: (period_end_year(v) or 0, v)) if periods else None
    info = {
        "updated": entry.get("updated"),
        "last_period": last,
        "newest_year": max(years) if years else None,
        "title": meta.get("title"),
        "cube": cube,
        "page": f"https://www.pxweb.bfs.admin.ch/pxweb/de/{cube}/",
    }
    return {
        "fingerprint": f"{entry.get('updated')}|{last}",
        "newest_year": info["newest_year"],
        "info": info,
    }


def probe_eurostat(http, p, today, prev=None):
    ds = p["dataset"]
    params = [("format", "JSON"), ("lang", "EN"), ("sinceTimePeriod", str(p.get("since", 2010)))]
    for k, v in p.get("filters", {}).items():
        for item in (v if isinstance(v, list) else [v]):
            params.append((k, item))
    url = f"https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{ds}?" + urllib.parse.urlencode(params)
    resp = http.request(url, accept="application/json", ok_statuses="any")
    try:
        data = json.loads(resp.text())
    except ValueError:
        raise FetchError(f"Eurostat answered HTTP {resp.status} without JSON") from None
    if "error" in data or resp.status >= 400:
        err = data.get("error")
        label = err[0].get("label") if isinstance(err, list) and err else err
        raise FetchError(f"Eurostat HTTP {resp.status}: {label}")
    dims, sizes = data["id"], data["size"]
    t = dims.index("time")
    stride = 1
    for s in sizes[t + 1:]:
        stride *= s
    pos_to_code = {pos: code for code, pos in data["dimension"]["time"]["category"]["index"].items()}
    values = data.get("value") or {}
    if isinstance(values, list):
        values = {str(i): v for i, v in enumerate(values) if v is not None}
    times = {}
    for idx, val in values.items():
        code = pos_to_code[(int(idx) // stride) % sizes[t]]
        times.setdefault(code, []).append(val)
    if not times:
        raise FetchError(f"Eurostat {ds}: no value for this selection since {p.get('since', 2010)}")
    last = max(times, key=lambda c: (period_end_year(c) or 0, c))
    single = all(s == 1 for i, s in enumerate(sizes) if i != t)
    info = {
        "updated": data.get("updated"),
        "last_period": last,
        "title": data.get("label"),
        "dataset": ds,
        "page": f"https://ec.europa.eu/eurostat/databrowser/view/{ds}/default/table",
    }
    if single:
        info["last_value"] = times[last][0]
    return {
        "fingerprint": f"{last}|{short_hash(json.dumps(sorted(values.items()), sort_keys=True))}",
        "newest_year": period_end_year(last),
        "info": info,
    }


def probe_snb_cube(http, p, today, prev=None):
    cube = p["cube"]
    upd = http.json(f"https://data.snb.ch/api/cube/{cube}/lastUpdate")
    since = today.year - 3
    csv = http.request(f"https://data.snb.ch/api/cube/{cube}/data/csv/en?fromDate={since}").text()
    dates = re.findall(r'^"(\d{4}(?:-\d{2})?)";', csv, flags=re.M)
    last = max(dates) if dates else None
    published = upd.get("publicSinceDate") or upd.get("editionDate")
    newest = None
    if last:
        newest = int(last[:4]) if len(last) == 4 or last.endswith("-12") else int(last[:4]) - 1
    pub_iso = None
    if published and re.match(r"\d{8}", published):
        pub_iso = f"{published[:4]}-{published[4:6]}-{published[6:8]}"
    return {
        "fingerprint": f"{published}|{last}",
        "newest_year": newest,
        "info": {"published": pub_iso, "last_period": last, "cube": cube,
                 "page": p.get("page") or f"https://data.snb.ch/en/topics/uvo/cube/{cube}"},
    }


def probe_http_headers(http, p, today, prev=None):
    url = expand_url(p["url"], today)
    resp = http.request(url, method="HEAD", ok_statuses="any")
    if resp.status in (403, 405, 501):
        resp = http.request(url, max_bytes=1, ok_statuses="any")
    if resp.status != 200:
        raise FetchError(f"HTTP {resp.status}")
    etag, lm = resp.header("etag"), resp.header("last-modified")
    if not etag and not lm:
        raise FetchError("the server sends neither ETag nor Last-Modified: use http-hash for this file")
    changed = None
    if lm:
        try:
            changed = dt.datetime.strptime(lm, "%a, %d %b %Y %H:%M:%S GMT").date().isoformat()
        except ValueError:
            changed = None
    return {
        "fingerprint": etag or lm,
        "newest_year": None,
        "info": {"etag": etag, "last_modified": lm, "changed": changed, "size": resp.header("content-length"),
                 "file": url, "page": p.get("page") or url},
    }


def probe_http_hash(http, p, today, prev=None):
    url = expand_url(p["url"], today)
    resp = http.request(url, max_bytes=p.get("max_bytes", MAX_FILE))
    if resp.truncated:
        raise FetchError(f"file larger than {p.get('max_bytes', MAX_FILE)} bytes: use http-headers")
    return {
        "fingerprint": hashlib.sha256(resp.body).hexdigest(),
        "newest_year": None,
        "info": {"size": len(resp.body), "file": url, "page": p.get("page") or url},
    }


def probe_http_regex(http, p, today, prev=None):
    url = expand_url(p["url"], today)
    resp = http.request(url, max_bytes=MAX_PAGE)
    text = resp.text()
    rx = re.compile(p["pattern"])
    found = sorted({(m.group(1) if rx.groups else m.group(0)) for m in rx.finditer(text)})
    if not found:
        raise FetchError("the pattern is no longer on the page (page redesigned?)")
    newest = None
    if p.get("period") == "max-year":
        ys = [y for f in found for y in years_in(f)]
        newest = max(ys) if ys else None
    return {
        "fingerprint": short_hash("\n".join(found)),
        "newest_year": newest,
        "info": {"matches": found[:30], "page": p.get("page") or url},
    }


def probe_calendar_year(http, p, today, prev=None):
    return {"fingerprint": None, "newest_year": today.year, "info": {"calendar": True}}


PROBES = {
    "fso-dam": probe_fso_dam,
    "fso-pxweb": probe_fso_pxweb,
    "eurostat": probe_eurostat,
    "snb-cube": probe_snb_cube,
    "http-headers": probe_http_headers,
    "http-hash": probe_http_hash,
    "http-regex": probe_http_regex,
    "calendar-year": probe_calendar_year,
}


def probe_key(p):
    k = p["kind"]
    if k == "fso-dam":
        return f"fso-dam:{p['orderNr']}"
    if k == "fso-pxweb":
        return f"fso-pxweb:{p['cube']}"
    if k == "eurostat":
        f = "&".join(f"{a}={b}" for a, b in sorted(p.get("filters", {}).items()))
        return f"eurostat:{p['dataset']}?{f}"
    if k == "snb-cube":
        return f"snb-cube:{p['cube']}"
    if k in ("http-headers", "http-hash"):
        return f"{k}:{p['url']}"
    if k == "http-regex":
        return f"http-regex:{p['url']}#{p['pattern']}"
    return k


def probe_host(p):
    k = p["kind"]
    if k == "fso-dam":
        return "dam-api.bfs.admin.ch"
    if k == "fso-pxweb":
        return "www.pxweb.bfs.admin.ch"
    if k == "eurostat":
        return "ec.europa.eu"
    if k == "snb-cube":
        return "data.snb.ch"
    if k == "calendar-year":
        return "(none)"
    return urllib.parse.urlsplit(p["url"]).hostname


# ---------------------------------------------------------------------------
# Link check: the URL shown to visitors answers 200 and is not a generic page.
# ---------------------------------------------------------------------------

# Pages that answer 200 for an address that does not exist. The admin.ch sites
# carry the text "Diese Seite existiert nicht" in the scripts of every page, so
# only the error code and the text inside the main content count.
SOFT_404 = [
    r'"newsNotFound"',
    r'<main id="main-content">(?:<!--\[-->)?<div class="container"><p[^>]*>Diese Seite existiert nicht',
    r"<title>[^<]{0,80}(?:404|[Nn]ot [Ff]ound|nicht gefunden|introuvable|non trovata)",
]
FILE_EXT = re.compile(r"\.(pdf|xlsx?|csv|zip|px|json)$", re.I)


def norm_url(u):
    s = urllib.parse.urlsplit(u)
    path = s.path or "/"
    if len(path) > 1:
        path = path.rstrip("/")
    return urllib.parse.urlunsplit((s.scheme.lower(), (s.hostname or "").lower(), path, s.query, ""))


def check_link(http, url, rules):
    """Return (verdict, detail, final_url). verdict: ok | moved | broken | error."""
    try:
        resp = http.request(url, max_bytes=MAX_LINK, ok_statuses="any")
    except FetchError as err:
        return "error", str(err), None
    final = resp.url
    if resp.status in (401, 403, 429) or resp.status >= 500:
        return "error", f"HTTP {resp.status} (the server refused or failed; not a verdict on the link)", final
    if resp.status >= 400:
        return "broken", f"HTTP {resp.status}", final
    ctype = (resp.header("content-type") or "").lower()
    if "html" in ctype:
        head = resp.body.decode("utf-8", "replace")
        for pat in SOFT_404:
            if re.search(pat, head):
                return "broken", "the page answers 200 but says it does not exist", final
        if FILE_EXT.search(urllib.parse.urlsplit(url).path):
            return "moved", "the link pointed to a file and now opens an HTML page", final
    a, b = norm_url(url), norm_url(final)
    if a == b:
        return "ok", f"HTTP {resp.status}", final
    for r in rules:
        if re.search(r["from"], url) and re.search(r["to"], final):
            return "ok", f"HTTP {resp.status}, expected redirect", final
    path = urllib.parse.urlsplit(final).path.strip("/")
    if (path in ("", "de", "en", "fr", "it")
            or re.fullmatch(r"(de|en|fr|it)/(home|index|language-choice|sprachwahl)(\.html)?", path)):
        return "moved", "redirects to a generic landing page", final
    return "moved", "redirects to another address", final


# ---------------------------------------------------------------------------
# Data files of the site: which period each figure shows, which link it shows
# ---------------------------------------------------------------------------

def ts_blocks(text):
    """id -> block of text, for the entries of indicators.ts / questions.ts."""
    out = {}
    pieces = re.split(r'\n\s{4}id: "', text)
    for piece in pieces[1:]:
        ident = piece.split('"', 1)[0]
        out[ident] = piece
    return out


def ts_field(block, name):
    m = re.search(rf'\n\s*{name}:\s*"((?:[^"\\]|\\.)*)"', block)
    return json.loads(f'"{m.group(1)}"') if m else None


def py_constants(text):
    consts = {}
    for m in re.finditer(r'^([A-Z][A-Z0-9_]*)\s*=\s*(\d+|"[^"]*"|\((?:\s*"[^"]*"\s*)+\))\s*$', text, flags=re.M):
        name, value = m.group(1), m.group(2)
        if value.startswith("("):
            value = "".join(re.findall(r'"([^"]*)"', value))
        elif value.startswith('"'):
            value = value[1:-1]
        consts[name] = value
    return consts


class SiteData:
    def __init__(self, root):
        self.root = Path(root)
        self.errors = []
        self.indicators = self._blocks("src/data/indicators.ts")
        self.questions = self._blocks("src/data/questions.ts")
        cantons_py = self._read("scripts/data/build_cantons.py")
        self.cantons = py_constants(cantons_py) if cantons_py else {}
        sources_ts = self._read("src/data/sources.ts") or ""
        self.about = dict(re.findall(r'abbr:\s*"([^"]+)",\s*\n\s*url:\s*"([^"]+)"', sources_ts))

    def _read(self, rel):
        try:
            return (self.root / rel).read_text("utf-8")
        except OSError as err:
            self.errors.append(f"{rel}: {err}")
            return None

    def _blocks(self, rel):
        text = self._read(rel)
        return ts_blocks(text) if text else {}

    def shown(self, spec):
        """-> (year shown on the site or None, URL shown to visitors or None, description, error)"""
        src = spec.get("from")
        if src == "indicators":
            b = self.indicators.get(spec["id"])
            if b is None:
                return None, None, None, f"no indicator with id {spec['id']} in src/data/indicators.ts"
            ys = [int(y) for y in re.findall(r"year:\s*(\d{4})", b)]
            return (max(ys) if ys else None), ts_field(b, "sourceUrl"), f"lastUpdated \"{ts_field(b, 'lastUpdated')}\"", None
        if src == "questions":
            b = self.questions.get(spec["id"])
            if b is None:
                return None, None, None, f"no question with id {spec['id']} in src/data/questions.ts"
            ys = years_in(ts_field(b, spec.get("field", "question")))
            return (max(ys) if ys else None), ts_field(b, "sourceUrl"), "year named in the question", None
        if src == "build_cantons":
            raw = self.cantons.get(spec["year_const"])
            if raw is None:
                return None, None, None, f"no constant {spec['year_const']} in scripts/data/build_cantons.py"
            url = self.cantons.get(spec["url_const"]) if spec.get("url_const") else None
            return int(str(raw)[:4]), url, f"{spec['year_const']} = {raw}", None
        if src == "static":
            return spec.get("period"), spec.get("url"), "period set in the registry", None
        return None, None, None, f"unknown 'shown.from': {src}"


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------

def load_registry(path):
    reg = json.loads(Path(path).read_text("utf-8"))
    errors = []
    seen = set()
    for item in reg.get("items", []):
        iid = item.get("id")
        if not iid or iid in seen:
            errors.append(f"missing or duplicate id: {iid}")
        seen.add(iid)
        for key in ("label", "publisher", "used_in", "shown"):
            if key not in item:
                errors.append(f"{iid}: missing '{key}'")
        for p in item.get("probes", []):
            if p.get("kind") not in KINDS:
                errors.append(f"{iid}: unknown probe kind {p.get('kind')}")
        m = item.get("manual")
        if m:
            try:
                dt.date.fromisoformat(m["last_checked"])
            except (KeyError, ValueError):
                errors.append(f"{iid}: manual.last_checked must be YYYY-MM-DD")
    for host, m in reg.get("manual_link_hosts", {}).items():
        try:
            dt.date.fromisoformat(m["last_checked"])
        except (KeyError, ValueError):
            errors.append(f"manual_link_hosts.{host}: last_checked must be YYYY-MM-DD")
    if errors:
        raise SystemExit("registry errors:\n  " + "\n  ".join(errors))
    return reg


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

def run(args):
    t0 = time.monotonic()
    today = dt.date.fromisoformat(args.today) if args.today else dt.date.today()
    reg = load_registry(args.registry)
    site = SiteData(args.root)
    try:
        raw = Path(args.state).read_text("utf-8") if args.state and Path(args.state).exists() else ""
        prev = json.loads(raw) if raw.strip() else {}   # missing or empty file (e.g. /dev/null): first run
    except ValueError:
        print(f"warning: {args.state} is not valid JSON; starting without a previous state", file=sys.stderr)
        prev = {}
    first_run = not prev.get("probes")
    prev_probes = prev.get("probes", {})
    prev_links = prev.get("links", {})
    prev_gaps = prev.get("gaps", {})
    prev_manual = prev.get("manual", {})

    http = Http(pause=args.pause, host_pause=reg.get("host_pause", {}))
    rules = reg.get("redirect_rules", [])
    skip_rules = reg.get("link_skip", [])
    manual_hosts = reg.get("manual_link_hosts", {})

    # --- resolve items against the data files
    items = []
    notes = []
    data_errors = []
    for it in reg["items"]:
        year, url, how, err = site.shown(it["shown"])
        if err:
            data_errors.append((it, err))
        it = dict(it, _year=year, _url=url or it.get("url"), _how=how)
        if url and it.get("url") and norm_url(url) != norm_url(it["url"]):
            notes.append(f"`{it['id']}`: the registry has {it['url']}, the data file links {url}; the data file is checked.")
        items.append(it)

    # every link in the data files that no registry item covers is still checked
    covered = {(it["shown"].get("from"), it["shown"].get("id")) for it in reg["items"]}
    covered_consts = {it["shown"].get("url_const") for it in reg["items"]}
    extra_links = []
    for ident, block in site.indicators.items():
        if ("indicators", ident) not in covered:
            notes.append(f"`src/data/indicators.ts` id `{ident}` has no registry item (only its link is checked).")
            extra_links.append((ts_field(block, "sourceUrl"), {"file": "src/data/indicators.ts", "key": f"{ident} (sourceUrl)"}))
    for ident, block in site.questions.items():
        if ("questions", ident) not in covered:
            notes.append(f"`src/data/questions.ts` id `{ident}` has no registry item (only its link is checked).")
            extra_links.append((ts_field(block, "sourceUrl"), {"file": "src/data/questions.ts", "key": f"{ident} (sourceUrl)"}))
    for name, value in site.cantons.items():
        if name.endswith("_PAGE") and name not in covered_consts:
            notes.append(f"`scripts/data/build_cantons.py` {name} has no registry item (only its link is checked).")
            extra_links.append((value, {"file": "scripts/data/build_cantons.py", "key": name}))
    for abbr, url in site.about.items():
        extra_links.append((url, {"file": "src/data/sources.ts", "key": f"{abbr} (url, About page)"}))

    # --- unique probes and links
    probes = {}
    for it in items:
        for p in it.get("probes", []):
            probes.setdefault(probe_key(p), p)
    eurostat_datasets = {p["dataset"] for p in probes.values() if p["kind"] == "eurostat"}

    links = {}   # url -> list of (item or None, used_in)
    for it in items:
        if it["_url"]:
            links.setdefault(it["_url"], []).append((it, it["used_in"]))
    for url, used in extra_links:
        if url:
            links.setdefault(url, []).append((None, used))

    link_plan = {}  # url -> ("check" | "skip" | "manual", reason)
    for url in links:
        host = urllib.parse.urlsplit(url).hostname
        reason = None
        for r in skip_rules:
            m = re.search(r["match"], url)
            if m:
                ds = m.groupdict().get("dataset")
                if ds and ds not in eurostat_datasets:
                    continue   # not covered: check the dataset through the API below
                reason = r["why"]
                break
        if reason:
            link_plan[url] = ("skip", reason)
        elif host in manual_hosts:
            link_plan[url] = ("manual", manual_hosts[host]["why"])
        else:
            link_plan[url] = ("check", None)
    for url, (mode, _) in list(link_plan.items()):
        m = re.search(r"/eurostat/databrowser/view/(?P<dataset>[a-z0-9_]+)/", url)
        if mode == "check" and m:
            p = {"kind": "eurostat", "dataset": m.group("dataset"), "filters": {"geo": "CH"}, "since": today.year - 3}
            probes.setdefault(probe_key(p), p)
            link_plan[url] = ("skip", f"checked through the Eurostat API (dataset {m.group('dataset')})")

    # --- run everything, one worker per host, requests within a host in sequence
    tasks = defaultdict(list)
    for key, p in probes.items():
        tasks[probe_host(p)].append(("probe", key, p))
    for url, (mode, _) in link_plan.items():
        if mode == "check":
            tasks[urllib.parse.urlsplit(url).hostname].append(("link", url, None))

    results, link_results = {}, {}

    def work(host_tasks):
        for kind, key, p in host_tasks:
            if kind == "probe":
                try:
                    prev_info = (prev_probes.get(key) or {}).get("info")
                    results[key] = dict(PROBES[p["kind"]](http, p, today, prev_info), ok=True)
                except FetchError as err:
                    results[key] = {"ok": False, "error": str(err)}
                except Exception as err:  # a broken probe must not stop the others
                    results[key] = {"ok": False, "error": f"probe failed: {type(err).__name__}: {err}"}
            else:
                try:
                    link_results[key] = check_link(http, key, rules)
                except Exception as err:
                    link_results[key] = ("error", f"link check failed: {type(err).__name__}: {err}", None)

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        list(pool.map(work, tasks.values()))

    # --- compare with the previous state
    state = {"version": STATE_VERSION, "run": today.isoformat(), "probes": {}, "links": {}, "gaps": {}, "manual": {},
             "registry_errors": {}}
    editions, failures, link_items, manual_due = {}, [], [], []
    for key, p in probes.items():
        r = results[key]
        old = prev_probes.get(key, {})
        if r["ok"]:
            same = old.get("fp") == r["fingerprint"]
            # same edition: keep the stored info as it was, so that the state (kept in the
            # issue body) changes only when an edition changes, not when e.g. Eurostat
            # moves the 'updated' date of a table without touching the Swiss values
            kept = old["info"] if same and old.get("info") else \
                {k: v for k, v in r["info"].items() if k in STATE_INFO.get(p["kind"], ())}
            entry = {"fp": r["fingerprint"], "info": kept, "since": old.get("since") if same else today.isoformat()}
            if r["fingerprint"] is None:
                entry = {"fp": None, "info": {}, "since": None}
            state["probes"][key] = entry
            if old.get("fp") and r["fingerprint"] and old["fp"] != r["fingerprint"]:
                editions[key] = {"probe": p, "result": r, "before": old.get("info", {}), "why": ["changed since the last run"], "items": []}
        else:
            fail = int(old.get("fail", 0)) + 1
            entry = dict(old) if old else {"fp": None, "info": {}, "since": None}
            entry.update(fail=fail, fail_since=old.get("fail_since") or today.isoformat(), error=r["error"])
            escalate = fail >= FAIL_ESCALATE and not old.get("fail_reported")
            entry["fail_reported"] = bool(old.get("fail_reported")) or escalate
            state["probes"][key] = entry
            failures.append({"key": key, "probe": p, "error": r["error"], "fail": fail,
                             "since": entry["fail_since"], "item": escalate})

    # newer period: what the site shows against what the source offers
    for it in items:
        for p in it.get("probes", []):
            key = probe_key(p)
            r = results[key]
            if not r.get("ok") or r.get("newest_year") is None or p.get("compare_period") is False:
                continue
            if it["_year"] is None:
                continue
            expected = r["newest_year"] + int(p.get("period_offset", 0))
            gap_key = f"{it['id']}|{key}"
            if it["_year"] < expected and not args.fingerprints_only:
                state["gaps"][gap_key] = expected
                is_new = prev_gaps.get(gap_key) != expected
                ed = editions.setdefault(key, {"probe": p, "result": r, "before": {}, "why": [], "items": []})
                ed["items"].append((it, expected, is_new))
                reason = ("the site shows an older period than the source offers" if p["kind"] != "calendar-year"
                          else "a new calendar year has started")
                if is_new and reason not in ed["why"]:
                    ed["why"].append(reason)
    # a probe that failed today keeps the gaps it had, so they are not reported again when it recovers
    for gap_key, year in prev_gaps.items():
        if gap_key not in state["gaps"] and not results.get(gap_key.split("|", 1)[1], {}).get("ok", True):
            state["gaps"][gap_key] = year
    # every item that uses a changed source is listed with it
    for key, ed in editions.items():
        listed = {i[0]["id"] for i in ed["items"]}
        for it in items:
            if it["id"] not in listed and any(probe_key(p) == key for p in it.get("probes", [])):
                ed["items"].append((it, None, False))
    # an edition entry with only already-reported gaps and no change is not news
    editions = {k: v for k, v in editions.items() if v["why"]}

    # links
    for url, (mode, reason) in link_plan.items():
        users = links[url]
        if mode != "check":
            continue
        verdict, detail, final = link_results[url]
        old = prev_links.get(url, {})
        if verdict == "error":
            fail = int(old.get("fail", 0)) + 1
            entry = dict(old) if old else {"sig": None}
            entry.update(fail=fail, fail_since=old.get("fail_since") or today.isoformat(), error=detail)
            escalate = fail >= FAIL_ESCALATE and not old.get("fail_reported")
            entry["fail_reported"] = bool(old.get("fail_reported")) or escalate
            state["links"][url] = entry
            failures.append({"key": f"link:{url}", "link": url, "users": users, "error": detail,
                             "fail": fail, "since": entry["fail_since"], "item": escalate})
            continue
        if verdict == "ok":
            continue   # a working link needs no state
        sig = f"{verdict}|{norm_url(final or url)}|{detail}"
        state["links"][url] = {"sig": sig}
        if old.get("sig") != sig:
            link_items.append({"url": url, "verdict": verdict, "detail": detail, "final": final, "users": users})

    # manual checks
    manual_list = []
    for it in items:
        m = it.get("manual")
        if m:
            manual_list.append((it["id"], it, m))
    for host, m in manual_hosts.items():
        urls = [u for u, (mode, _) in link_plan.items() if mode == "manual" and urllib.parse.urlsplit(u).hostname == host]
        if urls:
            manual_list.append((f"links@{host}", {"label": f"Links to {host}", "publisher": host,
                                                    "used_in": [u for url in urls for _, u in links[url]],
                                                    "_url": urls[0], "urls": urls}, m))
    for mid, it, m in manual_list:
        last = dt.date.fromisoformat(m["last_checked"])
        age = (today - last).days
        if age > MANUAL_DAYS:
            state["manual"][mid] = m["last_checked"]
            if prev_manual.get(mid) != m["last_checked"]:
                manual_due.append((it, m, age))

    # data file problems are "could not check" items, reported once
    state["registry_errors"] = {}
    prev_reg_errors = prev.get("registry_errors", {})
    for it, err in data_errors:
        state["registry_errors"][it["id"]] = err
        failures.append({"key": f"registry:{it['id']}", "error": err, "fail": 1, "since": today.isoformat(),
                         "item": prev_reg_errors.get(it["id"]) != err, "registry_item": it})

    escalated = [f for f in failures if f["item"]]
    has_items = bool(editions or link_items or manual_due or escalated)

    # --- report
    runtime = time.monotonic() - t0
    kinds = Counter(p["kind"] for p in probes.values())
    n_ok = sum(1 for r in results.values() if r.get("ok"))
    links_checked = sum(1 for m, _ in link_plan.values() if m == "check")
    links_ok = sum(1 for v in link_results.values() if v[0] == "ok")
    summary = {
        "date": today.isoformat(),
        "has_items": has_items,
        "first_run": first_run,
        "items": len(reg["items"]),
        "probes": len(probes),
        "probes_by_kind": dict(sorted(kinds.items())),
        "probes_ok": n_ok,
        "probes_failed": len(probes) - n_ok,
        "links": len(link_plan),
        "links_checked": links_checked,
        "links_ok": links_ok,
        "links_skipped": sum(1 for m, _ in link_plan.values() if m == "skip"),
        "links_manual": sum(1 for m, _ in link_plan.values() if m == "manual"),
        "counts": {"new_edition": len(editions), "link": len(link_items), "could_not_check": len(failures),
                   "could_not_check_items": len(escalated), "manual_due": len(manual_due)},
        "requests": sum(http.counts.values()),
        "requests_per_host": dict(http.counts.most_common()),
        "retries_per_host": dict(http.retries.most_common()),
        "seconds_per_host": {h: round(v, 1) for h, v in http.seconds.most_common()},
        "runtime_seconds": round(runtime, 1),
    }
    report = render_report(today, summary, editions, link_items, failures, manual_due, notes, manual_list, site.errors)
    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)
    (out / "report.md").write_text(report, encoding="utf-8")
    (out / "state.json").write_text(json.dumps(state, indent=1, ensure_ascii=False, sort_keys=True) + "\n", encoding="utf-8")
    (out / "summary.json").write_text(json.dumps(summary, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    if args.write_seed:
        seed = {"version": STATE_VERSION, "run": today.isoformat(),
                "note": "Fingerprints of the sources as seen on this date. Only the probes are kept: "
                        "the first run in CI reports every open gap, link problem and due check once.",
                "probes": {k: v for k, v in state["probes"].items() if v.get("fp")}}
        Path(args.write_seed).write_text(json.dumps(seed, indent=1, ensure_ascii=False, sort_keys=True) + "\n", encoding="utf-8")
    print(f"{summary['probes']} probes ({summary['probes_ok']} ok), {links_checked} links checked ({links_ok} ok), "
          f"{summary['requests']} requests, {summary['runtime_seconds']} s. Items: {summary['counts']}. has_items={has_items}")
    return 0


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------

def where(used_in):
    if isinstance(used_in, list):
        return "; ".join(where(u) for u in used_in)
    s = f"`{used_in['file']}` → `{used_in['key']}`"
    if used_in.get("also"):
        s += f" (texts also in {used_in['also']})"
    if used_in.get("then"):
        s += f", then {used_in['then']}"
    return s


def describe_source(p, r):
    i = r.get("info", {})
    k = p["kind"]
    if k == "fso-dam":
        return f"FSO table {i.get('orderNr')}, “{i.get('title')}”"
    if k == "fso-pxweb":
        return f"FSO STAT-TAB cube {i.get('cube')}, “{i.get('title')}”"
    if k == "eurostat":
        return f"Eurostat table {i.get('dataset')}, “{i.get('title')}”"
    if k == "snb-cube":
        return f"SNB data portal cube {i.get('cube')}"
    if k == "calendar-year":
        return "Calendar"
    return f"{p.get('label') or 'File'} ({i.get('file') or i.get('page')})"


def facts(p, r, before):
    i = r.get("info", {})
    k = p["kind"]
    lines = []
    if k == "fso-dam":
        lines.append(f"Published {i.get('published')} (asset {i.get('asset')}{', provisional' if i.get('provisional') else ''}); period in the FSO metadata: {i.get('period')}")
        if before.get("asset"):
            lines.append(f"Before: asset {before.get('asset')} of {before.get('published')}, period {before.get('period')}")
    elif k == "fso-pxweb":
        lines.append(f"Cube updated {i.get('updated')}; latest period: {i.get('last_period')}")
        if before.get("updated"):
            lines.append(f"Before: updated {before.get('updated')}, latest period {before.get('last_period')}")
    elif k == "eurostat":
        v = f", value for Switzerland {i['last_value']}" if "last_value" in i else ""
        lines.append(f"Table updated {i.get('updated')}; latest period with a value for Switzerland: {i.get('last_period')}{v}")
        if before.get("last_period"):
            lines.append(f"Before: latest period {before.get('last_period')}, table updated {before.get('updated')}")
    elif k == "snb-cube":
        lines.append(f"Published {i.get('published')}; latest period: {i.get('last_period')}")
        if before.get("published"):
            lines.append(f"Before: published {before.get('published')}, latest period {before.get('last_period')}")
    elif k == "http-headers":
        lines.append(f"File changed: Last-Modified {i.get('last_modified')}, ETag {i.get('etag')}")
        if before.get("last_modified") or before.get("etag"):
            lines.append(f"Before: Last-Modified {before.get('last_modified')}, ETag {before.get('etag')}")
    elif k == "http-hash":
        lines.append(f"File content changed ({i.get('size')} bytes)")
    elif k == "http-regex":
        new = sorted(set(i.get("matches", [])) - set(before.get("matches", [])))
        gone = sorted(set(before.get("matches", [])) - set(i.get("matches", [])))
        if new:
            lines.append("New on the page: " + ", ".join(f"`{m}`" for m in new))
        if gone:
            lines.append("No longer on the page: " + ", ".join(f"`{m}`" for m in gone))
        if not new and not gone:
            lines.append("On the page: " + ", ".join(f"`{m}`" for m in i.get("matches", [])[:8]))
    elif k == "calendar-year":
        lines.append("A new calendar year has started; this figure is defined per calendar year")
    return lines


def draft_entry(p, r, publisher):
    """One plain sentence: what was published, by whom, when. No claim about a value
    unless the probe read it."""
    i = r.get("info", {})
    k = p["kind"]
    if k == "fso-dam":
        prov = " (provisional data)" if i.get("provisional") else ""
        per = f"; it covers {i.get('period')}" if i.get("period") else ""
        return f"The FSO published a new edition of table {i.get('orderNr')} (“{i.get('title')}”) on {fmt_date(i.get('published'))}{per}{prov}."
    if k == "fso-pxweb":
        return f"The FSO updated the STAT-TAB table {i.get('cube')} (“{i.get('title')}”) on {fmt_date(i.get('updated'))}; its latest period is {i.get('last_period')}."
    if k == "eurostat":
        v = f": {i['last_value']} for {i.get('last_period')}" if "last_value" in i else f"; the latest period for Switzerland is {i.get('last_period')}"
        return f"Eurostat updated table {i.get('dataset')} (“{i.get('title')}”) on {fmt_date(i.get('updated'))}{v}."
    if k == "snb-cube":
        return f"The SNB published a new edition of the data portal cube {i.get('cube')} on {fmt_date(i.get('published'))}; its latest period is {i.get('last_period')}."
    if k == "http-headers":
        when = f" on {fmt_date(i['changed'])}" if i.get("changed") else ""
        return f"The {publisher} replaced the file {i.get('file')}{when} (date sent by the server)."
    if k == "http-regex":
        return f"The {publisher} page {i.get('page')} lists a new or changed file: " + ", ".join(i.get("matches", [])[:3]) + "."
    if k == "http-hash":
        return f"The content of the {publisher} file {i.get('file')} changed."
    return None


def render_report(today, s, editions, link_items, failures, manual_due, notes, manual_list, data_errors):
    L = [f"# Source watcher, {today.isoformat()}", ""]
    c = s["counts"]
    L.append(f"{c['new_edition']} source(s) with a new edition or a newer period, {c['link']} link problem(s), "
             f"{c['could_not_check']} check(s) that could not be made today, {c['manual_due']} manual check(s) due. "
             f"Checked {s['probes']} probes and {s['links_checked']} links with {s['requests']} requests in {s['runtime_seconds']} s.")
    L.append("")
    L.append("Nothing on the site was changed. Each item names the file and key to edit by hand and the official page to open.")
    L.append("")

    L.append("## New edition published")
    L.append("")
    if not editions:
        L.append("None.")
        L.append("")
    for key, ed in sorted(editions.items(), key=lambda kv: kv[0]):
        p, r = ed["probe"], ed["result"]
        L.append(f"### {describe_source(p, r)}")
        L.append("")
        L.append(f"- Why listed: {'; '.join(ed['why'])}")
        for line in facts(p, r, ed["before"]):
            L.append(f"- {line}")
        if r.get("newest_year") is not None and p["kind"] != "calendar-year":
            L.append(f"- Newest complete year the source offers: {r['newest_year']}")
        page = r["info"].get("page")
        if page:
            L.append(f"- Official page: {page}")
        if r["info"].get("file") and r["info"].get("file") != page:
            L.append(f"- File: {r['info']['file']}")
        L.append("- Where it is used:")
        for it, expected, is_new in ed["items"]:
            shown = f"site shows {it['_year']}" if it["_year"] is not None else "site period unknown"
            gap = f", newer period {expected} available" if expected is not None else ""
            L.append(f"  - {it['label']} ({shown}{gap}): {where(it['used_in'])}; link on the site: {it['_url']}")
        publisher = ed["items"][0][0]["publisher"] if ed["items"] else "office"
        d = draft_entry(p, r, publisher)
        if d:
            L.append(f"- Draft change-log entry: “{d}”")
        L.append("")

    L.append("## Link moved or broken")
    L.append("")
    if not link_items:
        L.append("None.")
    for li in link_items:
        final = f" → {li['final']}" if li["final"] and norm_url(li["final"]) != norm_url(li["url"]) else ""
        L.append(f"- {li['url']}{final}: {li['verdict']}, {li['detail']}.")
        for it, used in li["users"]:
            L.append(f"  - edit {where(used)}")
    L.append("")

    L.append("## Could not check")
    L.append("")
    L.append(f"A network error or a refusal is not a finding. It is listed here every day; it counts as an item "
             f"(and opens or updates the issue) only after {FAIL_ESCALATE} runs in a row.")
    L.append("")
    if not failures:
        L.append("None.")
    for f in sorted(failures, key=lambda x: x["key"]):
        streak = f"failing since {f['since']} ({f['fail']} runs)" if f["fail"] > 1 else "first failure"
        mark = " **(reported: failing for several runs)**" if f["item"] and f["fail"] >= FAIL_ESCALATE else ""
        if f.get("registry_item"):
            it = f["registry_item"]
            L.append(f"- Registry item `{it['id']}`: {f['error']}. Fix `scripts/watch/sources.json` or the data file.")
            continue
        L.append(f"- `{f['key']}`: {f['error']}; {streak}{mark}")
        if f.get("users"):
            for it, used in f["users"]:
                L.append(f"  - shown in {where(used)}")
    L.append("")

    L.append("## Manual checks due")
    L.append("")
    if not manual_due:
        due_later = sorted(dt.date.fromisoformat(m["last_checked"]) + dt.timedelta(days=MANUAL_DAYS) for _, _, m in manual_list)
        nxt = f" The next one is due on {due_later[0].isoformat()}." if due_later else ""
        L.append(f"None. {len(manual_list)} manual checks are registered.{nxt}")
    for it, m, age in manual_due:
        L.append(f"- {it['label']} ({it['publisher']}): last checked by a person on {m['last_checked']} ({age} days ago). Why by hand: {m['why']}.")
        if m.get("how"):
            L.append(f"  - How: {m['how']}")
        for u in it.get("urls", [it.get("_url")]):
            if u:
                L.append(f"  - Open: {u}")
        L.append(f"  - Edit if needed: {where(it['used_in'])}")
        L.append("  - When done: set `last_checked` to today's date in `scripts/watch/sources.json`.")
    L.append("")

    if notes or data_errors:
        L.append("## Registry notes")
        L.append("")
        for n in notes + [f"Data file not readable: {e}" for e in data_errors]:
            L.append(f"- {n}")
        L.append("")

    L.append("---")
    L.append("Requests per host: " + ", ".join(f"{h} {n}" for h, n in s["requests_per_host"].items()) + ".")
    if s.get("retries_per_host"):
        L.append("Retries (included above): " + ", ".join(f"{h} {n}" for h, n in s["retries_per_host"].items()) + ".")
    L.append("")
    return "\n".join(L)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Check the official sources used by the site for newer editions and moved links.")
    ap.add_argument("--registry", default=str(HERE / "sources.json"))
    ap.add_argument("--state", default=str(HERE / "state.json"), help="state of the previous run (missing file = first run)")
    ap.add_argument("--root", default=str(PROJECT_ROOT), help="repository root whose data files are read")
    ap.add_argument("--out-dir", default=str(Path(tempfile.gettempdir()) / "swissdata-watch"))
    ap.add_argument("--today", help="YYYY-MM-DD, for tests")
    ap.add_argument("--pause", type=float, default=PAUSE, help="seconds between requests to the same host")
    ap.add_argument("--workers", type=int, default=8)
    ap.add_argument("--write-seed", help="also write a seed state (fingerprints only) to this file")
    ap.add_argument("--fingerprints-only", action="store_true",
                    help="ignore the period comparison (shows what a watcher based on the state file alone would report)")
    args = ap.parse_args(argv)
    return run(args)


if __name__ == "__main__":
    sys.exit(main())
