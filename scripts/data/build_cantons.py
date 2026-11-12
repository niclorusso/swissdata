#!/usr/bin/env python3
"""
Build src/data/cantons.ts from official tables.

Usage:
  python3 scripts/data/build_cantons.py [--cache DIR] [--refresh]

Every value is read from a downloaded official table; nothing is typed by hand
except canton names and capitals. Each indicator uses one reference year for
all 26 cantons. To update: change the year constants / asset URLs below and
re-run. The script stops if a table does not yield exactly 26 cantons.

Needs Python 3.9+ (standard library only) and `pdftotext` (poppler) for the
two sources that exist only as PDF (SECO annual averages, BAG premiums).

Sources
  population, foreign share   BFS STATPOP, demographic balance, px-x-0102020000_201
  area                        swisstopo swissBOUNDARIES3D, canton areas
  unemployment rate           SECO, "Arbeitslosigkeit in der Schweiz", table TA2d
  health premium              BAG, cantonal mean monthly premiums over all ages
  GDP per capita              BFS, cantonal GDP per capita (je-e-04.02.06.03)
  average rent                BFS, T 09.03.03.01 (structural survey)
  crime rate                  BFS police crime statistics, px-x-1903020100_101,
                              divided by the STATPOP population at the end of
                              the previous year (BFS "Häufigkeitszahl" method)
"""

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
import zipfile
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_PATH = PROJECT_ROOT / "src/data/cantons.ts"

# ---------------------------------------------------------------------------
# Reference years and source URLs (edit here to update)
# ---------------------------------------------------------------------------

# Population: permanent resident population on 31 December (definitive figures).
POP_YEAR = 2025
STATPOP_API = "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102020000_201/px-x-0102020000_201.px"
STATPOP_PAGE = "https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-0102020000_201/"
# The STATPOP table still uses the commune status of 6.4.2025 (Moutier in BE).
# Moutier moved to the canton of Jura on 1.1.2026 and the swisstopo areas already
# reflect it. With True, the commune of Moutier (same table, same date) is
# subtracted from BE and added to JU so that population, foreign share and area
# describe the same territory. No estimate is involved.
MOUTIER_TO_JURA = True

# Area: swisstopo official canton areas (hectares), data status 1.1.2026.
AREA_DATE = "2026-01-01"
SWISSTOPO_API = (
    "https://api3.geo.admin.ch/rest/services/api/MapServer/"
    "ch.swisstopo.swissboundaries3d-kanton-flaeche.fill/{n}?returnGeometry=false"
)
SWISSTOPO_PAGE = "https://www.swisstopo.admin.ch/de/landschaftsmodell-swissboundaries3d"

# Unemployment: SECO registered unemployment, annual average, table TA2d of the
# yearly publication. 2024 is the latest edition with annual averages by canton.
UNEMP_YEAR = 2024
UNEMP_PDF = "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36301409/master"
UNEMP_PAGE = "https://www.bfs.admin.ch/asset/de/36301409"

# Health premium: BAG mean monthly premium over all ages (incl. optional
# deductibles and models). Column 2026 of the table published in September 2026.
PREMIUM_YEAR = 2026
PREMIUM_PDF = (
    "https://cms.news.admin.ch/fileservice/sdweb-docs-prod-nsbcch-files/files/"
    "2026/09/29/b8752eb8-9587-4fc9-b347-8b705f3ecc73.pdf"
)
PREMIUM_PAGE = "https://www.bag.admin.ch/de/newnsb/BfuGvedj0OOX"

# GDP per capita: BFS, at current prices (2024 is provisional, revised series
# published 26.10.2026).
GDP_YEAR = 2024
GDP_XLSX = "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36251941/master"
GDP_PAGE = "https://www.bfs.admin.ch/asset/en/je-e-04.02.06.03"

# Average rent: BFS, monthly net rent of occupied rented dwellings, all sizes.
RENT_YEAR = 2024
RENT_XLSX = "https://dam-api.bfs.admin.ch/hub/api/dam/assets/36398431/master"
RENT_PAGE = "https://www.bfs.admin.ch/asset/de/je-d-09.03.03.01"

