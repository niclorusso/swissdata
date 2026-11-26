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
    <div className="flex flex-wrap items-center rounded-3xl border border-line bg-white p-1 min-w-0" role="group" aria-label={t.statistics.period}>
      {rangeValues.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={selected === value}
          onClick={() => onChange(value)}
          className={cn(
            "px-3 max-[359px]:px-2 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
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
