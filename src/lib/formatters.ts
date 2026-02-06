/**
 * Swiss number formatting utilities
 * Switzerland uses apostrophe (') as thousands separator and period (.) as decimal separator
 */

// Unit translations
const unitTranslations: Record<string, Record<string, string>> = {
  en: {
    "% of GDP": "% of GDP",
    "Million": "Million",
    "years": "years",
    "per 1,000 inhabitants": "per 1,000 inhabitants",
    "% of total population": "% of total population",
    "Index (Q4 2019=100)": "Index (Q4 2019=100)",
    "CHF/month": "CHF/month",
    "per km²": "per km²",
  },
  it: {
    "% of GDP": "% del PIL",
    "Million": "Milioni",
    "years": "anni",
    "per 1,000 inhabitants": "per 1'000 abitanti",
    "% of total population": "% della popolazione",
    "Index (Q4 2019=100)": "Indice (Q4 2019=100)",
    "CHF/month": "CHF/mese",
    "per km²": "per km²",
  },
  de: {
    "% of GDP": "% des BIP",
    "Million": "Millionen",
    "years": "Jahre",
    "per 1,000 inhabitants": "pro 1'000 Einwohner",
    "% of total population": "% der Bevölkerung",
    "Index (Q4 2019=100)": "Index (Q4 2019=100)",
    "CHF/month": "CHF/Monat",
    "per km²": "pro km²",
  },
  fr: {
    "% of GDP": "% du PIB",
    "Million": "Millions",
    "years": "ans",
    "per 1,000 inhabitants": "pour 1'000 habitants",
    "% of total population": "% de la population",
    "Index (Q4 2019=100)": "Indice (T4 2019=100)",
    "CHF/month": "CHF/mois",
    "per km²": "par km²",
  },
};

/**
 * Get translated unit
 */
export function getTranslatedUnit(unit: string, locale: "en" | "it" | "de" | "fr" = "en"): string {
  return unitTranslations[locale]?.[unit] || unit;
}

/**
 * Format a number in Swiss style (e.g., 1'234'567.89)
 */
export function formatSwissNumber(
  value: number,
  options?: {
    decimals?: number;
    showSign?: boolean;
  }
): string {
  const { decimals = 0, showSign = false } = options || {};

  const sign = showSign && value > 0 ? "+" : "";

  // Format with Swiss locale (de-CH uses apostrophe for thousands)
  const formatted = new Intl.NumberFormat("de-CH", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.abs(value));

  return sign + (value < 0 ? "-" : "") + formatted;
}

/**
 * Format a percentage value
 */
export function formatPercentage(
  value: number,
  options?: {
    decimals?: number;
    showSign?: boolean;
  }
): string {
  const { decimals = 1, showSign = false } = options || {};
  return formatSwissNumber(value, { decimals, showSign }) + "%";
}

/**
 * Format currency in CHF
 */
export function formatCHF(
  value: number,
  options?: {
    decimals?: number;
    compact?: boolean;
  }
): string {
  const { decimals = 0, compact = false } = options || {};

  if (compact && Math.abs(value) >= 1_000_000_000) {
    return `CHF ${formatSwissNumber(value / 1_000_000_000, { decimals: 1 })} Mrd.`;
  }
  if (compact && Math.abs(value) >= 1_000_000) {
    return `CHF ${formatSwissNumber(value / 1_000_000, { decimals: 1 })} Mio.`;
  }

  return `CHF ${formatSwissNumber(value, { decimals })}`;
}

/**
 * Format a date in Swiss style (DD.MM.YYYY)
 */
export function formatSwissDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("de-CH");
}

/**
 * Format a value with its unit (locale-aware)
 */
export function formatWithUnit(value: number, unit: string, locale: "en" | "it" | "de" | "fr" = "en"): string {
  const translatedUnit = getTranslatedUnit(unit, locale);
  
  switch (unit) {
    case "%":
      return formatPercentage(value);
    case "CHF":
      return formatCHF(value);
    case "CHF/month":
      const monthWord = locale === "it" ? "mese" : locale === "de" ? "Monat" : locale === "fr" ? "mois" : "month";
      return `CHF ${formatSwissNumber(value)}/${monthWord}`;
    case "per 100k":
      return formatSwissNumber(value, { decimals: 1 });
    case "km²":
      return `${formatSwissNumber(value)} km²`;
    case "people":
    case "persons":
      return formatSwissNumber(value);
    case "people/km²":
      const perWord = locale === "de" ? "pro" : locale === "fr" ? "par" : "per";
      return `${formatSwissNumber(value)} ${perWord} km²`;
    default:
      return `${formatSwissNumber(value)} ${translatedUnit}`;
  }
}

/**
 * Get trend arrow and color based on direction and whether higher is better
 */
export function getTrendDisplay(
  trend: "up" | "down" | "stable",
  higherIsBetter: boolean = true
): { arrow: string; color: string } {
  if (trend === "stable") {
    return { arrow: "→", color: "text-swiss-gray-500" };
  }

  const isPositive = (trend === "up" && higherIsBetter) || (trend === "down" && !higherIsBetter);

  return {
    arrow: trend === "up" ? "↑" : "↓",
    color: isPositive ? "text-green-600" : "text-red-600",
  };
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
