"use client";

import { useEffect, useState } from "react";
import { getLocalizedIndicatorsByCategory, indicators } from "@/data/indicators";
import { SingleIndicatorChart, valueAxis } from "@/components/statistics/LargeChart";
import {
  TimeRangeSelector,
  TimeRange,
  getYearRangeFromSelection,
} from "@/components/statistics/TimeRangeSelector";
import { Card } from "@/components/ui/card";
import { MoreInfoButton, MoreInfoPanel, useMoreInfo } from "@/components/ui/tooltip";
import { SourceLine } from "@/components/ui/source-line";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { localizePeriod } from "@/i18n/periods";
import { localizeSource } from "@/i18n/sourceNames";
import { formatYear } from "@/lib/formatters";
import { formatIndicatorValue, howToReadText, publishedText, relatedText, unitLine } from "@/lib/indicatorText";
import { Indicator, IndicatorCategory } from "@/types";

type CategoryFilter = IndicatorCategory | "all";

const CATEGORIES: IndicatorCategory[] = ["economic", "demographic", "social"];
const CHART_COLOR: Record<IndicatorCategory, string> = { economic: "#2563EB", demographic: "#7C3AED", social: "#059669" };

/**
 * One indicator: title and "?" with the value, unit line and years shown, definition, chart, notes (axis,
 * how to read), the other official measure, source. The "?" panel holds the context.
 */
function ChartCard({ indicator, startYear }: { indicator: Indicator; startYear: number }) {
  const { t, locale } = useLanguage();
  const info = useMoreInfo();
  const shown = (indicator.historicalData ?? []).filter((d) => d.year >= startYear);
  const axis = shown.length ? valueAxis(indicator, shown.map((d) => d.value)) : null;
  const howToRead = howToReadText(indicator, locale);
  const related = relatedText(indicator, locale);
  const years = shown.length ? `${formatYear(shown[0].year)}–${formatYear(shown[shown.length - 1].year)}` : "";

  return (
    <Card id={indicator.id} data-indicator={indicator.id} className="flex flex-col p-4 sm:p-5 scroll-mt-4">
      {/* the value goes under the title when the two do not fit on one line ("61,3 per 1000 abitanti") */}
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <div className="flex items-start gap-1 min-w-[11rem] flex-1">
          <h3 className="text-base font-semibold leading-snug text-ink">{indicator.shortName}</h3>
          <MoreInfoButton info={info} label={t.indicatorCard.more.replace("{title}", indicator.shortName)} className="-ml-1.5 mr-0" />
        </div>
        <span data-value="" className="ml-auto text-xl sm:text-2xl font-bold swiss-number text-ink text-right">
          {formatIndicatorValue(indicator, locale)}
        </span>
      </div>
      <p data-unit-line="" className="mt-1 text-sm text-swiss-gray-600">
        {unitLine(indicator, locale)}
        {years && (
          <>
            {" · "}
            <span className="whitespace-nowrap">{years}</span>
          </>
        )}
      </p>
      <p data-definition="" className="mt-2 text-sm leading-relaxed text-swiss-gray-700">
        {indicator.description}
      </p>
      <MoreInfoPanel info={info} className="mt-3">
        {indicator.acronym && <p>{indicator.acronym}</p>}
        {indicator.context && <p>{indicator.context}</p>}
      </MoreInfoPanel>

      <div className="mt-3 -mx-2 sm:mx-0">
        <SingleIndicatorChart indicator={indicator} height={180} startYear={startYear} color={CHART_COLOR[indicator.category]} />
      </div>

      {(axis?.notFromZero || howToRead) && (
        <div className="mt-1 space-y-0.5 text-source text-swiss-gray-600">
          {axis?.notFromZero && <p data-axis-note="">{t.common.axisNotZero}</p>}
          {howToRead && <p>{howToRead}</p>}
        </div>
      )}
      {related && <p data-related="" className="mt-2 text-sm leading-relaxed text-swiss-gray-700">{related}</p>}

      <div className="mt-auto">
        <SourceLine
          publisher={localizeSource(indicator.source, locale)}
          url={indicator.sourceUrl}
          date={localizePeriod(indicator.lastUpdated, locale)}
          published={publishedText(indicator, locale)}
        />
      </div>
    </Card>
  );
}

export default function StatisticsPage() {
  const { t, locale } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>("20Y");
  // The page opens on the first category; the others are one tap away.
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("economic");
  const [scrollTo, setScrollTo] = useState<string | null>(null);

  // A link from a home card ("#unemployment-rate-ilo") opens the category of that indicator, shows the whole
  // series (the link says "Chart since {first year}") and scrolls to its chart.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const indicator = indicators.find((i) => i.id === id);
      if (!indicator) return;
      setCategoryFilter(indicator.category);
      setTimeRange("ALL");
      setScrollTo(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (!scrollTo) return;
    document.getElementById(scrollTo)?.scrollIntoView({ block: "start" });
    setScrollTo(null);
  }, [scrollTo]);

  const startYear = getYearRangeFromSelection(timeRange);

  const categoryTabs: { value: CategoryFilter; label: string }[] = [
    { value: "economic", label: t.categoryName.economic },
    { value: "demographic", label: t.categoryName.demographic },
    { value: "social", label: t.categoryName.social },
    { value: "all", label: t.statistics.all },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 max-w-[72ch]">
        <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight text-ink mb-2">{t.statistics.title}</h1>
        <p className="text-base sm:text-lg text-swiss-gray-600">{t.statistics.subtitle}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-1 rounded-3xl border border-line bg-white p-1 self-start max-w-full" role="group" aria-label={t.statistics.categories}>
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={categoryFilter === tab.value}
              onClick={() => setCategoryFilter(tab.value)}
              className={cn(
                "px-2 sm:px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
                categoryFilter === tab.value
                  ? "bg-swiss-gray-900 text-white"
                  : "text-swiss-gray-600 hover:text-swiss-gray-900 hover:bg-swiss-gray-50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
      </div>

      {CATEGORIES.filter((category) => categoryFilter === "all" || categoryFilter === category).map((category) => (
        <section key={category} className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 sm:mb-4">{t.categoryName[category]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {getLocalizedIndicatorsByCategory(category, locale).map((indicator) => (
              <ChartCard key={indicator.id} indicator={indicator} startYear={startYear} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