# Crime: offences against the Criminal Code (StGB) recorded by the police.
CRIME_YEAR = 2025
PKS_API = "https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-1903020100_101/px-x-1903020100_101.px"
PKS_PAGE = "https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-1903020100_101/"

# ---------------------------------------------------------------------------
# Cantons (BFS order). name and capital use the English form;
# nameDE / nameFR / nameIT carry the three official-language forms.
# ---------------------------------------------------------------------------

CANTONS = [
    # abbr, name (EN), DE, FR, IT, capital (EN)
    ("ZH", "Zurich", "Zürich", "Zurich", "Zurigo", "Zurich"),
    ("BE", "Bern", "Bern", "Berne", "Berna", "Bern"),
    ("LU", "Lucerne", "Luzern", "Lucerne", "Lucerna", "Lucerne"),
    ("UR", "Uri", "Uri", "Uri", "Uri", "Altdorf"),
    ("SZ", "Schwyz", "Schwyz", "Schwytz", "Svitto", "Schwyz"),
    ("OW", "Obwalden", "Obwalden", "Obwald", "Obvaldo", "Sarnen"),
    ("NW", "Nidwalden", "Nidwalden", "Nidwald", "Nidvaldo", "Stans"),
    ("GL", "Glarus", "Glarus", "Glaris", "Glarona", "Glarus"),
    ("ZG", "Zug", "Zug", "Zoug", "Zugo", "Zug"),
    ("FR", "Fribourg", "Freiburg", "Fribourg", "Friburgo", "Fribourg"),
    ("SO", "Solothurn", "Solothurn", "Soleure", "Soletta", "Solothurn"),
    ("BS", "Basel-Stadt", "Basel-Stadt", "Bâle-Ville", "Basilea Città", "Basel"),
    ("BL", "Basel-Landschaft", "Basel-Landschaft", "Bâle-Campagne", "Basilea Campagna", "Liestal"),
    ("SH", "Schaffhausen", "Schaffhausen", "Schaffhouse", "Sciaffusa", "Schaffhausen"),
    ("AR", "Appenzell Ausserrhoden", "Appenzell Ausserrhoden", "Appenzell Rhodes-Extérieures", "Appenzello Esterno", "Herisau"),
    ("AI", "Appenzell Innerrhoden", "Appenzell Innerrhoden", "Appenzell Rhodes-Intérieures", "Appenzello Interno", "Appenzell"),
    ("SG", "St. Gallen", "St. Gallen", "Saint-Gall", "San Gallo", "St. Gallen"),
    ("GR", "Graubünden", "Graubünden", "Grisons", "Grigioni", "Chur"),
    ("AG", "Aargau", "Aargau", "Argovie", "Argovia", "Aarau"),
    ("TG", "Thurgau", "Thurgau", "Thurgovie", "Turgovia", "Frauenfeld"),
    ("TI", "Ticino", "Tessin", "Tessin", "Ticino", "Bellinzona"),
    ("VD", "Vaud", "Waadt", "Vaud", "Vaud", "Lausanne"),
    ("VS", "Valais", "Wallis", "Valais", "Vallese", "Sion"),
    ("NE", "Neuchâtel", "Neuenburg", "Neuchâtel", "Neuchâtel", "Neuchâtel"),
    ("GE", "Geneva", "Genf", "Genève", "Ginevra", "Geneva"),
    ("JU", "Jura", "Jura", "Jura", "Giura", "Delémont"),
]
ABBR = [c[0] for c in CANTONS]

