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

## License

[MIT](LICENSE)
