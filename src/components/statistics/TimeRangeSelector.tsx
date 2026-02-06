"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

export type TimeRange = "5Y" | "10Y" | "20Y" | "ALL";

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const rangeValues: TimeRange[] = ["5Y", "10Y", "20Y", "ALL"];

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-lg border border-swiss-gray-200 bg-white p-1">
      {rangeValues.map((value) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={cn(
            "px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap",
            selected === value
              ? "bg-primary text-white"
              : "text-swiss-gray-600 hover:text-swiss-gray-900 hover:bg-swiss-gray-50"
          )}
        >
          {t.timeRange[value]}
        </button>
      ))}
    </div>
  );
}

export function getYearRangeFromSelection(range: TimeRange): number {
  const currentYear = new Date().getFullYear();
  switch (range) {
    case "5Y":
      return currentYear - 5;
    case "10Y":
      return currentYear - 10;
    case "20Y":
      return currentYear - 20;
    case "ALL":
      return 1980; // Start from 1980 for "all time"
  }
}
