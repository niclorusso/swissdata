import type { Locale } from "./translations";

// Notes that follow a year in `lastUpdated` (src/data/indicators.ts), in the four languages.
const notes: Record<string, Record<Locale, string>> = {
  "(provisional)": { en: "(provisional)", it: "(provvisorio)", de: "(provisorisch)", fr: "(provisoire)" },
  "(first estimate)": { en: "(first estimate)", it: "(prima stima)", de: "(erste Schätzung)", fr: "(première estimation)" },
  "(1 January)": { en: "(1 January)", it: "(1° gennaio)", de: "(1. Januar)", fr: "(1er janvier)" },
  "(end of year)": { en: "(end of year)", it: "(fine anno)", de: "(Jahresende)", fr: "(fin d’année)" },
};

/** "2024 (provisional)" -> "2024 (provvisorio)" */
export function localizePeriod(period: string, locale: Locale): string {
  let text = period;
  for (const [english, byLocale] of Object.entries(notes)) text = text.replace(english, byLocale[locale]);
  return text;
}
