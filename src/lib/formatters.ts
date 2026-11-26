/**
 * Numbers, the same way everywhere on the site (and in the three SwissData sites).
 *
 * Italian, German, French: the rule of the Federal Chancellery (Schreibweisungen, Rz 512):
 *   groups of three separated by a narrow no-break space (U+202F), only from five digits up
 *   (803 250 but 4201), decimal comma (4,8), a space before %: U+00A0 in Italian and German,
 *   U+202F in French (French typographic rule).
 * English: 803,250 and 4.8%.
 * Negative numbers: the minus sign U+2212, directly before the first digit.
 * Amounts in CHF follow the same rule. A value that is missing is written as an en dash.
 *
 * Nothing here uses Intl or toFixed: the locale data for de-CH differs between Node and
 * browsers (U+2019 against U+0027), which made the server and the browser disagree
 * (React hydration error #418), and toFixed rounds the binary value (4.05 -> "4.0").
 */

export type NumberLocale = "en" | "it" | "de" | "fr";

/** U+202F, narrow no-break space: thousands separator in it/de/fr, space before % in French */
export const NNBSP = "\u202F";
/** U+00A0, no-break space: before % in Italian and German, between a number and its unit */
export const NBSP = "\u00A0";
/** U+2212, minus sign */
export const MINUS = "\u2212";
/** U+2013, en dash: a value that is not available */
export const MISSING = "\u2013";

type Numeric = number | null | undefined;

const isNumber = (value: Numeric): value is number => typeof value === "number" && Number.isFinite(value);

/**
 * Decimals of a figure as it is written in the data (9.127 -> 3, 61.3 -> 1, 7024 -> 0),
 * so that every page shows the precision of the source.
 */
export function ownDecimals(value: number): number {
  const text = String(value);
  const dot = text.indexOf(".");
  return dot < 0 || text.includes("e") ? 0 : Math.min(3, text.length - dot - 1);
}

/**
 * The absolute value with exactly `decimals` decimals, rounded half away from zero on the
 * decimal digits of the number as written (4.05 -> "4.1", 5.55 -> "5.6", 2.5 -> "3").
 */
export function roundDecimal(value: number, decimals: number): string {
  const text = String(Math.abs(value));
  if (text.includes("e")) return Math.abs(value).toFixed(decimals); // very large or very small: outside what the site shows
  const [whole, fraction = ""] = text.split(".");
  if (fraction.length <= decimals) return decimals > 0 ? `${whole}.${fraction.padEnd(decimals, "0")}` : whole;
  const digits = (whole + fraction.slice(0, decimals)).split("").map(Number);
  if (fraction.charCodeAt(decimals) >= 53) {
    // next digit is 5 or more: add one to the last kept digit and carry
    let i = digits.length - 1;
    while (i >= 0 && digits[i] === 9) digits[i--] = 0;
    if (i >= 0) digits[i] += 1;
    else digits.unshift(1);
  }
  const all = digits.join("");
  const cut = all.length - decimals;
  return decimals > 0 ? `${all.slice(0, cut)}.${all.slice(cut)}` : all;
}

export interface NumberOptions {
  /** number of decimals; default: the decimals of the value as written (at most 3) */
  decimals?: number;
  /** write + before positive values */
  sign?: boolean;
}

/** The one function that writes a number. Not for years: see formatYear. */
export function formatNumber(value: Numeric, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  if (!isNumber(value)) return MISSING;
  const decimals = options.decimals ?? ownDecimals(value);
  const fixed = roundDecimal(value, decimals);
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

/** A year is never grouped: 2025, in every language. */
export function formatYear(value: Numeric): string {
  return isNumber(value) ? String(Math.round(value)) : MISSING;
}

/** "%" with the space the language asks for: none in English, U+00A0 in Italian and German, U+202F in French. */
export function percentSign(locale: NumberLocale = "en"): string {
  return locale === "en" ? "%" : (locale === "fr" ? NNBSP : NBSP) + "%";
}

/** 4.8% in English, 4,8 % in Italian, German and French. Default: one decimal. */
export function formatPercent(value: Numeric, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  if (!isNumber(value)) return MISSING;
  return formatNumber(value, locale, { decimals: 1, ...options }) + percentSign(locale);
}

/** CHF 7,024 in English, CHF 7024 and CHF 95 486 in Italian, German and French. */
export function formatCHF(value: Numeric, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  if (!isNumber(value)) return MISSING;
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
export function formatWithUnit(value: Numeric, unit: string, locale: NumberLocale = "en", options: NumberOptions = {}): string {
  if (!isNumber(value)) return MISSING;
  const unitText = getTranslatedUnit(unit, locale);
  if (unit === "%") return formatPercent(value, locale, { decimals: Math.max(1, ownDecimals(value)), ...options });
  if (unit === "CHF") return formatCHF(value, locale, options);
  if (unit === "CHF/month") return formatCHF(value, locale, options) + "/" + unitText.split("/")[1];
  if (unit === "CHF bn") return locale === "en" ? `CHF${NBSP}${formatNumber(value, locale, options)} bn` : `${formatNumber(value, locale, options)}${NBSP}${unitText}`;
  if (unit === "rank") return "#" + formatNumber(value, locale, { decimals: 0 });
  if (unit === "year") return formatYear(value);
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
