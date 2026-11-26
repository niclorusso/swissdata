"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { indicators } from "@/data/indicators";

export type TimeRange = "5Y" | "10Y" | "20Y" | "ALL";

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const rangeValues: TimeRange[] = ["5Y", "10Y", "20Y", "ALL"];

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center self-start rounded-3xl border border-line bg-white p-1 min-w-0" role="group" aria-label={t.statistics.period}>
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

// Latest year with a figure in any series. The ranges count back from it, not from today's date, so that the
// page built on the server and the page in the browser show the same years.
const LATEST_YEAR = Math.max(...indicators.map((i) => i.historicalData?.[i.historicalData.length - 1]?.year ?? 0));

/** First year shown for a range: the last 5, 10 or 20 years with figures, or the whole series. */
export function getYearRangeFromSelection(range: TimeRange): number {
  switch (range) {
    case "5Y":
      return LATEST_YEAR - 4;
    case "10Y":
      return LATEST_YEAR - 9;
    case "20Y":
      return LATEST_YEAR - 19;
    case "ALL":
      return 0;
  }
}
