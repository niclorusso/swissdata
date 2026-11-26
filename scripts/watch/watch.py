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
A bad registry item or a damaged state never stops the run: the item is skipped
and named under "Registry notes", the state is ignored (first run) and the report
says so. Exit code 2 only when the registry is not valid JSON or an argument is wrong.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import datetime as dt
import hashlib
import http.client
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
STATE_VERSION = 1
META_KEYS = ("_issue", "_notes", "_load_error", "_source")   # written by github_issue.py load-state

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
# Required keys of each probe kind (validated before the run).
PROBE_KEYS = {
    "fso-dam": ("orderNr",),
    "fso-pxweb": ("cube",),
    "eurostat": ("dataset",),
    "snb-cube": ("cube",),
    "http-headers": ("url",),
    "http-hash": ("url",),
    "http-regex": ("url", "pattern"),
    "calendar-year": (),
}
KINDS = set(PROBE_KEYS)
SHOWN_FROM = {"indicators", "questions", "cantons", "build_cantons", "context", "static"}


# ---------------------------------------------------------------------------
# HTTP: one request at a time per host, a pause between requests, timeouts,
# retries with backoff, truncated downloads rejected. Requests counted per host.
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
        try:
            return self.body.decode(m.group(1) if m else "utf-8", "replace")
        except LookupError:
            return self.body.decode("utf-8", "replace")


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
        """Return a Response. HTTP errors are returned as responses (status >= 300)
        when ok_statuses is "any"; otherwise they raise FetchError.
        Network errors, timeouts, truncated downloads, 429 and 5xx are retried with
        backoff. After HOST_GIVE_UP requests in a row have failed that way, the host
        is not asked again in this run (one host that is down cannot stretch the run)."""
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
                final = attempt + 1 == ATTEMPTS
                try:
                    req = urllib.request.Request(url, headers=headers, method=method)
                    with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                        body = b"" if method == "HEAD" else resp.read(max_bytes + 1)
                        hdrs = {k.lower(): v for k, v in resp.headers.items()}
                        status, final_url = resp.status, resp.geturl()
                    truncated = len(body) > max_bytes
                    declared = hdrs.get("content-length")
                    if (method != "HEAD" and not truncated and declared and declared.isdigit()
                            and len(body) < int(declared)):
                        raise http.client.IncompleteRead(body, int(declared) - len(body))
                    self._done(host, started, ok=True)
                    return Response(status, final_url, hdrs, body[:max_bytes], truncated)
                except urllib.error.HTTPError as err:
                    transient = err.code in (429, 500, 502, 503, 504)
                    # a 404 proves the host works (reset); a 429/5xx counts only once retries are used up
                    self._done(host, started, ok=not (transient and final),
                               reason=f"HTTP {err.code}" if transient else None)
                    body = b""
                    try:
                        body = err.read(65536)
                    except Exception:
                        pass
                    retry_after = err.headers.get("Retry-After") if err.headers else None
                    if transient and not final:
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
                    what = " (redirect loop or redirect without a target)" if 300 <= err.code < 400 else ""
                    raise FetchError(f"HTTP {err.code} from {host}{what}") from None
                except (urllib.error.URLError, socket.timeout, TimeoutError, ConnectionError, OSError,
                        http.client.HTTPException) as err:
                    if isinstance(err, http.client.IncompleteRead):
                        last_error = f"truncated download ({len(err.partial)} bytes, {err.expected} missing)"
                    else:
                        last_error = f"{type(err).__name__}: {getattr(err, 'reason', err)}"
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
# Periods and small helpers
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


def as_dict(x):
    return x if isinstance(x, dict) else {}


# ---------------------------------------------------------------------------
# Probes. Each returns a dict:
#   fingerprint  str or None  (compared with the state; a change = new publication)
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
    assets = [a for a in (as_dict(data).get("data") or []) if isinstance(a, dict)]
    # the API also returns tables whose number starts with this one (je-d-03.02.01.16 -> .16.01, .16.03)
    exact = [a for a in assets if as_dict(a.get("shop")).get("orderNr") == order]
    if not exact:
        others = sorted({str(as_dict(a.get("shop")).get("orderNr")) for a in assets})
        raise FetchError(f"the FSO DAM API has no table with exactly the number {order}"
                         + (f" (it returned {', '.join(others)})" if others else ""))
    current = [a for a in exact if as_dict(as_dict(a.get("bfs")).get("lifecycle")).get("code") == "CURRENT"] or exact

    def rank(a):
        dam_id = as_dict(a.get("ids")).get("damId")
        return (as_dict(a.get("bfs")).get("embargo") or "", dam_id if isinstance(dam_id, int) else -1)
    a = max(current, key=rank)
    bfs, desc = as_dict(a.get("bfs")), as_dict(a.get("description"))
    period = as_dict(desc.get("bibliography")).get("period")
    asset_id = as_dict(a.get("ids")).get("damId")
    published = (bfs.get("embargo") or "")[:10]
    newest = period_end_year(period)
    info = {
        "asset": asset_id,
        "published": published,
        "provisional": bool(bfs.get("provisional")),
        "period": period,
        "title": as_dict(desc.get("titles")).get("main"),
        "orderNr": order,
        "file": f"https://dam-api.bfs.admin.ch/hub/api/dam/assets/{asset_id}/master",
        "page": f"https://www.bfs.admin.ch/asset/{dam_lang(order)}/{order}",
    }
    if p.get("edition") == "annual":
        # monthly or quarterly table: only a new complete year counts as news
        fingerprint = f"year:{newest}"
    else:
        fingerprint = f"{asset_id}|{published}|{int(info['provisional'])}"
    return {"fingerprint": fingerprint, "newest_year": newest, "info": info}


