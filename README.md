# SwissData

An interactive web app for exploring real statistics about Switzerland's economy, demographics, and society. Built with data from official Swiss sources.

## Features

- **Dashboard** (`/`) — Key indicators in three categories: economic, demographic and social
- **Statistics** (`/statistics`) — One chart per indicator with a selectable time range, a category filter and the source of each series
- **Canton Map** (`/cantons`) — SVG map of the 26 cantons, coloured by a selectable indicator, with a detail panel and a sortable table
- **Quiz** (`/quiz`) — 53 questions on Swiss statistics, answered with a slider, with a score
- **About** (`/about`)
- **Four languages** — English, Italian, German and French. The texts are in `src/i18n/`; the chosen language is stored in the browser

## Data Sources

The indicators and the canton figures come from Swiss federal offices (FSO, SECO, FFA, SFOE, FOPH, swisstopo) and Eurostat. The quiz also uses the OECD, the World Bank, the IMF, the ECB, SIPRI, the World Gold Council, the Swiss Bankers Association and SBB. The full list, with what is taken from each body, is in `src/data/sources.ts` and on the About page.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Framer Motion](https://www.framer.com/motion)
- [Zustand](https://zustand.docs.pmnd.rs)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data scripts

`scripts/data/build_cantons.py` builds `src/data/cantons.ts` (the figures of the canton map and table) from the official tables listed at the top of the script. `src/data/cantons.ts` is a generated file: to update a value, change the reference year or the source in the script and run it again.

```bash
python3 scripts/data/build_cantons.py
```

It needs Python 3.9 or later (standard library only) and `pdftotext` (poppler), because one source (the health premiums) is published only as PDF.

## Source watcher

`scripts/watch/` notices when an official source used by the site has published a newer edition, and when a source link shown to visitors has moved or broken. It changes nothing on the site: it writes a report that names, for each finding, the file and key to edit and the official page to open, with a draft change-log sentence.

- `sources.json` is the registry: one item per indicator, canton figure and quiz fact, with the publisher, where it is used, where the period shown on the site is read (from `src/data/indicators.ts`, `src/data/questions.ts` or the year constants of `scripts/data/build_cantons.py`) and one or more probes: FSO tables by order number (DAM API), FSO STAT-TAB cubes (PXWeb API), Eurostat tables (API), the SNB data portal, files at a stable address (ETag/Last-Modified or SHA-256), pages that list editions (a pattern), and figures defined per calendar year. Every `sourceUrl` in the data files and every URL in `src/data/sources.ts` is also checked as a link.
- A source is reported when its edition changed since the last run, or when it offers a newer period than the one the site shows. The second check also finds staleness that is older than the watcher.
- `.github/workflows/watch-sources.yml` runs it every day and on demand. When there is something to report it opens one issue labelled `sources` (or comments on the open one); otherwise it does nothing. The state of the last run is kept at the bottom of that issue, not in the repository, so the workflow never commits and never triggers a deploy. `state.json` is only the starting point: the sources as seen on the day the watcher was set up. The first run in GitHub opens one issue even with nothing to report, so that the state has a place to live; it can be closed at once (closed issues are still read). A source that cannot be reached is listed in the report but becomes an item only after three failed runs in a row.

Run it locally (Python 3.9+, standard library only, about a minute):

```bash
python3 scripts/watch/watch.py --out-dir /tmp/watch          # compares with scripts/watch/state.json
python3 scripts/watch/watch.py --state /dev/null --out-dir /tmp/watch   # without state: periods and links only
```

The report is `/tmp/watch/report.md`.

To add a source, add an item to `sources.json`: copy one of the same kind, set `id`, `label`, `publisher`, `used_in`, `shown` and the probe (for an FSO table, its order number, e.g. `je-d-15.06.01.03`). Run the watcher once and check that the new probe appears under neither "Could not check" nor "Registry notes". When a person has checked a manual source, set its `last_checked` date.

What it cannot see: a revised value inside a period the site already shows, unless the edition changes after the watcher started (a revision before that is invisible); whether the figure on the site matches the source (it compares editions and periods, not values); sources that refuse automated requests (OECD, World Bank, IMF, SBB) and editions published at a new address each year (FFA pocket statistics, budgets, SERI and FOEN reports): these are listed as manual checks, due 90 days after the date a person last checked them. The FSO period metadata can lag behind the file (the IMPI table said 2017-2024 while holding 2025); a new asset is still reported.

## License

[MIT](LICENSE)