# Canton labels as they appear in the individual tables -> abbreviation.
STATPOP_NAMES = {
    "- Zürich": "ZH", "- Bern / Berne": "BE", "- Luzern": "LU", "- Uri": "UR", "- Schwyz": "SZ",
    "- Obwalden": "OW", "- Nidwalden": "NW", "- Glarus": "GL", "- Zug": "ZG",
    "- Fribourg / Freiburg": "FR", "- Solothurn": "SO", "- Basel-Stadt": "BS",
    "- Basel-Landschaft": "BL", "- Schaffhausen": "SH", "- Appenzell Ausserrhoden": "AR",
    "- Appenzell Innerrhoden": "AI", "- St. Gallen": "SG", "- Graubünden / Grigioni / Grischun": "GR",
    "- Aargau": "AG", "- Thurgau": "TG", "- Ticino": "TI", "- Vaud": "VD", "- Valais / Wallis": "VS",
    "- Neuchâtel": "NE", "- Genève": "GE", "- Jura": "JU", "Schweiz": "CH",
}
PKS_NAMES = {k.lstrip("- "): v for k, v in STATPOP_NAMES.items()}
GDP_NAMES = {
    "Zurich": "ZH", "Berne": "BE", "Lucerne": "LU", "Uri": "UR", "Schwyz": "SZ", "Obwalden": "OW",
    "Nidwalden": "NW", "Glarus": "GL", "Zug": "ZG", "Fribourg": "FR", "Solothurn": "SO",
    "Basel-Stadt": "BS", "Basel-Landschaft": "BL", "Schaffhausen": "SH", "Appenzell A. Rh.": "AR",
    "Appenzell I. Rh.": "AI", "St. Gallen": "SG", "Graubünden": "GR", "Aargau": "AG",
    "Thurgau": "TG", "Ticino": "TI", "Vaud": "VD", "Valais": "VS", "Neuchâtel": "NE",
    "Geneva": "GE", "Jura": "JU", "Switzerland": "CH",
}
RENT_NAMES = {
    "Zürich": "ZH", "Bern": "BE", "Luzern": "LU", "Uri": "UR", "Schwyz": "SZ", "Obwalden": "OW",
    "Nidwalden": "NW", "Glarus": "GL", "Zug": "ZG", "Freiburg": "FR", "Solothurn": "SO",
    "Basel-Stadt": "BS", "Basel-Landschaft": "BL", "Schaffhausen": "SH", "Appenzell A.Rh.": "AR",
    "Appenzell I.Rh.": "AI", "St.Gallen": "SG", "St. Gallen": "SG", "Graubünden": "GR",
    "Aargau": "AG", "Thurgau": "TG", "Tessin": "TI", "Waadt": "VD", "Wallis": "VS",
    "Neuenburg": "NE", "Genf": "GE", "Jura": "JU", "Schweiz": "CH",
}
# French labels of SECO table TA2d, normalised (lower case, letters only).
UNEMP_NAMES = {
    "zurich": "ZH", "berne": "BE", "lucerne": "LU", "uri": "UR", "schwytz": "SZ", "obwald": "OW",
    "nidwald": "NW", "glaris": "GL", "zoug": "ZG", "fribourg": "FR", "soleure": "SO",
    "bâleville": "BS", "bâlecampagne": "BL", "schaffhouse": "SH", "appenzellrhext": "AR",
    "appenzellrhint": "AI", "saintgall": "SG", "grisons": "GR", "argovie": "AG",
    "thurgovie": "TG", "tessin": "TI", "vaud": "VD", "valais": "VS", "neuchâtel": "NE",
    "genève": "GE", "jura": "JU", "total": "CH",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def fetch(url: str, dest: Path, refresh: bool, data: bytes | None = None) -> Path:
    if dest.exists() and dest.stat().st_size > 0 and not refresh:
        return dest
    headers = {"User-Agent": "Mozilla/5.0 (build_cantons.py)"}
    if data is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers)
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                dest.write_bytes(resp.read())
            return dest
        except urllib.error.HTTPError as err:
            if err.code != 429 or attempt == 4:  # PXWeb limits requests per time window
                raise
            time.sleep(15 * (attempt + 1))
    return dest


def px_query(api: str, cache: Path, name: str, refresh: bool, selection) -> list[dict]:
    """selection(meta_variables) -> list of (code, [values]) for the PXWeb query."""
    meta = json.loads(fetch(api, cache / f"{name}.meta.json", refresh).read_text("utf-8"))
    query = {
        "query": [
            {"code": code, "selection": {"filter": "item", "values": values}}
            for code, values in selection({v["code"]: v for v in meta["variables"]})
        ],
        "response": {"format": "json"},
    }
    body = json.dumps(query).encode("utf-8")
    return json.loads(fetch(api, cache / f"{name}.data.json", refresh, body).read_text("utf-8"))["data"]


