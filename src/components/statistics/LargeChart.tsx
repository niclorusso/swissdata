"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { Indicator } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatNumber, formatWithUnit, formatYear } from "@/lib/formatters";
import { formatIndicatorValue } from "@/lib/indicatorText";
import { niceTicks } from "@/lib/ticks";

/** Amounts and counts: the value axis starts at zero. */
const FROM_ZERO = new Set(["average-wage", "population-total"]);
/** Values that are themselves yearly changes and cross zero: the axis keeps the range and shows the zero line. */
const ZERO_LINE = new Set(["gdp-growth-rate", "inflation-rate"]);
/** Index with base 100: a light line at 100. */
const BASE_100 = new Set(["housing-price-index"]);

export interface ValueAxis {
  ticks: number[];
  decimals: number;
  /** true when the lowest tick is above zero: the card says so */
  notFromZero: boolean;
}

/** Value axis of an indicator's chart for the years shown. */
export function valueAxis(indicator: Indicator, values: number[]): ValueAxis {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const { ticks, decimals } =
    FROM_ZERO.has(indicator.id) || ZERO_LINE.has(indicator.id)
      ? niceTicks(Math.min(0, min), Math.max(0, max))
      : niceTicks(min, max);
  return { ticks, decimals, notFromZero: ticks[0] > 0 };
}

/**
 * Year ticks: the first and the last year, and in between the round years (multiples of 5; of 10 or 20 for
 * series longer than 25 or 50 years). A round year too close to the first or last one is left out, so that
 * labels never touch: 2006–2025 gives 2006, 2010, 2015, 2020, 2025; 1960–2025 gives 1960, 1980, 2000, 2025.
 */
export function yearTicks(first: number, last: number): number[] {
  const span = last - first;
  const step = span > 50 ? 20 : span > 25 ? 10 : 5;
  // at least 3 years, and at least 15% of the span, from the first and the last year
  const gap = Math.max(3, Math.ceil(span * 0.15));
  const ticks = [first];
  for (let year = Math.ceil(first / step) * step; year <= last; year += step) {
    if (year - first >= gap && last - year >= gap) ticks.push(year);
  }
  if (last !== first) ticks.push(last);
  return ticks;
}

/** Line chart of one indicator over the years: straight segments, a dot for each year with a figure. */
export function SingleIndicatorChart({
  indicator,
  height = 300,
  startYear = 2000,
  color,
}: {
  indicator: Indicator;
  height?: number;
  startYear?: number;
  color?: string;
}) {
  const { locale, t } = useLanguage();
  const categoryColors = {
    economic: "#2563EB",
    demographic: "#7C3AED",
    social: "#059669",
  };

  const chartColor = color || categoryColors[indicator.category];
  const data = indicator.historicalData?.filter((d) => d.year >= startYear) || [];

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-swiss-gray-600">
        {t.statistics.noData}
      </div>
    );
  }

  // Value axis: round steps, every label with the same number of decimals, width from the longest label
  const { ticks, decimals } = valueAxis(indicator, data.map((d) => d.value));
  const tickLabel = (value: number) => formatNumber(value, locale, { decimals });
  const axisWidth = Math.max(...ticks.map((tick) => tickLabel(tick).length)) * 8.4 + 12;
  const from = data[0];
  const to = data[data.length - 1];

  const label = t.statistics.chartLabel
    .replace("{title}", indicator.shortName)
    .replace("{firstValue}", formatIndicatorValue(indicator, locale, from.value))
    .replace("{from}", formatYear(from.year))
    .replace("{lastValue}", formatIndicatorValue(indicator, locale, to.value))
    .replace("{to}", formatYear(to.year));

  const CustomTooltip = ({ active, payload, label: year }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-line rounded-lg shadow-lg p-3">
          <p className="font-semibold text-swiss-gray-900">{formatYear(Number(year))}</p>
          <p className="text-sm text-swiss-gray-900 swiss-number">
            {formatWithUnit(payload[0].value, indicator.unit, locale)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div role="img" aria-label={label} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 22, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DEDBD1" />
          <XAxis
            dataKey="year"
            type="number"
            domain={[from.year, to.year]}
            ticks={yearTicks(from.year, to.year)}
            interval={0}
            tickMargin={8}
            tickFormatter={(year: number) => formatYear(year)}
            tick={{ fill: "#4B5058", fontSize: 14 }}
            tickLine={{ stroke: "#A9A69C" }}
            axisLine={{ stroke: "#A9A69C" }}
          />
          <YAxis
            tick={{ fill: "#4B5058", fontSize: 14 }}
            tickLine={{ stroke: "#A9A69C" }}
            axisLine={{ stroke: "#A9A69C" }}
            width={axisWidth}
            domain={[ticks[0], ticks[ticks.length - 1]]}
            ticks={ticks}
            interval={0}
            tickFormatter={tickLabel}
          />
          {ZERO_LINE.has(indicator.id) && <ReferenceLine y={0} stroke="#4B5058" strokeWidth={1} />}
          {BASE_100.has(indicator.id) && ticks[0] <= 100 && ticks[ticks.length - 1] >= 100 && (
            <ReferenceLine y={100} stroke="#A9A69C" strokeWidth={1} />
          )}
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="linear"
            dataKey="value"
            stroke={chartColor}
            strokeWidth={2}
            dot={{ fill: chartColor, stroke: chartColor, strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
