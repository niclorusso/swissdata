import { formatWithUnit, type NumberLocale } from "./formatters";

/** Decimals of a canton figure: one for % and rates per 1000, none for francs. */
export function cantonDecimals(unit: string): number {
  return unit === "CHF" || unit === "CHF/month" ? 0 : 1;
}

/** A canton figure with its unit: "2,8 %", "CHF 382/mese", "39,3 per 1000 abitanti". */
export function formatCantonValue(value: number, unit: string, locale: NumberLocale): string {
  return formatWithUnit(value, unit, locale, { decimals: cantonDecimals(unit) });
}
