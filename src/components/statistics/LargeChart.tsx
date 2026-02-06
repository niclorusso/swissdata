"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { Indicator, DataPoint } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";

interface ChartSeries {
  indicator: Indicator;
  color: string;
}

interface Annotation {
  year: number;
  label: string;
}

interface LargeChartProps {
  series: ChartSeries[];
  height?: number;
  startYear?: number;
  annotations?: Annotation[];
  title?: string;
  showGrid?: boolean;
}

// Merge data from multiple indicators into single dataset
function mergeData(series: ChartSeries[], startYear: number): Record<string, number | string>[] {
  const dataMap = new Map<number, Record<string, number | string>>();

  series.forEach(({ indicator }) => {
    indicator.historicalData?.forEach((point) => {
      if (point.year >= startYear) {
        if (!dataMap.has(point.year)) {
          dataMap.set(point.year, { year: point.year });
        }
        const entry = dataMap.get(point.year)!;
        entry[indicator.id] = point.value;
      }
    });
  });

  return Array.from(dataMap.values()).sort((a, b) => (a.year as number) - (b.year as number));
}

function formatValue(value: number, unit: string, locale: "en" | "it" | "de" | "fr" = "en"): string {
  if (unit === "people" || unit === "count") {
    return value.toLocaleString("de-CH");
  }
  if (unit === "CHF" || unit === "CHF/month") {
    return `CHF ${value.toLocaleString("de-CH")}`;
  }
  if (unit === "%") {
    return `${value.toFixed(1)}%`;
  }
  if (unit === "years") {
    const yearsWord = locale === "it" ? "anni" : locale === "de" ? "Jahre" : locale === "fr" ? "ans" : "years";
    return `${value.toFixed(1)} ${yearsWord}`;
  }
  if (unit === "index") {
    return value.toFixed(1);
  }
  if (unit === "per 100k") {
    return value.toLocaleString("de-CH");
  }
  return value.toString();
}

export function LargeChart({
  series,
  height = 400,
  startYear = 2000,
  annotations = [],
  title,
  showGrid = true,
}: LargeChartProps) {
  const { locale } = useLanguage();
  const data = mergeData(series, startYear);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-swiss-gray-500">
        No data available for the selected time range
      </div>
    );
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-swiss-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-swiss-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            const seriesItem = series.find((s) => s.indicator.id === entry.dataKey);
            if (!seriesItem) return null;
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {seriesItem.indicator.shortName}:{" "}
                <span className="font-medium">
                  {formatValue(entry.value, seriesItem.indicator.unit, locale)}
                </span>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-base sm:text-lg font-semibold text-swiss-gray-900 mb-3 sm:mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />}
          <XAxis
            dataKey="year"
            tick={{ fill: "#525252", fontSize: 10 }}
            tickLine={{ stroke: "#A3A3A3" }}
            axisLine={{ stroke: "#A3A3A3" }}
          />
          <YAxis
            tick={{ fill: "#525252", fontSize: 10 }}
            tickLine={{ stroke: "#A3A3A3" }}
            axisLine={{ stroke: "#A3A3A3" }}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value) => {
              const seriesItem = series.find((s) => s.indicator.id === value);
              return seriesItem?.indicator.shortName || value;
            }}
          />

          {/* Reference lines for annotations */}
          {annotations.map((annotation) => (
            <ReferenceLine
              key={annotation.year}
              x={annotation.year}
              stroke="#DC2626"
              strokeDasharray="3 3"
              label={{
                value: annotation.label,
                position: "top",
                fill: "#DC2626",
                fontSize: 11,
              }}
            />
          ))}

          {/* Data lines */}
          {series.map(({ indicator, color }) => (
            <Line
              key={indicator.id}
              type="monotone"
              dataKey={indicator.id}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Single indicator chart with area fill
export function SingleIndicatorChart({
  indicator,
  height = 300,
  startYear = 2000,
  annotations = [],
  color,
}: {
  indicator: Indicator;
  height?: number;
  startYear?: number;
  annotations?: Annotation[];
  color?: string;
}) {
  const categoryColors = {
    economic: "#2563EB",
    demographic: "#7C3AED",
    social: "#059669",
  };

  const chartColor = color || categoryColors[indicator.category];
  const data = indicator.historicalData?.filter((d) => d.year >= startYear) || [];

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-swiss-gray-500">
        No data available
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-swiss-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-swiss-gray-900">{label}</p>
          <p className="text-sm" style={{ color: chartColor }}>
            {formatValue(payload[0].value, indicator.unit)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
        <XAxis
          dataKey="year"
          tick={{ fill: "#525252", fontSize: 10 }}
          tickLine={{ stroke: "#A3A3A3" }}
          axisLine={{ stroke: "#A3A3A3" }}
        />
        <YAxis
          tick={{ fill: "#525252", fontSize: 10 }}
          tickLine={{ stroke: "#A3A3A3" }}
          axisLine={{ stroke: "#A3A3A3" }}
          width={40}
          domain={["auto", "auto"]}
        />
        <Tooltip content={<CustomTooltip />} />

        {annotations.map((annotation) => (
          <ReferenceLine
            key={annotation.year}
            x={annotation.year}
            stroke="#DC2626"
            strokeDasharray="3 3"
          />
        ))}

        <Line
          type="monotone"
          dataKey="value"
          stroke={chartColor}
          strokeWidth={2}
          dot={{ fill: chartColor, strokeWidth: 0, r: 2 }}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
