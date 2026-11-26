/**
 * Numbers, the same way everywhere on the site.
 *
 * Italian, German, French: the rule of the Federal Chancellery (Schreibweisungen, Rz 512):
 *   groups of three separated by a narrow no-break space, only from five digits up
 *   (803 250 but 4201), decimal comma (4,8), a no-break space before % (4,8 %).
 * English: 803,250 and 4.8%.
 * Amounts in CHF follow the same rule.
 *
 * The grouping is written by hand and does not use Intl: the locale data for de-CH differs
 * between Node and browsers (U+2019 against U+0027 as separator), so the server and the
 * browser produced different strings and React reported hydration error #418.
 */

export type NumberLocale = "en" | "it" | "de" | "fr";

/** U+202F, narrow no-break space: thousands separator in it/de/fr */
export const NNBSP = " ";
/** U+00A0, no-break space: before % and between CHF and the amount */
export const NBSP = " ";
/** U+2212, minus sign */
export const MINUS = "−";

/**
 * Decimals of a figure as it is written in the data (9.127 -> 3, 61.3 -> 1, 7024 -> 0),
 * so that every page shows the precision of the source.
 */
export function ownDecimals(value: number): number {
  const text = String(value);
  const dot = text.indexOf(".");
  return dot < 0 || text.includes("e") ? 0 : Math.min(3, text.length - dot - 1);
}

export interface NumberOptions {
  /** number of decimals; default: the decimals of the value as written (at most 3) */
  decimals?: number;
  /** write + before positive values */
  sign?: boolean;
}

/** The one function that writes a number. */
export function formatNumber(value: number, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  if (!Number.isFinite(value)) return "";
  const decimals = options.decimals ?? ownDecimals(value);
  const fixed = Math.abs(value).toFixed(decimals);
  const dot = fixed.indexOf(".");
  const whole = dot < 0 ? fixed : fixed.slice(0, dot);
  const fraction = dot < 0 ? "" : fixed.slice(dot + 1);
  const english = locale === "en";

  let grouped = whole;
  if (english ? whole.length > 3 : whole.length > 4) {
    const separator = english ? "," : NNBSP;
    grouped = "";
    for (let i = 0; i < whole.length; i++) {
      if (i > 0 && (whole.length - i) % 3 === 0) grouped += separator;
      grouped += whole[i];
    }
  }

  const isZero = Number(fixed) === 0;
  const prefix = value < 0 && !isZero ? MINUS : options.sign && value > 0 && !isZero ? "+" : "";
  return prefix + grouped + (fraction ? (english ? "." : ",") + fraction : "");
}

/** 4.8% in English, 4,8 % (no-break space) in Italian, German and French. Default: one decimal. */
export function formatPercent(value: number, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  const text = formatNumber(value, locale, { decimals: 1, ...options });
  return text + percentSign(locale);
}

/** "%" with the space the language asks for. */
export function percentSign(locale: NumberLocale = "en"): string {
  return locale === "en" ? "%" : NBSP + "%";
}

/** CHF 7,024 in English, CHF 7024 and CHF 95 486 in Italian, German and French. */
export function formatCHF(value: number, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  return "CHF" + NBSP + formatNumber(value, locale, { decimals: 0, ...options });
}

/** ISO date (2025-12-31) as 31.12.2025, without Date or Intl so that it never depends on the time zone. */
export function formatSwissDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : iso;
}

