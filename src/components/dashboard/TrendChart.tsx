"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Indicator } from "@/types";
import { formatWithUnit } from "@/lib/formatters";
import { useLanguage } from "@/i18n/LanguageContext";

interface TrendChartProps {
  indicator: Indicator;
  height?: number;
  showArea?: boolean;
}

export function TrendChart({
  indicator,
  height = 200,
  showArea = true,
}: TrendChartProps) {
  const { locale } = useLanguage();
  
  if (!indicator.historicalData || indicator.historicalData.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-swiss-gray-400 text-sm"
        style={{ height }}
      >
        No historical data available
      </div>
    );
  }

  const data = indicator.historicalData;
  const color =
    indicator.category === "economic"
      ? "#2563EB"
      : indicator.category === "demographic"
      ? "#7C3AED"
      : "#059669";

  const minValue = Math.min(...data.map((d) => d.value));
  const maxValue = Math.max(...data.map((d) => d.value));
  const padding = (maxValue - minValue) * 0.1;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-swiss-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-swiss-gray-900">{label}</p>
          <p className="text-lg font-bold" style={{ color }}>
            {formatWithUnit(payload[0].value, indicator.unit, locale)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (showArea) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${indicator.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#737373", fontSize: 12 }}
          />
          <YAxis
            domain={[minValue - padding, maxValue + padding]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#737373", fontSize: 12 }}
            width={50}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${indicator.id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#737373", fontSize: 12 }}
        />
        <YAxis
          domain={[minValue - padding, maxValue + padding]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#737373", fontSize: 12 }}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