def probe_fso_pxweb(http, p, today, prev=None):
    cube = p["cube"]
    base = f"https://www.pxweb.bfs.admin.ch/api/v1/de/{cube}"
    page = f"https://www.pxweb.bfs.admin.ch/pxweb/de/{cube}/"
    listing = http.json(base)
    entry = next((e for e in listing if isinstance(e, dict) and e.get("id") == f"{cube}.px"), None) \
        if isinstance(listing, list) else None
    if not entry:
        raise FetchError(f"the STAT-TAB API does not list the table {cube}")
    prev = as_dict(prev)
    if prev.get("updated") == entry.get("updated") and prev.get("last_period") and prev.get("title"):
        # unchanged since the last run: no need to ask for the metadata (PXWeb answers 429 when asked too often)
        newest = prev.get("newest_year") if isinstance(prev.get("newest_year"), int) else period_end_year(prev["last_period"])
        return {"fingerprint": f"{entry.get('updated')}|{prev['last_period']}", "newest_year": newest,
                "info": dict(prev, cube=cube, page=page, newest_year=newest)}
    meta = as_dict(http.json(f"{base}/{cube}.px"))
    variables = [v for v in meta.get("variables") or [] if isinstance(v, dict)]
    if p.get("time_var"):
        tvar = next((v for v in variables if v.get("code") == p["time_var"]), None)
    else:
        tvar = next((v for v in variables if v.get("time")), None)
    if not tvar:
        raise FetchError(f"no time variable in {cube}")
    periods = [str(v) for v in tvar.get("values") or []]
    years = [y for y in (period_end_year(v) for v in periods) if y is not None]
    last = max(periods, key=lambda v: (period_end_year(v) or 0, v)) if periods else None
    info = {"updated": entry.get("updated"), "last_period": last, "newest_year": max(years) if years else None,
            "title": meta.get("title"), "cube": cube, "page": page}
    return {"fingerprint": f"{entry.get('updated')}|{last}", "newest_year": info["newest_year"], "info": info}


