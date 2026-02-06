/**
 * Swiss number formatting utilities
 * Switzerland uses apostrophe (') as thousands separator and period (.) as decimal separator
 */

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
 * Format a value with its unit
 */
export function formatWithUnit(value: number, unit: string): string {
  switch (unit) {
    case "%":
      return formatPercentage(value);
    case "CHF":
      return formatCHF(value);
    case "CHF/month":
      return `CHF ${formatSwissNumber(value)}/month`;
    case "per 100k":
      return formatSwissNumber(value, { decimals: 1 });
    case "km²":
      return `${formatSwissNumber(value)} km²`;
    case "people":
    case "persons":
      return formatSwissNumber(value);
    case "people/km²":
      return `${formatSwissNumber(value)} per km²`;
    default:
      return `${formatSwissNumber(value)} ${unit}`;
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
