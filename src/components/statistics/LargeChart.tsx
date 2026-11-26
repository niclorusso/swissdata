"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import { Indicator } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatNumber, formatWithUnit, formatYear } from "@/lib/formatters";
import { niceTicks } from "@/lib/ticks";

/** Line chart of one indicator over the years. */
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
  const values = data.map((d) => d.value);
  const { ticks, decimals } = niceTicks(Math.min(...values), Math.max(...values));
  const tickLabel = (value: number) => formatNumber(value, locale, { decimals });
  const axisWidth = Math.max(...ticks.map((tick) => tickLabel(tick).length)) * 8.4 + 12;
  // Year axis: first and last year always shown, in between as many as fit
  const years = data.map((d) => d.year);

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-line rounded-lg shadow-lg p-3">
          <p className="font-semibold text-swiss-gray-900">{formatYear(Number(label))}</p>
          <p className="text-sm text-swiss-gray-900 swiss-number">
            {formatWithUnit(payload[0].value, indicator.unit, locale)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 22, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DEDBD1" />
        <XAxis
          dataKey="year"
          type="number"
          domain={[years[0], years[years.length - 1]]}
          ticks={years}
          interval="preserveStartEnd"
          minTickGap={18}
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
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={chartColor}
          strokeWidth={2}
          dot={{ fill: chartColor, strokeWidth: 0, r: 2 }}
          activeDot={{ r: 4, strokeWidth: 0 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