// Units as they are written in the data files -> unit shown in each language
const unitTranslations: Record<NumberLocale, Record<string, string>> = {
  en: {
    "% of GDP": "% of GDP",
    "Million": "million",
    "million": "million",
    "years": "years",
    "per 1,000 inhabitants": "per 1,000 inhabitants",
    "% of total population": "% of total population",
    "Index (Q4 2019=100)": "Index (Q4 2019=100)",
    "CHF/month": "CHF/month",
    "per km²": "per km²",
    "per 1000": "per 1,000",
    "per 100k": "per 100,000",
    "hours": "hours",
    "tonnes": "tonnes",
    "CHF bn": "CHF bn",
    "minutes": "minutes",
    "km": "km",
  },
  it: {
    "% of GDP": "% del PIL",
    "Million": "milioni",
    "million": "milioni",
    "years": "anni",
    "per 1,000 inhabitants": "per 1000 abitanti",
    "% of total population": "% della popolazione",
    "Index (Q4 2019=100)": "Indice (Q4 2019=100)",
    "CHF/month": "CHF/mese",
    "per km²": "per km²",
    "per 1000": "per 1000",
    "per 100k": "per 100 000",
    "hours": "ore",
    "tonnes": "tonnellate",
    "CHF bn": "mld CHF",
    "minutes": "minuti",
    "km": "km",
  },
  de: {
    "% of GDP": "% des BIP",
    "Million": "Millionen",
    "million": "Millionen",
    "years": "Jahre",
    "per 1,000 inhabitants": "pro 1000 Einwohner",
    "% of total population": "% der Bevölkerung",
    "Index (Q4 2019=100)": "Index (Q4 2019=100)",
    "CHF/month": "CHF/Monat",
    "per km²": "pro km²",
    "per 1000": "pro 1000",
    "per 100k": "pro 100 000",
    "hours": "Stunden",
    "tonnes": "Tonnen",
    "CHF bn": "Mrd. CHF",
    "minutes": "Minuten",
    "km": "km",
  },
  fr: {
    "% of GDP": "% du PIB",
    "Million": "millions",
    "million": "millions",
    "years": "ans",
    "per 1,000 inhabitants": "pour 1000 habitants",
    "% of total population": "% de la population",
    "Index (Q4 2019=100)": "Indice (T4 2019=100)",
    "CHF/month": "CHF/mois",
    "per km²": "par km²",
    "per 1000": "pour 1000",
    "per 100k": "pour 100 000",
    "hours": "heures",
    "tonnes": "tonnes",
    "CHF bn": "mrd CHF",
    "minutes": "minutes",
    "km": "km",
  },
};

/** Unit of a data file in the language of the page. */
export function getTranslatedUnit(unit: string, locale: NumberLocale = "en"): string {
  return unitTranslations[locale]?.[unit] ?? unit;
}

/** A figure with its unit: "4,8 %", "CHF 7024", "9,127 milioni", "11,4 % del PIL", "61,3 per 1000 abitanti". */
export function formatWithUnit(value: number, unit: string, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  const unitText = getTranslatedUnit(unit, locale);
  if (unit === "%") return formatPercent(value, locale, { decimals: Math.max(1, ownDecimals(value)), ...options });
  if (unit === "CHF") return formatCHF(value, locale, options);
  if (unit === "CHF/month") return formatCHF(value, locale, options) + "/" + unitText.split("/")[1];
  if (unit === "CHF bn") return locale === "en" ? `CHF${NBSP}${formatNumber(value, locale, options)} bn` : `${formatNumber(value, locale, options)}${NBSP}${unitText}`;
  if (unit === "rank") return "#" + formatNumber(value, locale, { decimals: 0 });
  if (unit === "year") return String(Math.round(value));
  if (unit === "count" || unit === "index" || unit === "rate") return formatNumber(value, locale, options);
  if (unitText.startsWith("%")) return formatNumber(value, locale, options) + percentSign(locale) + unitText.slice(1);
  return formatNumber(value, locale, options) + NBSP + unitText;
}

/**
 * Calculate accuracy score for quiz (0-100)
 * Linear calculation: 100% if exact, decreasing proportionally to distance from actual value
 */
export function calculateAccuracy(guess: number, actual: number, range: number): number {
  const distance = Math.abs(guess - actual);

  // Linear accuracy: 100% - (percentage of range that was off)
  // e.g., if range is 60 and you're off by 5, that's 5/60 = 8.3% off = 91.7% accurate
  const percentageOff = (distance / range) * 100;
  const accuracy = Math.max(0, 100 - percentageOff);

  return Math.round(accuracy);
}