def probe_eurostat(http, p, today, prev=None):
    ds = p["dataset"]
    params = [("format", "JSON"), ("lang", "EN"), ("sinceTimePeriod", str(p.get("since", 2010)))]
    for k, v in as_dict(p.get("filters")).items():
        for item in (v if isinstance(v, list) else [v]):
            params.append((k, item))
    url = f"https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/{ds}?" + urllib.parse.urlencode(params)
    resp = http.request(url, accept="application/json", ok_statuses="any")
    try:
        data = json.loads(resp.text())
    except ValueError:
        raise FetchError(f"Eurostat answered HTTP {resp.status} without JSON") from None
    if not isinstance(data, dict) or "error" in data or resp.status >= 300:
        err = as_dict(data).get("error")
        label = err[0].get("label") if isinstance(err, list) and err and isinstance(err[0], dict) else err
        raise FetchError(f"Eurostat HTTP {resp.status}: {label}")
    try:
        dims, sizes = list(data["id"]), list(data["size"])
        t = dims.index("time")
        codes = []
        for d in dims:
            index = as_dict(as_dict(as_dict(data.get("dimension")).get(d)).get("category")).get("index") or {}
            if d == "time" and not index:
                raise KeyError("time")
            pos = {v: k for k, v in index.items()} if isinstance(index, dict) else dict(enumerate(index))
            codes.append(pos)
    except (KeyError, TypeError, ValueError):
        raise FetchError(f"Eurostat {ds}: the answer does not have the usual structure") from None
    values = data.get("value") or {}
    if isinstance(values, list):
        values = {str(i): v for i, v in enumerate(values) if v is not None}
    strides = [1] * len(sizes)
    for i in range(len(sizes) - 2, -1, -1):
        strides[i] = strides[i + 1] * sizes[i + 1]
    by_code, times = {}, {}
    for idx, val in values.items():
        n = int(idx)
        coord = [codes[i].get((n // strides[i]) % sizes[i], "?") for i in range(len(sizes))]
        by_code["|".join(f"{d}={c}" for d, c in zip(dims, coord))] = val   # positions never enter the hash
        times.setdefault(coord[t], []).append(val)
    if not times:
        raise FetchError(f"Eurostat {ds}: no value for this selection since {p.get('since', 2010)}")
    last = max(times, key=lambda c: (period_end_year(c) or 0, c))
    single = all(s == 1 for i, s in enumerate(sizes) if i != t)
    info = {"updated": data.get("updated"), "last_period": last, "title": data.get("label"), "dataset": ds,
            "page": f"https://ec.europa.eu/eurostat/databrowser/view/{ds}/default/table"}
    if single:
        info["last_value"] = times[last][0]
    return {"fingerprint": f"{last}|{short_hash(json.dumps(sorted(by_code.items())))}",
            "newest_year": period_end_year(last), "info": info}


def probe_snb_cube(http, p, today, prev=None):
    cube = p["cube"]
    upd = as_dict(http.json(f"https://data.snb.ch/api/cube/{cube}/lastUpdate"))
    csv = http.request(f"https://data.snb.ch/api/cube/{cube}/data/csv/en?fromDate={today.year - 3}").text()
    dates = re.findall(r'^"(\d{4}(?:-\d{2})?)";', csv, flags=re.M)
    if not dates:
        raise FetchError(f"the SNB data portal sent no dated rows for {cube}")
    last = max(dates)
    published = upd.get("publicSinceDate") or upd.get("editionDate")
    newest = int(last[:4]) if len(last) == 4 or last.endswith("-12") else int(last[:4]) - 1
    pub_iso = f"{published[:4]}-{published[4:6]}-{published[6:8]}" if published and re.match(r"\d{8}", published) else None
    return {"fingerprint": f"{published}|{last}", "newest_year": newest,
            "info": {"published": pub_iso, "last_period": last, "cube": cube,
                     "page": p.get("page") or f"https://data.snb.ch/en/topics/uvo/cube/{cube}"}}


def probe_http_headers(http, p, today, prev=None):
    url = expand_url(p["url"], today)
    resp = http.request(url, method="HEAD", ok_statuses="any")
    if resp.status in (403, 405, 501):
        resp = http.request(url, max_bytes=1, ok_statuses="any")
    if resp.status != 200:
        raise FetchError(f"HTTP {resp.status}")
    etag, lm = resp.header("etag"), resp.header("last-modified")
    if not etag and not lm:
        raise FetchError("the server sends no version information (ETag, Last-Modified): use http-hash for this file")
    changed = None
    if lm:
        try:
            changed = dt.datetime.strptime(lm, "%a, %d %b %Y %H:%M:%S GMT").date().isoformat()
        except ValueError:
            changed = None
    return {"fingerprint": etag or lm, "newest_year": None,
            "info": {"etag": etag, "last_modified": lm, "changed": changed, "size": resp.header("content-length"),
                     "file": url, "page": p.get("page") or url}}


def probe_http_hash(http, p, today, prev=None):
    url = expand_url(p["url"], today)
    limit = p.get("max_bytes", MAX_FILE)
    resp = http.request(url, max_bytes=limit)
    if resp.truncated:
        raise FetchError(f"file larger than {limit} bytes: use http-headers")
    return {"fingerprint": hashlib.sha256(resp.body).hexdigest(), "newest_year": None,
            "info": {"size": len(resp.body), "file": url, "page": p.get("page") or url}}


def probe_http_regex(http, p, today, prev=None):
    url = expand_url(p["url"], today)
    resp = http.request(url, max_bytes=MAX_PAGE)
    rx = re.compile(p["pattern"])
    found = sorted({(m.group(1) if rx.groups else m.group(0)) for m in rx.finditer(resp.text())})
    if not found:
        raise FetchError("the pattern is no longer on the page (page redesigned?)")
    newest = None
    if p.get("period") == "max-year":
        ys = [y for f in found for y in years_in(f)]
        newest = max(ys) if ys else None
    return {"fingerprint": short_hash("\n".join(found)), "newest_year": newest,
            "info": {"matches": found[:30], "page": p.get("page") or url}}


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
        f = "&".join(f"{a}={b}" for a, b in sorted(as_dict(p.get("filters")).items()))
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
    return urllib.parse.urlsplit(p["url"]).hostname or "?"


def describe_source(p, r=None):
    """The source in plain words, for headings and for 'could not check'."""
    i = as_dict((r or {}).get("info"))
    k = p["kind"]
    if k == "fso-dam":
        t = f", “{i['title']}”" if i.get("title") else ""
        return f"FSO table {p['orderNr']}{t}"
    if k == "fso-pxweb":
        t = f", “{i['title']}”" if i.get("title") else ""
        return f"FSO STAT-TAB table {p['cube']}{t}"
    if k == "eurostat":
        t = f", “{i['title']}”" if i.get("title") else ""
        return f"Eurostat table {p['dataset']}{t}"
    if k == "snb-cube":
        return f"SNB data portal, table {p['cube']}"
    if k == "calendar-year":
        return "Figures defined per calendar year"
    return f"{p.get('label') or 'File'} ({p.get('page') or p['url']})"


# ---------------------------------------------------------------------------
# Link check: the URL shown to visitors answers 200 and is not a generic page.
# ---------------------------------------------------------------------------

# Pages that answer 200 for an address that does not exist. The admin.ch sites carry
# the text "Diese Seite existiert nicht" in the scripts of every page, so only the error
# code, the main content, the title and the first heading count.
SOFT_404 = [
    r'"newsNotFound"',
    r'<main id="main-content">(?:<!--\[-->)?<div class="container"><p[^>]*>Diese Seite existiert nicht',
    r"<title>[^<]{0,80}(?:404|[Nn]ot [Ff]ound|nicht gefunden|introuvable|non trovata)",
    r"<h1[^>]*>[^<]{0,80}(?:[Nn]ot [Ff]ound|nicht gefunden|existiert (?:leider )?nicht|n'existe pas|non esiste)",
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
    if 300 <= resp.status < 400:
        return "broken", f"HTTP {resp.status}: a redirect loop or a redirect without a target", final
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
            return "moved", "the link pointed to a file and now opens a web page", final
    if norm_url(url) == norm_url(final):
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
    for piece in re.split(r'\n\s{4}id: "', text)[1:]:
        out[piece.split('"', 1)[0]] = piece
    return out


def ts_field(block, name):
    m = re.search(rf'\n\s*{name}:\s*"((?:[^"\\]|\\.)*)"', block or "")
    if not m:
        return None
    try:
        return json.loads(f'"{m.group(1)}"')
    except ValueError:
        return m.group(1)


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


def parse_cantons_ts(text):
    """What the canton page shows: {('meta', 'population'): (year, url), ('id', 'unemployment-rate'): (year, url)}."""
    out = {}
    for name in ("population", "area"):
        m = re.search(rf"export const canton{name.capitalize()}Meta[^=]*=\s*\{{(.*?)\n\}};", text, re.S)
        if m:
            y = re.search(r'referenceDate:\s*"(\d{4})', m.group(1))
            u = re.search(r'sourceUrl:\s*"([^"]+)"', m.group(1))
            out[("meta", name)] = (int(y.group(1)) if y else None, u.group(1) if u else None)
    m = re.search(r"export const cantonIndicatorMeta[^=]*=\s*\[(.*?)\n\];", text, re.S)
    if m:
        for ident, year, url in re.findall(r'id:\s*"([^"]+)",.*?year:\s*(\d{4}),.*?sourceUrl:\s*"([^"]+)"', m.group(1), re.S):
            out[("id", ident)] = (int(year), url)
    return out


def ts_related_year(block):
    """Year of the other official measure named on the card (`related: { ..., year: 2024, ... }`), or None."""
    m = re.search(r"\n\s*related:\s*\{[^\n]*?\byear:\s*(\d{4})", block or "")
    return int(m.group(1)) if m else None


class SiteData:
    def __init__(self, root):
        self.root = Path(root)
        self.errors = []
        self.indicators = self._parse("src/data/indicators.ts", ts_blocks, {})
        self.questions = self._parse("src/data/questions.ts", ts_blocks, {})
        self.cantons = self._parse("src/data/cantons.ts", parse_cantons_ts, {})
        self.cantons_py = self._parse("scripts/data/build_cantons.py", py_constants, {})
        sources_ts = self._read("src/data/sources.ts") or ""
        self.about = dict(re.findall(r'abbr:\s*"([^"]+)",\s*\n\s*url:\s*"([^"]+)"', sources_ts))

    def _read(self, rel):
        try:
            return (self.root / rel).read_text("utf-8")
        except OSError as err:
            self.errors.append(f"`{rel}` not readable ({err.strerror})")
            return None

    def _parse(self, rel, fn, empty):
        text = self._read(rel)
        return fn(text) if text else empty

    def place(self, spec):
        """-> dict(where, edit, year, url, how, err) for one 'shown' spec."""
        src = spec.get("from")
        out = {"spec": spec, "year": None, "url": None, "how": None, "err": None}
        if src == "indicators":
            b = self.indicators.get(spec["id"])
            out.update(where="src/data/indicators.ts", edit=f"`src/data/indicators.ts` → `{spec['id']}`")
            if b is None:
                out["err"] = f"no indicator with id {spec['id']} in src/data/indicators.ts"
                return out
            ys = [int(y) for y in re.findall(r"year:\s*(\d{4})", b)]
            out.update(year=max(ys) if ys else None, url=ts_field(b, "sourceUrl"),
                       how=f"latest year in the chart; lastUpdated \"{ts_field(b, 'lastUpdated')}\"")
        elif src == "questions":
            b = self.questions.get(spec["id"])
            out.update(where="src/data/questions.ts", edit=f"`src/data/questions.ts` → `{spec['id']}`")
            if b is None:
                out["err"] = f"no question with id {spec['id']} in src/data/questions.ts"
                return out
            ys = years_in(ts_field(b, spec.get("field", "question")))
            out.update(year=max(ys) if ys else None, url=ts_field(b, "sourceUrl"), how="year named in the question")
        elif src == "cantons":
            key = ("meta", spec["meta"]) if spec.get("meta") else ("id", spec.get("id"))
            out.update(where="src/data/cantons.ts", edit=f"`src/data/cantons.ts` → `{key[1]}`")
            if key not in self.cantons:
                out["err"] = f"no canton figure {key[1]} in src/data/cantons.ts"
                return out
            year, url = self.cantons[key]
            out.update(year=year, url=url, how="year shown on the canton page")
        elif src == "build_cantons":
            raw = self.cantons_py.get(spec["year_const"])
            out.update(where="scripts/data/build_cantons.py", edit=f"`scripts/data/build_cantons.py` → `{spec['year_const']}`")
            if raw is None:
                out["err"] = f"no constant {spec['year_const']} in scripts/data/build_cantons.py"
                return out
            out.update(year=int(str(raw)[:4]), url=self.cantons_py.get(spec.get("url_const")), how=f"{spec['year_const']} = {raw}")
        elif src == "context":
            # the info text of a card: `context` (English) and the year of the `related` measure;
            # the same texts in Italian, German and French are in src/i18n/dataTranslations.ts
            b = self.indicators.get(spec["id"])
            out.update(where="src/data/indicators.ts (context)",
                       edit=f"`src/data/indicators.ts` → `{spec['id']}`: `context` and `related` (English), "
                            f"and `src/i18n/dataTranslations.ts` → `{spec['id']}` (it, de, fr)")
            if b is None:
                out["err"] = f"no indicator with id {spec['id']} in src/data/indicators.ts"
                return out
            ys = years_in(ts_field(b, "context"))
            related = ts_related_year(b)
            if related:
                ys.append(related)
            out.update(year=max(ys) if ys else None, how="latest year named in the info text (context and related)")
        elif src == "static":
            out.update(where="registry", edit="the registry", year=spec.get("period"), url=spec.get("url"),
                       how="period set in the registry")
        return out


# ---------------------------------------------------------------------------
# Registry and state: validated, never fatal
# ---------------------------------------------------------------------------

def _regex_ok(pattern):
    try:
        re.compile(pattern)
        return True
    except (re.error, TypeError):
        return False


def check_probe(p):
    if not isinstance(p, dict):
        return "a probe is not an object"
    kind = p.get("kind")
    if kind not in KINDS:
        return f"unknown probe kind {kind!r}"
    for key in PROBE_KEYS[kind]:
        if not isinstance(p.get(key), str) or not p[key].strip():
            return f"probe {kind} needs '{key}'"
    if kind == "http-regex":
        if not _regex_ok(p["pattern"]):
            return f"probe http-regex: the pattern {p['pattern']!r} is not a valid regular expression"
        if re.compile(p["pattern"]).groups > 1:
            return "probe http-regex: the pattern may have at most one group"
    if kind in ("http-headers", "http-hash", "http-regex") and not re.match(r"^https?://", p["url"]):
        return f"probe {kind}: the url must start with http:// or https://"
    if "filters" in p and not isinstance(p["filters"], dict):
        return "probe eurostat: 'filters' must be an object"
    if "period_offset" in p and not isinstance(p["period_offset"], int):
        return "'period_offset' must be a whole number"
    if p.get("edition") not in (None, "each", "annual"):
        return "'edition' must be 'each' or 'annual'"
    return None


def check_shown(spec):
    if not isinstance(spec, dict):
        return "'shown' must be an object or a list of objects"
    src = spec.get("from")
    if src not in SHOWN_FROM:
        return f"'shown.from' must be one of {', '.join(sorted(SHOWN_FROM))}"
    need = {"indicators": ("id",), "questions": ("id",), "context": ("id",), "build_cantons": ("year_const",),
            "static": ("period",), "cantons": ()}[src]
    for key in need:
        if key not in spec:
            return f"'shown' from {src} needs '{key}'"
    if src == "cantons" and not (spec.get("id") or spec.get("meta") in ("population", "area")):
        return "'shown' from cantons needs 'id' or 'meta' (population or area)"
    if src == "static" and not isinstance(spec.get("period"), int):
        return "'shown.period' must be a year"
    return None


def check_item(item, seen):
    if not isinstance(item, dict):
        return None, "an item is not an object"
    iid = item.get("id")
    if not isinstance(iid, str) or not iid:
        return None, "an item has no id"
    if iid in seen:
        return iid, "duplicate id"
    for key in ("label", "publisher"):
        if not isinstance(item.get(key), str):
            return iid, f"missing '{key}'"
    used = item.get("used_in")
    if not isinstance(used, dict) or not isinstance(used.get("file"), str) or not isinstance(used.get("key"), str):
        return iid, "'used_in' must be an object with 'file' and 'key'"
    shown = item.get("shown")
    for spec in (shown if isinstance(shown, list) else [shown]):
        err = check_shown(spec)
        if err:
            return iid, err
    if not isinstance(item.get("probes", []), list):
        return iid, "'probes' must be a list"
    m = item.get("manual")
    if m is not None:
        if not isinstance(m, dict):
            return iid, "'manual' must be an object"
        try:
            dt.date.fromisoformat(str(m.get("last_checked")))
        except ValueError:
            return iid, "manual.last_checked must be a date YYYY-MM-DD"
        if not isinstance(m.get("why"), str):
            return iid, "manual.why is missing"
    return iid, None


def load_registry(path):
    """-> (registry with only valid parts, notes). Not valid JSON = fatal (exit 2)."""
    try:
        reg = json.loads(Path(path).read_text("utf-8"))
    except (OSError, ValueError) as err:
        raise SystemExit(f"registry {path} cannot be read: {err}")
    if not isinstance(reg, dict) or not isinstance(reg.get("items"), list):
        raise SystemExit(f"registry {path} has no list 'items'")
    notes, items, seen = [], [], set()
    for item in reg["items"]:
        iid, err = check_item(item, seen)
        if err:
            notes.append(f"Registry item `{iid or '?'}` skipped: {err}.")
            continue
        seen.add(iid)
        probes = []
        for p in item.get("probes", []):
            perr = check_probe(p)
            if perr:
                notes.append(f"Registry item `{iid}`: one probe skipped: {perr}.")
            else:
                probes.append(p)
        items.append(dict(item, probes=probes))
    clean = {"items": items}
    for name, keys in (("redirect_rules", ("from", "to")), ("link_skip", ("match",))):
        rules = []
        for r in reg.get(name, []) if isinstance(reg.get(name), list) else []:
            if isinstance(r, dict) and all(isinstance(r.get(k), str) and _regex_ok(r[k]) for k in keys):
                rules.append(r)
            else:
                notes.append(f"Registry `{name}`: a rule with a missing or invalid pattern was skipped ({json.dumps(r)[:80]}).")
        clean[name] = rules
    hosts = {}
    for host, m in as_dict(reg.get("manual_link_hosts")).items():
        try:
            dt.date.fromisoformat(str(as_dict(m).get("last_checked")))
            if not isinstance(m.get("why"), str):
                raise ValueError
            hosts[host] = m
        except ValueError:
            notes.append(f"Registry `manual_link_hosts.{host}` skipped: needs 'why' and 'last_checked' (YYYY-MM-DD).")
    clean["manual_link_hosts"] = hosts
    clean["host_pause"] = {h: float(v) for h, v in as_dict(reg.get("host_pause")).items() if isinstance(v, (int, float))}
    return clean, notes


def load_state(path):
    """-> (state or {}, top notes, first_run). Never fatal."""
    notes = []
    try:
        raw = Path(path).read_text("utf-8") if path and Path(path).exists() else ""
    except OSError as err:
        return {}, [f"The state file could not be read ({err.strerror}): this run is treated as a first run."], True
    if not raw.strip():
        return {}, [], True
    try:
        st = json.loads(raw)
    except ValueError as err:
        return {}, [f"The state of the last run is not valid JSON ({err}): this run is treated as a first run."], True
    if not isinstance(st, dict):
        return {}, ["The state of the last run is not an object: this run is treated as a first run."], True
    notes += [str(n) for n in st.get("_notes", []) if isinstance(n, str)] if isinstance(st.get("_notes"), list) else []
    if st.get("_load_error"):
        return {}, notes + [f"{st['_load_error']}: this run is treated as a first run (nothing is compared with earlier runs)."], True
    problems = []
    shapes = {"probes": dict, "links": dict, "gaps": dict, "manual": dict, "registry_errors": dict}
    for key, typ in shapes.items():
        if key in st and not isinstance(st[key], typ):
            problems.append(f"'{key}' is a {type(st[key]).__name__}")
    for key in ("probes", "links"):
        bad = [k for k, v in as_dict(st.get(key)).items() if not isinstance(v, dict)]
        if bad:
            problems.append(f"{len(bad)} entries of '{key}' are not objects")
    if any(not isinstance(v, int) for v in as_dict(st.get("gaps")).values()):
        problems.append("'gaps' holds values that are not years")
    if st.get("version", STATE_VERSION) != STATE_VERSION:
        problems.append(f"version {st.get('version')} (expected {STATE_VERSION})")
    if problems:
        return {}, notes + ["The state of the last run is damaged (" + "; ".join(problems)
                            + "): this run is treated as a first run."], True
    st = {k: v for k, v in st.items() if k not in META_KEYS}
    return st, notes, not st.get("probes")


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

def run(args):
    t0 = time.monotonic()
    today = dt.date.fromisoformat(args.today) if args.today else dt.date.today()
    reg, reg_notes = load_registry(args.registry)
    site = SiteData(args.root)
    prev, top_notes, first_run = load_state(args.state)
    prev_probes, prev_links = as_dict(prev.get("probes")), as_dict(prev.get("links"))
    prev_gaps, prev_manual = as_dict(prev.get("gaps")), as_dict(prev.get("manual"))
    prev_reg_errors = as_dict(prev.get("registry_errors"))

    http = Http(pause=args.pause, host_pause=reg["host_pause"])
    rules, skip_rules, manual_hosts = reg["redirect_rules"], reg["link_skip"], reg["manual_link_hosts"]
    notes = list(reg_notes)

    # --- resolve items against the data files
    items, data_errors = [], []
    for it in reg["items"]:
        specs = it["shown"] if isinstance(it["shown"], list) else [it["shown"]]
        places = [site.place(s) for s in specs]
        for pl in places:
            if pl["err"]:
                data_errors.append((it, pl["err"]))
            elif pl["year"] is None:
                extra = "" if it["probes"] else " (the item has only a manual check)"
                notes.append(f"`{it['id']}`: period check skipped for {pl['where']}: it names no year{extra}.")
        url = next((pl["url"] for pl in places if pl["url"]), None)
        it = dict(it, _places=places, _url=url or it.get("url"))
        it["_year"] = places[0]["year"]
        if url and it.get("url") and norm_url(url) != norm_url(it["url"]):
            notes.append(f"`{it['id']}`: the registry has {it['url']}, the data file links {url}; the data file is checked.")
        items.append(it)

    # every link in the data files that no registry item covers is still checked
    covered = {(s.get("from"), s.get("id") or s.get("meta"))
               for it in reg["items"] for s in (it["shown"] if isinstance(it["shown"], list) else [it["shown"]])}
    extra_links = []
    for ident, block in site.indicators.items():
        if ("indicators", ident) not in covered:
            notes.append(f"`src/data/indicators.ts` id `{ident}` has no registry item (only its link is checked).")
            extra_links.append((ts_field(block, "sourceUrl"), {"file": "src/data/indicators.ts", "key": f"{ident} (sourceUrl)"}))
    for ident, block in site.questions.items():
        if ("questions", ident) not in covered:
            notes.append(f"`src/data/questions.ts` id `{ident}` has no registry item (only its link is checked).")
            extra_links.append((ts_field(block, "sourceUrl"), {"file": "src/data/questions.ts", "key": f"{ident} (sourceUrl)"}))
    for (kind, ident), (_, url) in site.cantons.items():
        if ("cantons", ident) not in covered:
            notes.append(f"`src/data/cantons.ts` figure `{ident}` has no registry item (only its link is checked).")
            extra_links.append((url, {"file": "src/data/cantons.ts", "key": f"{ident} (sourceUrl)"}))
    for abbr, url in site.about.items():
        extra_links.append((url, {"file": "src/data/sources.ts", "key": f"{abbr} (url, About page)"}))

    # --- unique probes and links
    probes, users_of = {}, defaultdict(list)
    for it in items:
        for p in it["probes"]:
            probes.setdefault(probe_key(p), p)
            users_of[probe_key(p)].append(it)
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
                    continue   # not covered: the dataset is checked through the API below
                reason = r.get("why", "skipped by the registry")
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
            for it, _ in links[url]:
                if it:
                    users_of[probe_key(p)].append(it)
            link_plan[url] = ("skip", f"checked through the Eurostat API (dataset {m.group('dataset')})")

    # --- run everything, one worker per host, requests within a host in sequence
    tasks = defaultdict(list)
    for key, p in probes.items():
        tasks[probe_host(p)].append(("probe", key, p))
    for url, (mode, _) in link_plan.items():
        if mode == "check":
            tasks[urllib.parse.urlsplit(url).hostname or "?"].append(("link", url, None))

    results, link_results = {}, {}

    def work(host_tasks):
        for kind, key, p in host_tasks:
            if kind == "probe":
                try:
                    prev_info = as_dict(prev_probes.get(key)).get("info")
                    results[key] = dict(PROBES[p["kind"]](http, p, today, prev_info), ok=True)
                except FetchError as err:
                    results[key] = {"ok": False, "error": str(err)}
                except Exception as err:  # a broken probe must not stop the others
                    results[key] = {"ok": False, "error": f"unexpected answer ({type(err).__name__}: {err})"}
            else:
                try:
                    link_results[key] = check_link(http, key, rules)
                except Exception as err:
                    link_results[key] = ("error", f"link check failed ({type(err).__name__}: {err})", None)

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        list(pool.map(work, tasks.values()))

    # --- compare with the previous state
    state = {"version": STATE_VERSION, "run": today.isoformat(), "probes": {}, "links": {}, "gaps": {},
             "manual": {}, "registry_errors": {}}
    sources = {}          # probe key -> report entry
    failures = []

    def entry_for(key):
        return sources.setdefault(key, {"probe": probes[key], "result": results[key],
                                        "before": as_dict(as_dict(prev_probes.get(key)).get("info")),
                                        "changed": False, "new_gaps": [], "old_gaps": [],
                                        "users": list({it["id"]: it for it in users_of[key]}.values())})

    for key, p in probes.items():
        r = results[key]
        old = as_dict(prev_probes.get(key))
        if r["ok"]:
            same = old.get("fp") == r["fingerprint"]
            # same edition: keep the stored info as it was, so that the state changes only when
            # an edition changes (not when e.g. Eurostat moves the 'updated' date of a table)
            kept = old["info"] if same and isinstance(old.get("info"), dict) else \
                {k: v for k, v in r["info"].items() if k in STATE_INFO.get(p["kind"], ())}
            if r["fingerprint"] is not None:
                state["probes"][key] = {"fp": r["fingerprint"], "info": kept,
                                        "since": old.get("since") if same else today.isoformat()}
            if old.get("fp") and r["fingerprint"] and not same:
                entry_for(key)["changed"] = True
        else:
            fail = int(old.get("fail", 0) or 0) + 1
            entry = dict(old) if old else {"fp": None, "info": {}, "since": None}
            entry.update(fail=fail, fail_since=old.get("fail_since") or today.isoformat(), error=r["error"])
            escalate = fail >= FAIL_ESCALATE and not old.get("fail_reported")
            entry["fail_reported"] = bool(old.get("fail_reported")) or escalate
            state["probes"][key] = entry
            failures.append({"what": describe_source(p), "error": r["error"], "fail": fail, "since": entry["fail_since"],
                             "new": escalate, "standing": bool(old.get("fail_reported")),
                             "users": [(it, it["used_in"]) for it in users_of[key]]})

    # newer period: what each place on the site shows against what the source offers
    for it in items:
        for p in it["probes"]:
            key = probe_key(p)
            r = results[key]
            if not r.get("ok") or r.get("newest_year") is None or p.get("compare_period") is False:
                continue
            expected = r["newest_year"] + int(p.get("period_offset", 0))
            for n, pl in enumerate(it["_places"]):
                if pl["year"] is None or pl["year"] >= expected or args.fingerprints_only:
                    continue
                gap_key = f"{it['id']}#{n}|{key}"
                state["gaps"][gap_key] = expected
                bucket = "old_gaps" if prev_gaps.get(gap_key) == expected else "new_gaps"
                entry_for(key)[bucket].append((it, pl, expected))
    # a probe that failed today keeps its gaps, so they are not reported again when it recovers
    for gap_key, year in prev_gaps.items():
        if gap_key not in state["gaps"] and not results.get(gap_key.split("|", 1)[-1], {}).get("ok", True):
            state["gaps"][gap_key] = year
    new_sources = {k: e for k, e in sources.items() if e["changed"] or e["new_gaps"]}
    open_sources = {k: e for k, e in sources.items() if not (e["changed"] or e["new_gaps"]) and e["old_gaps"]}

    # links
    link_items, link_open = [], []
    for url, (mode, reason) in link_plan.items():
        if mode != "check":
            continue
        users = links[url]
        verdict, detail, final = link_results[url]
        old = as_dict(prev_links.get(url))
        if verdict == "error":
            fail = int(old.get("fail", 0) or 0) + 1
            entry = dict(old) if old else {"sig": None}
            entry.update(fail=fail, fail_since=old.get("fail_since") or today.isoformat(), error=detail)
            escalate = fail >= FAIL_ESCALATE and not old.get("fail_reported")
            entry["fail_reported"] = bool(old.get("fail_reported")) or escalate
            state["links"][url] = entry
            failures.append({"what": f"link {url}", "error": detail, "fail": fail, "since": entry["fail_since"],
                             "new": escalate, "standing": bool(old.get("fail_reported")), "users": users})
            continue
        if verdict == "ok":
            continue   # a working link needs no state
        sig = f"{verdict}|{norm_url(final or url)}|{detail}"
        state["links"][url] = {"sig": sig}
        li = {"url": url, "verdict": verdict, "detail": detail, "final": final, "users": users}
        (link_open if old.get("sig") == sig else link_items).append(li)

    # manual checks
    manual_list = [(it["id"], it, it["manual"]) for it in items if it.get("manual")]
    for host, m in manual_hosts.items():
        urls = [u for u, (mode, _) in link_plan.items() if mode == "manual" and urllib.parse.urlsplit(u).hostname == host]
        if urls:
            manual_list.append((f"links@{host}", {"label": f"Links to {host}", "publisher": host,
                                                    "used_in": [u for url in urls for _, u in links[url]],
                                                    "_url": urls[0], "urls": urls}, m))
    manual_due, manual_open = [], []
    for mid, it, m in manual_list:
        age = (today - dt.date.fromisoformat(m["last_checked"])).days
        if age > MANUAL_DAYS:
            state["manual"][mid] = m["last_checked"]
            (manual_open if prev_manual.get(mid) == m["last_checked"] else manual_due).append((it, m, age))

    # registry and data-file problems, each reported once
    reg_problems = []
    for it, err in data_errors:
        state["registry_errors"][it["id"]] = err
        reg_problems.append((it["id"], err, prev_reg_errors.get(it["id"]) != err))
    for n in reg_notes:
        if n.startswith("Registry"):
            key = f"registry:{short_hash(n)}"
            state["registry_errors"][key] = n
            reg_problems.append((None, n, prev_reg_errors.get(key) != n))
    new_reg = [r for r in reg_problems if r[2]]

    escalated = [f for f in failures if f["new"]]
    has_items = bool(new_sources or link_items or manual_due or escalated or new_reg)

    # --- report
    runtime = time.monotonic() - t0
    kinds = Counter(p["kind"] for p in probes.values())
    n_ok = sum(1 for r in results.values() if r.get("ok"))
    links_checked = sum(1 for m, _ in link_plan.values() if m == "check")
    links_ok = sum(1 for v in link_results.values() if v[0] == "ok")
    still_open = len(open_sources) + len(link_open) + len(manual_open) + sum(1 for f in failures if f["standing"])
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
        "counts": {"new_edition": len(new_sources), "link": len(link_items), "could_not_check": len(failures),
                   "could_not_check_items": len(escalated), "manual_due": len(manual_due),
                   "registry_problems": len(new_reg), "still_open": still_open},
        "requests": sum(http.counts.values()),
        "requests_per_host": dict(http.counts.most_common()),
        "retries_per_host": dict(http.retries.most_common()),
        "seconds_per_host": {h: round(v, 1) for h, v in http.seconds.most_common()},
        "runtime_seconds": round(runtime, 1),
    }
    report = render_report(today, summary, top_notes, new_sources, open_sources, link_items, link_open,
                           failures, manual_due, manual_open, manual_list, reg_problems, notes, site.errors)
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
# Report (plain words: no ETag, asset or cube)
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


def newest_of(kind, info):
    info = as_dict(info)
    if kind == "fso-dam":
        return period_end_year(info.get("period"))
    if kind == "fso-pxweb":
        return info.get("newest_year") if isinstance(info.get("newest_year"), int) else period_end_year(info.get("last_period"))
    if kind in ("eurostat", "snb-cube"):
        lp = info.get("last_period")
        return period_end_year(lp) if kind == "eurostat" else (int(lp[:4]) if isinstance(lp, str) and lp[:4].isdigit() else None)
    return None


def facts(p, r, before):
    i = as_dict(r.get("info"))
    k = p["kind"]
    lines = []
    if k == "fso-dam":
        prov = ", provisional data" if i.get("provisional") else ""
        lines.append(f"Published on {fmt_date(i.get('published'))} (FSO file number {i.get('asset')}{prov}); period covered: {i.get('period')}")
        if before.get("asset"):
            lines.append(f"Before: file number {before.get('asset')} of {fmt_date(before.get('published'))}, period {before.get('period')}")
    elif k == "fso-pxweb":
        lines.append(f"Updated on {fmt_date(i.get('updated'))}; latest year: {i.get('last_period')}")
        if before.get("updated"):
            lines.append(f"Before: updated on {fmt_date(before.get('updated'))}, latest year {before.get('last_period')}")
    elif k == "eurostat":
        v = f" (value for Switzerland: {i['last_value']})" if "last_value" in i else ""
        lines.append(f"Latest year with a Swiss value: {i.get('last_period')}{v}; table updated on {fmt_date(i.get('updated'))}")
        if before.get("last_period"):
            lines.append(f"Before: latest year {before.get('last_period')}")
    elif k == "snb-cube":
        lines.append(f"Published on {fmt_date(i.get('published'))}; latest period: {i.get('last_period')}")
        if before.get("published"):
            lines.append(f"Before: published on {fmt_date(before.get('published'))}, latest period {before.get('last_period')}")
    elif k == "http-headers":
        when = f", last changed on {fmt_date(i['changed'])}" if i.get("changed") else ""
        lines.append(f"The server reports a new version of the file{when}")
    elif k == "http-hash":
        lines.append(f"The content of the file is different from the last run ({i.get('size')} bytes)")
    elif k == "http-regex":
        new = sorted(set(i.get("matches", [])) - set(before.get("matches", [])))
        gone = sorted(set(before.get("matches", [])) - set(i.get("matches", [])))
        if new:
            lines.append("New on the page: " + ", ".join(f"`{m}`" for m in new))
        if gone:
            lines.append("No longer on the page: " + ", ".join(f"`{m}`" for m in gone))
        if not new and not gone:
            lines.append("On the page: " + ", ".join(f"`{m}`" for m in i.get("matches", [])[:8]))
    return lines


def advice(e):
    """-> (what to do, draft change-log sentence or None). 'New edition' only when the period changed."""
    p, r, before = e["probe"], e["result"], e["before"]
    i, k = as_dict(r.get("info")), p["kind"]
    gaps = e["new_gaps"] + e["old_gaps"]
    publisher = (gaps[0][0] if gaps else {}).get("publisher", "office")
    new_y, old_y = r.get("newest_year"), newest_of(k, before)
    if k == "calendar-year":
        return (f"A new year ({today_year(r)}) has started: check whether the figure for {today_year(r)} is published and update.", None)
    if gaps:
        shown = min(pl["year"] for _, pl, _ in gaps)
        todo = f"Update: the source has figures for {new_y}, the site shows {shown}."
        if k == "fso-dam":
            draft = f"The FSO published “{i.get('title')}” with figures up to {new_y} on {fmt_date(i.get('published'))}."
        elif k == "fso-pxweb":
            draft = f"The FSO updated the STAT-TAB table “{i.get('title')}” on {fmt_date(i.get('updated'))}; it now runs to {i.get('last_period')}."
        elif k == "eurostat":
            v = f" (Switzerland: {i['last_value']})" if "last_value" in i else ""
            draft = f"Eurostat table {i.get('dataset')} (“{i.get('title')}”) now has figures for Switzerland for {i.get('last_period')}{v}."
        elif k == "snb-cube":
            draft = f"The SNB published figures for {i.get('last_period')} in its data portal (table {i.get('cube')}) on {fmt_date(i.get('published'))}."
        elif k == "http-regex":
            draft = f"The {publisher} published a new edition ({', '.join(i.get('matches', [])[-1:])})."
        else:
            draft = None
        return todo, draft
    if k in ("fso-dam", "fso-pxweb", "eurostat", "snb-cube"):
        if old_y is not None and new_y is not None and new_y != old_y:
            return (f"New edition with figures up to {new_y}; the site already shows {new_y}: check whether figures were revised.", None)
        return ("Same period, new publication: check whether figures were revised; otherwise nothing to update.", None)
    return ("The file changed: open it and check whether the figures the site uses were revised; otherwise nothing to update.", None)


def today_year(r):
    return r.get("newest_year")


def render_source(L, e, open_only=False):
    p, r = e["probe"], e["result"]
    L.append(f"### {describe_source(p, r)}")
    L.append("")
    why = []
    if e["changed"]:
        why.append("new publication since the last run")
    if e["new_gaps"]:
        why.append("the site shows an older period than the source offers")
    if open_only:
        why.append("still open: reported before")
    L.append(f"- Why listed: {'; '.join(why)}")
    for line in facts(p, r, e["before"] if e["changed"] else {}):
        L.append(f"- {line}")
    page = as_dict(r.get("info")).get("page")
    if page:
        L.append(f"- Official page: {page}")
    if as_dict(r.get("info")).get("file") and r["info"]["file"] != page:
        L.append(f"- File: {r['info']['file']}")
    gaps = e["new_gaps"] + e["old_gaps"]
    if gaps:
        L.append("- Behind the source:")
        for it, pl, expected in gaps:
            L.append(f"  - {it['label']}: {pl['where']} shows {pl['year']}, the source has {expected}. "
                     f"Edit {pl['edit'] if pl['spec'].get('from') == 'context' else where(it['used_in'])}; "
                     f"link on the site: {it['_url']}")
    others = [it for it in e.get("users", []) if it["id"] not in {g[0]["id"] for g in gaps}]
    if others:
        L.append("- Also uses this source (site not behind):")
        for it in others:
            L.append(f"  - {it['label']} (site shows {it['_year']}): {where(it['used_in'])}")
    todo, draft = advice(e)
    L.append(f"- What to do: {todo}")
    L.append(f"- Draft change-log entry: “{draft}”" if draft else "- Draft change-log entry: none")
    L.append("")


def render_report(today, s, top_notes, new_sources, open_sources, link_items, link_open, failures,
                  manual_due, manual_open, manual_list, reg_problems, notes, data_errors):
    L = [f"# Source watcher, {today.isoformat()}", ""]
    for n in top_notes:
        L.append(f"**Note:** {n}")
        L.append("")
    c = s["counts"]
    L.append(f"New: {c['new_edition']} source(s) with a new publication or a newer period, {c['link']} link problem(s), "
             f"{c['manual_due']} manual check(s) due, {c['could_not_check_items']} source(s) unreachable for {FAIL_ESCALATE} runs, "
             f"{c['registry_problems']} registry problem(s). Still open from earlier runs: {c['still_open']}. "
             f"Checked {s['probes']} sources and {s['links_checked']} links with {s['requests']} requests in {s['runtime_seconds']} s.")
    L.append("")
    L.append("Nothing on the site was changed. Each item names the file and key to edit by hand and the official page to open.")
    L.append("")

    L.append("## New edition or newer period")
    L.append("")
    if not new_sources:
        L.append("None.")
        L.append("")
    for key in sorted(new_sources):
        render_source(L, new_sources[key])

    L.append("## Link moved or broken")
    L.append("")
    if not link_items:
        L.append("None.")
    for li in link_items:
        render_link(L, li)
    L.append("")

    L.append("## Manual checks due")
    L.append("")
    if not manual_due:
        due_later = sorted(dt.date.fromisoformat(m["last_checked"]) + dt.timedelta(days=MANUAL_DAYS) for _, _, m in manual_list)
        nxt = f" The next one is due on {due_later[0].isoformat()}." if due_later and due_later[0] > today else ""
        L.append(f"None new. {len(manual_list)} manual checks are registered.{nxt}")
    for it, m, age in manual_due:
        render_manual(L, it, m, age)
    L.append("")

    L.append("## Still open (reported before, not resolved)")
    L.append("")
    if not (open_sources or link_open or manual_open or any(f["standing"] for f in failures)):
        L.append("None.")
        L.append("")
    for key in sorted(open_sources):
        render_source(L, open_sources[key], open_only=True)
    for li in link_open:
        render_link(L, li)
    for it, m, age in manual_open:
        render_manual(L, it, m, age)
    for f in failures:
        if f["standing"]:
            L.append(f"- Still unreachable since {f['since']}: {f['what']} ({f['error']}).")
    L.append("")

    L.append("## Could not check")
    L.append("")
    L.append(f"A network error or a refusal is not a finding. It is listed here every day; it counts as an item "
             f"(and opens or updates the issue) only after {FAIL_ESCALATE} runs in a row.")
    L.append("")
    if not failures:
        L.append("None.")
    for f in sorted(failures, key=lambda x: x["what"]):
        streak = f"failing since {f['since']} ({f['fail']} runs)" if f["fail"] > 1 else "first failure"
        mark = " **(now reported: failing for several runs)**" if f["new"] else ""
        L.append(f"- {f['what']}: {f['error']}; {streak}{mark}")
        for it, used in f["users"]:
            label = it["label"] if it else "link"
            L.append(f"  - figure affected: {label}, {where(used)}")
    L.append("")

    if reg_problems or notes or data_errors:
        L.append("## Registry notes")
        L.append("")
        for iid, err, new in reg_problems:
            mark = " **(new)**" if new else ""
            text = err if iid is None else f"Registry item `{iid}`: {err}. Fix `scripts/watch/sources.json` or the data file."
            L.append(f"- {text}{mark}")
        for n in notes:
            if not n.startswith("Registry"):
                L.append(f"- {n}")
        for e in data_errors:
            L.append(f"- Data file {e}.")
        L.append("")

    L.append("---")
    L.append("Requests per host: " + ", ".join(f"{h} {n}" for h, n in s["requests_per_host"].items()) + ".")
    if s.get("retries_per_host"):
        L.append("Retries (included above): " + ", ".join(f"{h} {n}" for h, n in s["retries_per_host"].items()) + ".")
    L.append("")
    return "\n".join(L)


def render_link(L, li):
    final = f" → {li['final']}" if li["final"] and norm_url(li["final"]) != norm_url(li["url"]) else ""
    L.append(f"- {li['url']}{final}: {li['verdict']}, {li['detail']}.")
    for it, used in li["users"]:
        label = f"{it['label']}: " if it else ""
        L.append(f"  - {label}edit {where(used)}")


def render_manual(L, it, m, age):
    L.append(f"- {it['label']} ({it['publisher']}): last checked by a person on {m['last_checked']} ({age} days ago). "
             f"Why by hand: {m['why']}.")
    if m.get("how"):
        L.append(f"  - How: {m['how']}")
    for u in it.get("urls", [it.get("_url")]):
        if u:
            L.append(f"  - Open: {u}")
    L.append(f"  - Edit if needed: {where(it['used_in'])}")
    L.append("  - When done: set `last_checked` to that day's date in `scripts/watch/sources.json`.")


def main(argv=None):
    ap = argparse.ArgumentParser(description="Check the official sources used by the site for newer editions and moved links.")
    ap.add_argument("--registry", default=str(HERE / "sources.json"))
    ap.add_argument("--state", default=str(HERE / "state.json"), help="state of the previous run (missing or empty file = first run)")
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
