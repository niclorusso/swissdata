/**
 * The lines that go with a figure on the cards and charts: unit line, change against the previous figure,
 * publication date, the other official measure and how to read the chart. Every value and year comes from
 * src/data/indicators.ts; the words come from the translations.
 */
import type { Indicator } from "@/types";
import type { Locale } from "@/i18n/translations";
import { translations } from "@/i18n/translations";
import { localizePeriod } from "@/i18n/periods";
import { indicators } from "@/data/indicators";
import { formatLongDate, formatNumber, formatPercent, formatWithUnit, ownDecimals, percentSign } from "./formatters";

/** Year of the latest figure in the series. */
export function latestYear(indicator: Indicator): number {
  const data = indicator.historicalData ?? [];
  return data[data.length - 1]?.year ?? Number.parseInt(indicator.lastUpdated, 10);
}

/** Year of the first figure in the series. */
export function firstYear(indicator: Indicator): number {
  return indicator.historicalData?.[0]?.year ?? latestYear(indicator);
}

/** Year of the figure compared with: previousPeriod (surveys every two years), else the year before the latest one in the series. */
export function previousYear(indicator: Indicator): string {
  if (indicator.previousPeriod) return indicator.previousPeriod;
  const data = indicator.historicalData ?? [];
  return String(data[data.length - 2]?.year ?? latestYear(indicator) - 1);
}

/** "2024 (provvisorio)", "2025 (prima stima)", "2025": the year with the status the source gives it. */
export function periodWithStatus(indicator: Indicator, locale: Locale): string {
  const status = /\((provisional|first estimate)\)/.exec(indicator.lastUpdated)?.[0];
  const year = String(latestYear(indicator));
  return status ? `${year} ${localizePeriod(status, locale)}` : year;
}

/** "delle persone attive, media 2025" */
export function unitLine(indicator: Indicator, locale: Locale): string {
  return indicator.unitLine.replace("{year}", periodWithStatus(indicator, locale));
}

const isIndex = (unit: string) => unit.startsWith("Index");

/** Decimals of the indicator's own figure (at least one for values in %), used for every value of that indicator. */
function decimalsOf(indicator: Indicator): number {
  const own = ownDecimals(indicator.value);
  return indicator.unit.startsWith("%") ? Math.max(1, own) : own;
}

/** A value of the indicator with its unit: "4,8 %", "CHF 7024", "9,127 milioni"; an index without unit ("123,4"; the unit line says the base). */
export function formatIndicatorValue(indicator: Indicator, locale: Locale, value: number = indicator.value): string {
  const decimals = decimalsOf(indicator);
  if (isIndex(indicator.unit)) return formatNumber(value, locale, { decimals });
  return formatWithUnit(value, indicator.unit, locale, { decimals });
}

/** Change line split around the delta, so that the delta can be set in bold: before + delta + after. */
export interface ChangeLine {
  before: string;
  delta: string | null;
  after: string;
}

function split(template: string, delta: string | null): ChangeLine {
  const at = template.indexOf("{delta}");
  if (at < 0 || delta === null) return { before: template.replace("{delta}", ""), delta: null, after: "" };
  return { before: template.slice(0, at), delta, after: template.slice(at + "{delta}".length) };
}

/**
 * "+0,5 punti rispetto al 2024 (4,3 %)", "+3,5 % rispetto al 2022 (CHF 6788)", "Nel 2024: 1,5 %".
 * Points and years are the difference of the two figures, computed from the unrounded source values where the
 * data give them (unrounded), else from the figures as shown; relative changes use trendPercentage, which is
 * computed from the unrounded source values too.
 */
export function changeLine(indicator: Indicator, locale: Locale): ChangeLine | null {
  if (indicator.previousValue === undefined) return null;
  const t = translations[locale].change;
  const prevYear = previousYear(indicator);
  const previous = formatIndicatorValue(indicator, locale, indicator.previousValue);
  const fill = (template: string) => template.replace("{prevYear}", prevYear).replace("{previous}", previous);

  if (indicator.changeKind === "previous") return split(fill(t.previous), null);

  if (indicator.changeKind === "relative") {
    const change = indicator.trendPercentage;
    if (change === undefined) return null;
    if (formatNumber(Math.abs(change), "en", { decimals: 1 }) === "0.0") return split(fill(t.same), null);
    return split(fill(t.relative), formatNumber(change, locale, { decimals: 1, sign: true }) + percentSign(locale));
  }

  // points and years: difference of the unrounded figures where known, one decimal
  const exact = indicator.unrounded ?? { value: indicator.value, previous: indicator.previousValue };
  const difference = Math.round((exact.value - exact.previous) * 10) / 10;
  if (difference === 0) return split(fill(t.same), null);
  const size = Math.abs(difference);
  const singular = locale === "fr" ? size < 2 : locale === "en" ? size === 1 : false;
  const template =
    indicator.changeKind === "years" ? (singular ? t.yearsOne : t.years) : singular ? t.pointsOne : t.points;
  return split(fill(template), formatNumber(difference, locale, { decimals: 1, sign: true }));
}

/** "pubblicato il 12 novembre 2026", "pubblicato ad agosto 2026"; null when the date is not known. Indicators and quiz answers. */
export function publishedText(item: { sourcePublished?: string }, locale: Locale): string | null {
  const iso = item.sourcePublished;
  if (!iso) return null;
  const t = translations[locale].common;
  if (/^\d{4}-\d{2}$/.test(iso)) {
    const month = formatLongDate(iso, locale);
    // Italian: "a giugno", "ad agosto"
    const withPreposition = locale === "it" ? `${/^[aeiou]/.test(month) ? "ad" : "a"} ${month}` : month;
    return t.publishedMonth.replace("{month}", withPreposition);
  }
  return t.published.replace("{date}", formatLongDate(iso, locale));
}

/** The other official measure of the same thing, with its value and year from the data. */
export function relatedText(indicator: Indicator, locale: Locale): string | null {
  const related = indicator.related;
  if (!related) return null;
  if (related.text.includes("{ilo}")) {
    const ilo = indicators.find((i) => i.id === "unemployment-rate-ilo");
    const seco = indicators.find((i) => i.id === "unemployment-rate");
    if (!ilo || !seco) return null;
    return related.text
      .replace("{year}", String(latestYear(ilo)))
      .replace("{ilo}", formatIndicatorValue(ilo, locale))
      .replace("{seco}", formatIndicatorValue(seco, locale));
  }
  if (related.value === undefined || related.year === undefined) return related.text;
  return related.text
    .replace("{value}", formatWithUnit(related.value, related.unit ?? "", locale))
    .replace("{year}", String(related.year));
}

/** How to read the chart: "123,4 vuol dire prezzi più alti del 23,4 % …". */
export function howToReadText(indicator: Indicator, locale: Locale): string | null {
  if (!indicator.howToRead) return null;
  return indicator.howToRead
    .replace("{value}", formatNumber(indicator.value, locale, { decimals: decimalsOf(indicator) }))
    .replace("{diff}", formatPercent(indicator.value - 100, locale, { decimals: 1 }));
}
