"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/i18n/LanguageContext";

// Federal budget breakdown data (2026)
// Source: Federal Finance Administration
const budgetData = [
  { id: "social-welfare", value: 31.7, color: "#2563EB" },
  { id: "finances-taxes", value: 15, color: "#7C3AED" },
  { id: "transport", value: 10.8, color: "#059669" },
  { id: "education-research", value: 9, color: "#DC2626" },
  { id: "defense", value: 7.8, color: "#F59E0B" },
  { id: "foreign-affairs", value: 3.8, color: "#6366F1" },
  { id: "agriculture-food", value: 3.7, color: "#10B981" },
  { id: "other", value: 9.1, color: "#94A3B8" },
];

const labels: Record<string, { en: string; it: string }> = {
  "social-welfare": { en: "Social Welfare", it: "Previdenza sociale" },
  "finances-taxes": { en: "Finances & Taxes", it: "Finanze e imposte" },
  "transport": { en: "Transport", it: "Trasporti" },
  "education-research": { en: "Education & Research", it: "Formazione e ricerca" },
  "defense": { en: "Defense", it: "Difesa" },
  "agriculture-food": { en: "Agriculture & Food", it: "Agricoltura e alimentazione" },
  "foreign-affairs": { en: "Foreign Affairs", it: "Affari esteri" },
  "other": { en: "Other", it: "Altro" },
};

interface SpendingPieChartProps {
  height?: number;
}

export function SpendingPieChart({ height = 400 }: SpendingPieChartProps) {
  const { locale } = useLanguage();

  const data = budgetData.map((item) => ({
    ...item,
    name: labels[item.id][locale],
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-swiss-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-semibold text-swiss-gray-900">{item.name}</p>
          <p className="text-swiss-gray-600">
            <span className="font-bold" style={{ color: item.color }}>
              {item.value}%
            </span>
            {" "}
            {locale === "en" ? "of federal budget" : "del bilancio federale"}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    if (percent < 0.05) return null; // Don't show labels for small slices
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={height * 0.35}
            innerRadius={height * 0.15}
            dataKey="value"
            paddingAngle={1}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={10}
            formatter={(value: string) => (
              <span className="text-xs sm:text-sm text-swiss-gray-700">{value}</span>
            )}
            wrapperStyle={{ paddingLeft: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
