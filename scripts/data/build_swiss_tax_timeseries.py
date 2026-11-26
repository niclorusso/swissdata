#!/usr/bin/env python3
"""
Build Swiss municipality historical time-series for map animation.

Output:
  public/data/swiss-municipality-tax-timeseries-2010-2019.json

Data sources:
  - ESTV municipality statistics (direct federal tax)
  - swissBOUNDARIES municipality geometry for centroid lookup
"""

from __future__ import annotations

import json
import re
import warnings
from pathlib import Path

import pandas as pd

warnings.filterwarnings("ignore")

PROJECT_ROOT = Path(__file__).resolve().parents[2]
CACHE_DIR = Path("/tmp/estv-cache")
OUTPUT_PATH = PROJECT_ROOT / "public/data/swiss-municipality-tax-timeseries-2010-2019.json"
ESTV_HTML_PATH = Path("/tmp/estv_np_gemeinden.html")
MUNICIPALITY_GEOJSON_PATH = CACHE_DIR / "gemeinden.geojson"


def flatten_coords(coords):
    if coords and isinstance(coords[0], (int, float)):
        return [coords]
    output = []
    for part in coords:
        output.extend(flatten_coords(part))
    return output


def load_municipality_lookup():
    geojson = json.loads(MUNICIPALITY_GEOJSON_PATH.read_text(encoding="utf-8"))
    centroids = {}
    names = {}
    cantons = {}
    for feat in geojson["features"]:
        props = feat["properties"]
        bfs = int(props["gemeinde.BFS_NUMMER"])
        pts = flatten_coords(feat["geometry"]["coordinates"])
        xs = [pt[0] for pt in pts]
        ys = [pt[1] for pt in pts]
        centroids[bfs] = ((min(ys) + max(ys)) / 2, (min(xs) + max(xs)) / 2)
        names[bfs] = props["gemeinde.NAME"]
        cantons[bfs] = props["kanton.KUERZEL"]
    return centroids, names, cantons


def parse_estv_links():
    html = ESTV_HTML_PATH.read_text(encoding="utf-8", errors="ignore")
    matches = re.findall(
        r'href="(https://www\.estv\.admin\.ch/dam/de/sd-web/[^"]+)"[^>]*download="([^"]+)"',
        html,
    )
    return {name: url for url, name in matches}


def parse_sheet(path: Path, sheet: str):
    df = pd.read_excel(path, sheet_name=sheet, header=None, dtype=object)

    header_idx = None
    for row_idx in range(min(40, len(df))):
        row = [str(v) for v in df.iloc[row_idx].tolist() if not pd.isna(v)]
        if any(v.strip() == "Gemeinde" or "Gemeinde / Commune" in v for v in row):
            header_idx = row_idx
            break
    if header_idx is None:
        return {}

    header = [str(v).strip() if not pd.isna(v) else "" for v in df.iloc[header_idx].tolist()]
    bfs_col = next(
        (
            i
            for i, h in enumerate(header)
            if "Gemeinde-" in h or "Gemeinde ID" in h or "Numéro de la\ncommune" in h
        ),
        1,
    )
    muni_col = next(
        (i for i, h in enumerate(header) if h == "Gemeinde" or h == "Commune" or "Gemeinde / Commune" in h),
        2,
    )
    canton_col = next(
        (i for i, h in enumerate(header) if "Kantons-" in h or "Kanton ID" in h or "Numéro \ndu canton" in h),
        0,
    )

    excluded_cols = {
        i
        for i, h in enumerate(header)
        if ("Bezirk" in h or "district" in h or "Kreis" in h or "cercle" in h or "Total" in h or "Totale" in h)
    }
    preface = " ".join(
        " ".join(str(v) for v in df.iloc[r].fillna("").tolist())
        for r in range(min(15, len(df)))
    )
    in_thousands = ("1'000" in preface) or ("1’000" in preface)

    totals_by_bfs = {}
    for row_idx in range(header_idx + 1, len(df)):
        row = df.iloc[row_idx]
        try:
            canton = int(float(row.iloc[canton_col]))
            bfs = int(float(row.iloc[bfs_col]))
        except Exception:
            continue
        if canton < 1 or bfs < 1:
            continue
        muni_value = row.iloc[muni_col]
        if pd.isna(muni_value) or not str(muni_value).strip():
            continue

        total = 0.0
        for col_idx in range(muni_col + 1, len(row)):
            if col_idx in excluded_cols:
                continue
            value = row.iloc[col_idx]
            if pd.isna(value):
                continue
            try:
                total += float(value)
            except Exception:
                pass

        if in_thousands:
            total *= 1000.0
        if total > 0:
            totals_by_bfs[bfs] = total

    return totals_by_bfs


def main():
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    estv_links = parse_estv_links()
    centroids, names, cantons = load_municipality_lookup()

    yearly_files = {
        2010: "statistik-dbst-np-gemeinde-2010-auswertung-de.xls",
        2011: "statistik-dbst-np-gemeinde-2011-auswertung-de.xls",
        2012: "statistik-dbst-np-gemeinde-2012-auswertung-de.xls",
        2013: "statistik-dbst-np-gemeinde-2013-auswertung-de.xls",
        2014: "statistik-dbst-np-gemeinde-2014-auswertung-de.xlsx",
        2015: "statistik-dbst-np-gemeinde-2015-auswertung-de.xlsx",
        2016: "statistik-dbst-np-gemeinde-2016-auswertung-de.xlsx",
        2017: "statistik-dbst-np-gemeinde-2017-auswertung-de.xlsx",
        2018: "statistik-dbst-np-gemeinde-2018-auswertung-de.xlsx",
        2019: "statistik-dbst-np-gemeinde-2019-auswertung-de.xlsx",
    }

    records = []
    for year, filename in sorted(yearly_files.items()):
        source_url = estv_links.get(filename)
        local_path = CACHE_DIR / filename
        if source_url and not local_path.exists():
            raise FileNotFoundError(
                f"Missing cached ESTV file {filename}. Download first from: {source_url}"
            )

        workbook = pd.ExcelFile(local_path)
        count_sheet = "241" if "241" in workbook.sheet_names else "121"
        income_sheet = "243" if "243" in workbook.sheet_names else "123"
        counts = parse_sheet(local_path, count_sheet)
        incomes = parse_sheet(local_path, income_sheet)

        for bfs in sorted(set(counts) & set(incomes) & set(centroids)):
            taxpayers = counts[bfs]
            total_income = incomes[bfs]
            if taxpayers <= 0 or total_income <= 0:
                continue
            latitude, longitude = centroids[bfs]
            records.append(
                {
                    "year": year,
                    "bfsNumber": bfs,
                    "municipality": names[bfs],
                    "canton": cantons[bfs],
                    "latitude": round(latitude, 6),
                    "longitude": round(longitude, 6),
                    "taxpayers": int(round(taxpayers)),
                    "totalTaxableIncomeChf": round(total_income, 2),
                    "avgTaxableIncomeChf": round(total_income / taxpayers, 2),
                }
            )

    records.sort(key=lambda rec: (rec["year"], -rec["avgTaxableIncomeChf"]))
    payload = {
        "metric": "avgTaxableIncomeChf",
        "description": (
            "Average taxable income per municipality and year "
            "(ESTV direct federal tax, normal+special cases). "
            "Proxy for long-run wealth dynamics."
        ),
        "years": sorted({rec["year"] for rec in records}),
        "records": records,
    }
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH} ({len(records)} rows)")


if __name__ == "__main__":
    main()
