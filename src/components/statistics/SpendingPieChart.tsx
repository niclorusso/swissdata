"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useLanguage } from "@/i18n/LanguageContext";

// Federal budget breakdown data (2026)
// Source: Federal Finance Administration
const budgetData = [
  { id: "social-welfare", value: 34.9, color: "#2563EB" },
  { id: "finances-taxes", value: 16.6, color: "#7C3AED" },
  { id: "transport", value: 11.8, color: "#059669" },
  { id: "education-research", value: 9.1, color: "#DC2626" },
  { id: "defense", value: 8.55, color: "#F59E0B" },
  { id: "foreign-affairs", value: 4.21, color: "#6366F1" },
  { id: "agriculture-food", value: 4.1, color: "#10B981" },
  { id: "other", value: 10.7, color: "#94A3B8" },
];

const labels: Record<string, { en: string; it: string; de: string; fr: string }> = {
  "social-welfare": { en: "Social Welfare", it: "Previdenza sociale", de: "Soziale Wohlfahrt", fr: "Protection sociale" },
  "finances-taxes": { en: "Finances & Taxes", it: "Finanze e imposte", de: "Finanzen & Steuern", fr: "Finances et impôts" },
  "transport": { en: "Transport", it: "Trasporti", de: "Verkehr", fr: "Transports" },
  "education-research": { en: "Education & Research", it: "Formazione e ricerca", de: "Bildung & Forschung", fr: "Formation et recherche" },
  "defense": { en: "Defense", it: "Difesa", de: "Verteidigung", fr: "Défense" },
  "agriculture-food": { en: "Agriculture & Food", it: "Agricoltura e alimentazione", de: "Landwirtschaft & Ernährung", fr: "Agriculture et alimentation" },
  "foreign-affairs": { en: "Foreign Affairs", it: "Affari esteri", de: "Auswärtige Angelegenheiten", fr: "Affaires étrangères" },
  "other": { en: "Other", it: "Altro", de: "Andere", fr: "Autres" },
};

const budgetText: Record<string, string> = {
  en: "of federal budget",
  it: "del bilancio federale",
  de: "des Bundeshaushalts",
  fr: "du budget fédéral",
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
        <div className="bg-white border border-swiss-gray-200 rounded-lg shadow-lg p-2 sm:p-3">
          <p className="font-semibold text-swiss-gray-900 text-xs sm:text-sm">{item.name}</p>
          <p className="text-swiss-gray-600 text-xs sm:text-sm">
            <span className="font-bold" style={{ color: item.color }}>
              {item.value}%
            </span>
            {" "}
            {budgetText[locale]}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    if (percent < 0.06) return null; // Don't show labels for small slices (increased threshold for mobile)
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
        className="text-[10px] sm:text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Responsive height calculation
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const chartHeight = isMobile ? 280 : height;
  const outerRadius = isMobile ? 80 : height * 0.35;
  const innerRadius = isMobile ? 35 : height * 0.15;

  return (
    <div className="h-[280px] sm:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius="70%"
            innerRadius="30%"
            dataKey="value"
            paddingAngle={1}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span className="text-[10px] sm:text-xs text-swiss-gray-700">{value}</span>
            )}
            wrapperStyle={{ paddingTop: "10px", fontSize: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