def codes_by_text(variable: dict, wanted) -> dict[str, str]:
    """Map value code -> matched label for the labels accepted by `wanted`."""
    out = {}
    for code, text in zip(variable["values"], variable["valueTexts"]):
        key = wanted(text)
        if key:
            out[code] = key
    return out


def xlsx_sheets(path: Path) -> dict[str, list[list[str]]]:
    """Minimal .xlsx reader: sheet name -> rows of non-empty cell values (as text)."""
    z = zipfile.ZipFile(path)
    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in re.findall(r"<si>(.*?)</si>", z.read("xl/sharedStrings.xml").decode("utf-8"), flags=re.S):
            shared.append(html.unescape("".join(re.findall(r"<t[^>]*>([^<]*)</t>", si))))
    rels = dict(
        (rid, target)
        for target, rid in re.findall(
            r'<Relationship [^>]*?Target="([^"]+)"[^>]*?Id="([^"]+)"',
            z.read("xl/_rels/workbook.xml.rels").decode("utf-8"),
        )
    )
    rels.update(
        (rid, target)
        for rid, target in re.findall(
            r'<Relationship [^>]*?Id="([^"]+)"[^>]*?Target="([^"]+)"',
            z.read("xl/_rels/workbook.xml.rels").decode("utf-8"),
        )
    )
    sheets = {}
    for tag in re.findall(r"<sheet [^>]*>", z.read("xl/workbook.xml").decode("utf-8")):
        name = html.unescape(re.search(r'name="([^"]+)"', tag).group(1))
        rid = re.search(r'r:id="([^"]+)"', tag).group(1)
        target = rels[rid].lstrip("/")
        if not target.startswith("xl/"):
            target = "xl/" + target
        xml = z.read(target).decode("utf-8")
        rows = []
        for row in re.findall(r"<row[^>]*>(.*?)</row>", xml, flags=re.S):
            cells = []
            for attrs, inner in re.findall(r"<c ([^>]*?)(?:/>|>(.*?)</c>)", row, flags=re.S):
                m = re.search(r"<v>([^<]*)</v>", inner or "")
                if m:
                    cells.append(shared[int(m.group(1))] if 't="s"' in attrs else m.group(1))
            if cells:
                rows.append(cells)
        sheets[name] = rows
    return sheets


def pdf_text(path: Path) -> str:
    try:
        return subprocess.run(
            ["pdftotext", "-layout", str(path), "-"], check=True, capture_output=True
        ).stdout.decode("utf-8", "replace")
    except FileNotFoundError:
        sys.exit("pdftotext not found: install poppler (brew install poppler)")


def require_all(label: str, values: dict[str, float]) -> None:
    missing = [a for a in ABBR if a not in values]
    if missing or "CH" not in values:
        sys.exit(f"{label}: missing {missing or ['CH']} - table layout changed? Nothing written.")


# ---------------------------------------------------------------------------
# Readers (each returns {abbr: value, ..., "CH": national value})
# ---------------------------------------------------------------------------

def read_statpop(cache: Path, refresh: bool):
    geo_code = "Kanton (-) / Bezirk (>>) / Gemeinde (......)"

    def selection(v):
        geo = codes_by_text(v[geo_code], lambda t: STATPOP_NAMES.get(t) or ("MOUTIER" if t.endswith("0700 Moutier") else None))
        comp = codes_by_text(v["Demografische Komponente"], lambda t: t if t == "Bestand am 31. Dezember" else None)
        selection.geo = geo
        return [
            ("Jahr", [str(CRIME_YEAR - 1), str(POP_YEAR)]),
            (geo_code, list(geo)),
            ("Staatsangehörigkeit (Kategorie)", ["0", "2"]),  # total, foreign
            ("Geschlecht", ["0"]),
            ("Demografische Komponente", list(comp)),
        ]

    rows = px_query(STATPOP_API, cache, "statpop", refresh, selection)
    table: dict[tuple[int, str, str], int] = {}
    for r in rows:
        year, geo, nat = r["key"][0], r["key"][1], r["key"][2]
        table[(int(year), selection.geo[geo], "total" if nat == "0" else "foreign")] = int(r["values"][0])
    return table


