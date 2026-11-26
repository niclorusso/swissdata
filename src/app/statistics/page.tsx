"use client";

import { useState } from "react";
import { getLocalizedIndicatorsByCategory } from "@/data/indicators";
import { SingleIndicatorChart } from "@/components/statistics/LargeChart";
import { indicatorSources } from "@/data/sources";
import {
  TimeRangeSelector,
  TimeRange,
  getYearRangeFromSelection,
} from "@/components/statistics/TimeRangeSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/tooltip";
import { SourceLine } from "@/components/ui/source-line";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { getIndicatorExplanation } from "@/i18n/indicatorExplanations";
import { localizePeriod } from "@/i18n/periods";
import { formatNumber, formatPercent, percentSign } from "@/lib/formatters";
import { Indicator, IndicatorCategory } from "@/types";
import { TrendingUp, Users, Heart, DollarSign, Calendar } from "lucide-react";

type CategoryFilter = IndicatorCategory | "all";

const CATEGORIES: IndicatorCategory[] = ["economic", "demographic", "social"];
const CHART_COLOR: Record<IndicatorCategory, string> = { economic: "#2563EB", demographic: "#7C3AED", social: "#059669" };
const TEXT_COLOR: Record<IndicatorCategory, string> = { economic: "text-economic", demographic: "text-demographic", social: "text-social" };

export default function StatisticsPage() {
  const { t, locale } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>("20Y");
  // The page opens on the first category (7 charts); the others are one tap away.
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("economic");

  const startYear = getYearRangeFromSelection(timeRange);

  const categoryTabs: { value: CategoryFilter; label: string; icon: typeof TrendingUp }[] = [
    { value: "economic", label: t.statistics.economic, icon: DollarSign },
    { value: "demographic", label: t.statistics.demographic, icon: Users },
    { value: "social", label: t.statistics.social, icon: Heart },
    { value: "all", label: t.statistics.allCategories, icon: TrendingUp },
  ];
  const headings: Record<IndicatorCategory, string> = {
    economic: t.statistics.economicTrends,
    demographic: t.statistics.demographicTrends,
    social: t.statistics.socialTrends,
  };

  // The figure beside the title: the number with its sign for percentages, without the long unit (it is in the description).
  const headline = (indicator: Indicator) =>
    indicator.unit === "%"
      ? formatPercent(indicator.value, locale)
      : indicator.unit.startsWith("%")
      ? formatNumber(indicator.value, locale) + percentSign(locale)
      : formatNumber(indicator.value, locale);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-swiss-gray-900 mb-2">
          {t.statistics.title}
        </h1>
        <p className="text-sm sm:text-base text-swiss-gray-600">
          {t.statistics.subtitle}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-1 rounded-3xl border border-line bg-white p-1 self-start max-w-full" role="group" aria-label={t.statistics.categories}>
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                type="button"
                aria-pressed={categoryFilter === tab.value}
                onClick={() => setCategoryFilter(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
                  categoryFilter === tab.value
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-600 hover:text-swiss-gray-900 hover:bg-swiss-gray-50"
                )}
              >
                <Icon className="hidden sm:block h-4 w-4 shrink-0" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-swiss-gray-500 shrink-0" aria-hidden="true" />
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      {CATEGORIES.filter((category) => categoryFilter === "all" || categoryFilter === category).map((category) => (
        <section key={category} className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-swiss-gray-900 mb-4 sm:mb-6">
            {headings[category]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {getLocalizedIndicatorsByCategory(category, locale).map((indicator) => {
              const explanation = getIndicatorExplanation(indicator.id, locale, "statistics");
              return (
                <Card key={indicator.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <CardTitle className="text-base leading-snug flex items-center gap-2">
                          {indicator.shortName}
                          {explanation && (
                            <InfoTooltip
                              label={`${t.statistics.whatIsIt} ${indicator.shortName}`}
                              content={
                                <div className="space-y-2">
                                  <div>
                                    <p className="font-medium text-swiss-gray-900 mb-1">{t.statistics.whatIsIt}</p>
                                    <p className="text-swiss-gray-600">{explanation.what}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-swiss-gray-900 mb-1">{t.statistics.whyItMatters}</p>
                                    <p className="text-swiss-gray-600">{explanation.why}</p>
                                  </div>
                                </div>
                              }
                            />
                          )}
                        </CardTitle>
                        <p className="text-sm text-swiss-gray-600">{indicator.description}</p>
                      </div>
                      <span className={cn("text-xl sm:text-2xl font-bold swiss-number shrink-0", TEXT_COLOR[category])}>
                        {headline(indicator)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-6">
                    <SingleIndicatorChart indicator={indicator} height={170} startYear={startYear} color={CHART_COLOR[category]} />
                    <SourceLine
                      className="mx-4 sm:mx-0"
                      publisher={indicator.source}
                      url={indicator.sourceUrl}
                      date={localizePeriod(indicator.lastUpdated, locale)}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}

      {/* Data Sources Footer */}
      <section className="border-t border-line pt-6 sm:pt-8 mt-8 sm:mt-12">
        <h2 className="text-lg font-semibold text-swiss-gray-900 mb-4">{t.statistics.dataSources}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {indicatorSources.map((source) => (
            <a key={source.abbr} href={source.url} target="_blank" rel="noopener noreferrer" className="block p-4 bg-swiss-gray-50 rounded-xl hover:bg-swiss-gray-100 transition-colors min-h-[44px]">
              <span className="block font-medium text-swiss-gray-900 text-base">{source.abbr}</span>
              <span className="block text-sm text-swiss-gray-600">{source.name[locale]}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