def read_areas(cache: Path, refresh: bool) -> dict[str, float]:
    out = {}
    for n in range(1, 27):
        f = fetch(SWISSTOPO_API.format(n=n), cache / f"swisstopo_{n}.json", refresh)
        attrs = json.loads(f.read_text("utf-8"))["feature"]["attributes"]
        out[attrs["ak"]] = attrs["flaeche"] / 100.0  # hectares -> km2
    out["CH"] = sum(out.values())
    return out


def read_unemployment(cache: Path, refresh: bool) -> dict[str, float]:
    text = pdf_text(fetch(UNEMP_PDF, cache / "seco_unemployment.pdf", refresh))
    pages = [p for p in text.split("\f") if f"Durchschnitt {UNEMP_YEAR}" in p and "TA 2d" in p]
    if len(pages) != 1:
        sys.exit(f"unemployment: table TA2d with 'Durchschnitt {UNEMP_YEAR}' not found")
    page = pages[0]
    header = next(line for line in page.splitlines() if "Durchschnitt" in line)
    if not re.search(rf"Durchschnitt {UNEMP_YEAR}\s+Erwerbspersonen", header):
        sys.exit("unemployment: the requested year is not the last rate column of TA2d")
    out = {}
    # "... 0,4   2,1   892 401   A   Zurich": last rate, labour force, CV class, name
    for line in page.splitlines():
        m = re.search(r"(\d+,\d)\s+(\d[\d ]*\d)\s+[A-G]\s+(\S.*?)\s*$", line)
        if not m:
            continue
        key = re.sub(r"[^a-zà-ÿ]", "", m.group(3).lower())
        if key in UNEMP_NAMES:
            out[UNEMP_NAMES[key]] = float(m.group(1).replace(",", "."))
    return out


def read_premiums(cache: Path, refresh: bool) -> dict[str, float]:
    text = pdf_text(fetch(PREMIUM_PDF, cache / "bag_premiums.pdf", refresh))
    first_table = text.split("Alle Zahlen sind gerundet")[0]
    years = None
    out = {}
    for line in first_table.splitlines():
        tokens = line.split()
        if years is None and len(tokens) >= 2 and all(re.fullmatch(r"20\d\d", t) for t in tokens[:2]):
            years = [int(tokens[0]), int(tokens[1])]
        m = re.fullmatch(r"\s*([A-Z]{2})\s+(\d+\.\d)\s+(\d+\.\d)\s+-?\d+\.\d\s+-?\d+\.\d\s*", line)
        if m and years:
            out[m.group(1)] = float(m.group(2 + years.index(PREMIUM_YEAR)))
    if years is None or PREMIUM_YEAR not in years:
        sys.exit(f"premiums: column {PREMIUM_YEAR} not found (table has {years})")
    return out


def read_gdp(cache: Path, refresh: bool) -> tuple[dict[str, float], bool]:
    rows = next(iter(xlsx_sheets(fetch(GDP_XLSX, cache / "bfs_gdp_per_capita.xlsx", refresh)).values()))
    out, col, provisional = {}, None, False
    for cells in rows:
        if cells[0] == "Canton":
            labels = cells[1:]
            match = [i for i, lab in enumerate(labels) if lab.startswith(str(GDP_YEAR))]
            if not match:
                sys.exit(f"gdp: year {GDP_YEAR} not in table")
            col = match[0] + 1
            provisional = labels[match[0]].endswith("p")
        elif cells[0].startswith("Change"):
            break  # the level block ("In CHF, at current prices") comes first
        elif col and cells[0] in GDP_NAMES:
            out[GDP_NAMES[cells[0]]] = float(cells[col])
    return out, provisional


def read_rent(cache: Path, refresh: bool) -> dict[str, float]:
    sheets = xlsx_sheets(fetch(RENT_XLSX, cache / "bfs_rent.xlsx", refresh))
    if str(RENT_YEAR) not in sheets:
        sys.exit(f"rent: sheet {RENT_YEAR} not found")
    out = {}
    for cells in sheets[str(RENT_YEAR)]:
        name = cells[0].strip()
        # column "Total"; values in brackets (< 50 observations) are skipped
        if name in RENT_NAMES and len(cells) > 1 and re.fullmatch(r"\d+(\.\d+)?", cells[1].strip()):
            out[RENT_NAMES[name]] = float(cells[1])
    return out


def read_crime(cache: Path, refresh: bool, statpop) -> dict[str, float]:
    def selection(v):
        selection.geo = codes_by_text(v["Kanton"], lambda t: PKS_NAMES.get(t))
        total = codes_by_text(v["Straftat"], lambda t: t if t == "Straftat - Total" else None)
        return [
            ("Straftat", list(total)),
            ("Kanton", list(selection.geo)),
            ("Ausführungsgrad", [v["Ausführungsgrad"]["values"][0]]),
            ("Aufklärungsgrad", [v["Aufklärungsgrad"]["values"][0]]),
            ("Jahr", [str(CRIME_YEAR)]),
        ]

    rows = px_query(PKS_API, cache, "pks", refresh, selection)
    out = {}
    for r in rows:
        abbr = selection.geo[r["key"][1]]
        # offences of the year per 1,000 permanent residents at the end of the previous year
        out[abbr] = 1000.0 * int(r["values"][0]) / statpop[(CRIME_YEAR - 1, abbr, "total")]
    return out


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def ts_localized(en: str, de: str, fr: str, it: str) -> str:
    return f"{{ en: {ts_str(en)}, de: {ts_str(de)}, fr: {ts_str(fr)}, it: {ts_str(it)} }}"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--cache", type=Path, default=Path(tempfile.gettempdir()) / "swissdata-cantons-cache")
    ap.add_argument("--refresh", action="store_true", help="download again even if cached")
    args = ap.parse_args()
    args.cache.mkdir(parents=True, exist_ok=True)

    statpop = read_statpop(args.cache, args.refresh)
    pop = {a: statpop[(POP_YEAR, a, "total")] for a in ABBR + ["CH"]}
    foreign = {a: statpop[(POP_YEAR, a, "foreign")] for a in ABBR + ["CH"]}
    if MOUTIER_TO_JURA:
        m_total = statpop[(POP_YEAR, "MOUTIER", "total")]
        m_foreign = statpop[(POP_YEAR, "MOUTIER", "foreign")]
        pop["BE"] -= m_total
        pop["JU"] += m_total
        foreign["BE"] -= m_foreign
        foreign["JU"] += m_foreign
    foreign_share = {a: 100.0 * foreign[a] / pop[a] for a in pop}

    area = read_areas(args.cache, args.refresh)
    unemployment = read_unemployment(args.cache, args.refresh)
    premium = read_premiums(args.cache, args.refresh)
    gdp, gdp_provisional = read_gdp(args.cache, args.refresh)
    rent = read_rent(args.cache, args.refresh)
    crime = read_crime(args.cache, args.refresh, statpop)

    for label, values in [
        ("population", pop), ("area", area), ("unemployment", unemployment), ("premium", premium),
        ("gdp", gdp), ("rent", rent), ("crime", crime),
    ]:
        require_all(label, values)

    bfs = lambda suffix: ts_localized(f"FSO, {suffix}", f"BFS, {suffix}", f"OFS, {suffix}", f"UST, {suffix}")
    indicators = [
        # id, unit, year, provisional, source, url, values, decimals
        ("unemployment-rate", "%", UNEMP_YEAR, False,
         ts_localized("SECO, registered unemployment, annual average",
                      "SECO, registrierte Arbeitslose, Jahresdurchschnitt",
                      "SECO, chômeurs inscrits, moyenne annuelle",
                      "SECO, disoccupati registrati, media annua"),
         UNEMP_PAGE, unemployment, 1),
        ("foreign-population", "%", POP_YEAR, False,
         ts_localized("FSO, STATPOP, permanent resident population on 31 December",
                      "BFS, STATPOP, ständige Wohnbevölkerung am 31. Dezember",
                      "OFS, STATPOP, population résidante permanente au 31 décembre",
                      "UST, STATPOP, popolazione residente permanente al 31 dicembre"),
         STATPOP_PAGE, foreign_share, 1),
        ("health-premium", "CHF/month", PREMIUM_YEAR, False,
         ts_localized("FOPH, mean monthly premium of compulsory health insurance, all ages",
                      "BAG, mittlere Monatsprämie der obligatorischen Krankenpflegeversicherung, alle Altersklassen",
                      "OFSP, prime mensuelle moyenne de l'assurance obligatoire des soins, toutes classes d'âge",
                      "UFSP, premio medio mensile dell'assicurazione obbligatoria delle cure, tutte le classi di età"),
         PREMIUM_PAGE, premium, 1),
        ("gdp-per-capita", "CHF", GDP_YEAR, gdp_provisional,
         ts_localized("FSO, cantonal GDP per capita at current prices",
                      "BFS, kantonales BIP pro Einwohner zu laufenden Preisen",
                      "OFS, PIB cantonal par habitant à prix courants",
                      "UST, PIL cantonale per abitante a prezzi correnti"),
         GDP_PAGE, gdp, 0),
        ("average-rent", "CHF/month", RENT_YEAR, False,
         ts_localized("FSO, structural survey, average monthly net rent, all dwelling sizes",
                      "BFS, Strukturerhebung, durchschnittlicher Netto-Mietzins pro Monat, alle Wohnungsgrössen",
                      "OFS, relevé structurel, loyer mensuel net moyen, toutes tailles de logement",
                      "UST, rilevazione strutturale, affitto mensile netto medio, tutte le dimensioni"),
         RENT_PAGE, rent, 0),
        ("crime-rate-per-1000", "per 1,000 inhabitants", CRIME_YEAR, False,
         ts_localized("FSO, police crime statistics, Criminal Code offences per 1,000 inhabitants",
                      "BFS, polizeiliche Kriminalstatistik, Straftaten gemäss Strafgesetzbuch pro 1000 Einwohner",
                      "OFS, statistique policière de la criminalité, infractions au code pénal pour 1000 habitants",
                      "UST, statistica criminale di polizia, reati secondo il Codice penale per 1000 abitanti"),
         PKS_PAGE, crime, 1),
    ]

    def num(value: float, decimals: int) -> str:
        return str(int(round(value))) if decimals == 0 else f"{value:.{decimals}f}"

    moutier_en = " Moutier (BE until 31.12.2025) is counted in JU, as in the area figures." if MOUTIER_TO_JURA else ""
    L: list[str] = []
    L.append("// GENERATED FILE - do not edit by hand.")
    L.append("// Built by scripts/data/build_cantons.py from official tables (URLs in the script).")
    L.append("// To update a value, change the reference year or source in the script and re-run it.")
    L.append("//")
    L.append(f"// population          {POP_YEAR}  BFS STATPOP, permanent resident population on 31.12.{POP_YEAR}.{moutier_en}")
    L.append(f"// area                {AREA_DATE[:4]}  swisstopo swissBOUNDARIES3D, canton areas as of 1.1.{AREA_DATE[:4]} (km², rounded)")
    L.append(f"// unemployment-rate   {UNEMP_YEAR}  SECO registered unemployment rate, annual average (%)")
    L.append(f"// foreign-population  {POP_YEAR}  BFS STATPOP, foreign share of the permanent resident population on 31.12.{POP_YEAR} (%)")
    L.append(f"// health-premium      {PREMIUM_YEAR}  BAG mean monthly premium, compulsory health insurance, all ages (CHF/month)")
    L.append(f"// gdp-per-capita      {GDP_YEAR}  BFS cantonal GDP per capita, current prices (CHF){', provisional' if gdp_provisional else ''}")
    L.append(f"// average-rent        {RENT_YEAR}  BFS structural survey, average monthly net rent, all sizes (CHF/month)")
    L.append(f"// crime-rate-per-1000 {CRIME_YEAR}  BFS police crime statistics: Criminal Code offences {CRIME_YEAR} per 1,000")
    L.append(f"//                           permanent residents on 31.12.{CRIME_YEAR - 1} (BFS method)")
    L.append("//")
    L.append("// name and capital use the English form; nameDE / nameFR / nameIT the official-language forms.")
    L.append("")
    L.append('import { Canton, CantonBaseMeta, CantonIndicatorMeta } from "@/types";')
    L.append("")
    L.append("export const cantonPopulationMeta: CantonBaseMeta = {")
    L.append(f'  referenceDate: "{POP_YEAR}-12-31",')
    L.append(f"  national: {pop['CH']},")
    L.append("  source: " + ts_localized(
        "FSO, STATPOP, permanent resident population", "BFS, STATPOP, ständige Wohnbevölkerung",
        "OFS, STATPOP, population résidante permanente", "UST, STATPOP, popolazione residente permanente") + ",")
    L.append(f"  sourceUrl: {ts_str(STATPOP_PAGE)},")
    L.append("};")
    L.append("")
    L.append("export const cantonAreaMeta: CantonBaseMeta = {")
    L.append(f'  referenceDate: "{AREA_DATE}",')
    L.append(f"  national: {int(round(area['CH']))},")
    L.append("  source: " + ts_localized(*["swisstopo, swissBOUNDARIES3D"] * 4) + ",")
    L.append(f"  sourceUrl: {ts_str(SWISSTOPO_PAGE)},")
    L.append("};")
    L.append("")
    L.append("// One reference year per indicator, the same for all 26 cantons.")
    L.append("// `national` is the figure for Switzerland from the same table and year.")
    L.append("export const cantonIndicatorMeta: CantonIndicatorMeta[] = [")
    for ind_id, unit, year, provisional, source, url, values, dec in indicators:
        L.append("  {")
        L.append(f"    id: {ts_str(ind_id)},")
        L.append(f"    unit: {ts_str(unit)},")
        L.append(f"    year: {year},")
        L.append(f"    provisional: {'true' if provisional else 'false'},")
        L.append(f"    national: {num(values['CH'], dec)},")
        L.append(f"    source: {source},")
        L.append(f"    sourceUrl: {ts_str(url)},")
        L.append("  },")
    L.append("];")
    L.append("")
    L.append("export const cantons: Canton[] = [")
    for abbr, name, de, fr, it, capital in CANTONS:
        L.append("  {")
        L.append(f"    id: {ts_str(abbr.lower())},")
        L.append(f"    name: {ts_str(name)},")
        L.append(f"    nameDE: {ts_str(de)},")
        L.append(f"    nameFR: {ts_str(fr)},")
        L.append(f"    nameIT: {ts_str(it)},")
        L.append(f"    abbreviation: {ts_str(abbr)},")
        L.append(f"    capital: {ts_str(capital)},")
        L.append(f"    population: {pop[abbr]},")
        L.append(f"    area: {int(round(area[abbr]))},")
        L.append("    indicators: [")
        for ind_id, _unit, _year, _prov, _source, _url, values, dec in indicators:
            L.append(f"      {{ indicatorId: {ts_str(ind_id)}, value: {num(values[abbr], dec)} }},")
        L.append("    ],")
        L.append("  },")
    L.append("];")
    L.append("")
    L.append("export function getCantonById(id: string): Canton | undefined {")
    L.append("  return cantons.find((c) => c.id === id);")
    L.append("}")
    L.append("")
    L.append("export function getCantonByAbbreviation(abbr: string): Canton | undefined {")
    L.append("  return cantons.find((c) => c.abbreviation === abbr);")
    L.append("}")
    L.append("")
    L.append("export function getCantonIndicatorMeta(id: string): CantonIndicatorMeta | undefined {")
    L.append("  return cantonIndicatorMeta.find((m) => m.id === id);")
    L.append("}")
    L.append("")

    OUTPUT_PATH.write_text("\n".join(L), encoding="utf-8")
    print(f"wrote {OUTPUT_PATH.relative_to(PROJECT_ROOT)}: {len(CANTONS)} cantons, {len(indicators)} indicators")
    for ind_id, _unit, year, provisional, _s, _u, values, dec in indicators:
        print(f"  {ind_id:22s} {year}{' (provisional)' if provisional else ''}  CH {num(values['CH'], dec)}")


if __name__ == "__main__":
    main()
