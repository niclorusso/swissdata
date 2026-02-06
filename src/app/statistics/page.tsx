"use client";

import { useState, useMemo } from "react";
import { indicators, getIndicatorsByCategory, getLocalizedIndicators, getLocalizedIndicatorsByCategory } from "@/data/indicators";
import { LargeChart, SingleIndicatorChart } from "@/components/statistics/LargeChart";
import { SpendingPieChart } from "@/components/statistics/SpendingPieChart";
import {
  TimeRangeSelector,
  TimeRange,
  getYearRangeFromSelection,
} from "@/components/statistics/TimeRangeSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  TrendingUp,
  Users,
  Heart,
  DollarSign,
  ExternalLink,
  Calendar,
  PieChart as PieChartIcon,
} from "lucide-react";

// Educational descriptions for indicators
const indicatorExplanations: Record<string, { what: string; why: string }> = {
  "unemployment-rate": {
    what: "The percentage of the labor force that is jobless and actively seeking employment.",
    why: "A key health indicator of the economy. Low unemployment suggests a strong job market.",
  },
  "gdp-growth": {
    what: "The annual percentage change in Gross Domestic Product - the total value of goods and services produced.",
    why: "Measures overall economic growth. Positive = expanding; negative = recession.",
  },
  "inflation-rate": {
    what: "The rate at which prices increase over time, measured by the Consumer Price Index (CPI).",
    why: "Moderate inflation (1-2%) is normal. High inflation erodes purchasing power.",
  },
  "average-wage": {
    what: "The median gross monthly salary. Median means half earn more, half earn less.",
    why: "Indicates living standards. Compare with cost of living for the full picture.",
  },
  "housing-price-index": {
    what: "An index tracking residential property prices over time (base year = 100).",
    why: "Shows housing affordability trends. Rapid increases may signal a bubble.",
  },
  "public-debt": {
    what: "Total government debt as a percentage of GDP.",
    why: "Lower debt = more flexibility during crises. Switzerland's 'debt brake' keeps this low.",
  },
  "population-total": {
    what: "Total permanent residents living in Switzerland.",
    why: "Affects housing demand, infrastructure needs, and social services planning.",
  },
  "foreign-population": {
    what: "Percentage of permanent residents who are foreign nationals.",
    why: "Reflects immigration patterns. Many are long-term residents.",
  },
  "median-age": {
    what: "The age that divides the population into two equal halves.",
    why: "Rising median age impacts pensions, healthcare costs, and labor supply.",
  },
  "life-expectancy": {
    what: "Average years a person born today can expect to live.",
    why: "Measures population health, healthcare quality, and living conditions.",
  },
  "crime-rate": {
    what: "Reported criminal offenses per 100,000 inhabitants.",
    why: "Measures public safety. Compare trends over time, not absolute numbers.",
  },
  "healthcare-cost": {
    what: "Average monthly health insurance premium for basic coverage.",
    why: "A significant household expense. 26% of residents receive subsidies.",
  },
  "education-spending": {
    what: "Public education expenditure as % of GDP.",
    why: "Shows investment in human capital. Switzerland values both vocational and academic paths.",
  },
  "poverty-rate": {
    what: "Percentage living below the national poverty line.",
    why: "Even wealthy countries have poverty, often among elderly and single parents.",
  },
  "renewable-energy": {
    what: "Percentage of total energy from renewable sources.",
    why: "Progress toward climate goals. Electricity is 76% renewable; heating/transport less so.",
  },
};

type CategoryFilter = "all" | "economic" | "demographic" | "social";

export default function StatisticsPage() {
  const { t, locale } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>("20Y");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const startYear = getYearRangeFromSelection(timeRange);

  const categoryTabs: { value: CategoryFilter; label: string; icon: any }[] = [
    { value: "all", label: t.statistics.allCategories, icon: TrendingUp },
    { value: "economic", label: t.statistics.economic, icon: DollarSign },
    { value: "demographic", label: t.statistics.demographic, icon: Users },
    { value: "social", label: t.statistics.social, icon: Heart },
  ];

  const historicalEvents = [
    { year: 2008, label: t.events.financialCrisis },
    { year: 2015, label: t.events.snbShock },
    { year: 2020, label: t.events.covid },
  ];

  const filteredIndicators = useMemo(() => {
    if (categoryFilter === "all") return getLocalizedIndicators(locale);
    return getLocalizedIndicatorsByCategory(categoryFilter, locale);
  }, [categoryFilter, locale]);

  const economicIndicators = getLocalizedIndicatorsByCategory("economic", locale);
  const demographicIndicators = getLocalizedIndicatorsByCategory("demographic", locale);
  const socialIndicators = getLocalizedIndicatorsByCategory("social", locale);

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
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-swiss-gray-500 shrink-0" />
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-swiss-gray-200 bg-white p-1 overflow-x-auto">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setCategoryFilter(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                  categoryFilter === tab.value
                    ? "bg-swiss-gray-900 text-white"
                    : "text-swiss-gray-600 hover:text-swiss-gray-900 hover:bg-swiss-gray-50"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Section */}
      {(categoryFilter === "all" || categoryFilter === "economic") && (
        <section className="mb-8 sm:mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
                {t.statistics.keyEconomicIndicators}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <LargeChart
                series={[
                  { indicator: economicIndicators[0], color: "#2563EB" },
                  { indicator: economicIndicators[1], color: "#059669" },
                  { indicator: economicIndicators[2], color: "#DC2626" },
                ]}
                height={400}
                startYear={startYear}
                annotations={historicalEvents.filter((e) => e.year >= startYear)}
              />
              <p className="text-xs sm:text-sm text-swiss-gray-500 mt-4">
                {t.statistics.comparingChart}
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Federal Budget Breakdown */}
      {(categoryFilter === "all" || categoryFilter === "economic") && (
        <section className="mb-8 sm:mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <PieChartIcon className="h-5 w-5 text-blue-600" />
                {t.statistics.federalBudget}
              </CardTitle>
              <p className="text-sm text-swiss-gray-500">
                {t.statistics.federalBudgetSubtitle}
              </p>
            </CardHeader>
            <CardContent>
              <SpendingPieChart height={380} />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-swiss-gray-100">
                <span className="text-xs text-swiss-gray-500">{t.statistics.source} Federal Finance Administration (EFV)</span>
                <a 
                  href="https://www.efv.admin.ch/en/expenditure" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  {t.statistics.viewSource}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Economic Indicators Detail */}
      {(categoryFilter === "all" || categoryFilter === "economic") && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-swiss-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            {t.statistics.economicTrends}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {economicIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                        {indicator.shortName}
                        {indicatorExplanations[indicator.id] && (
                          <InfoTooltip
                            content={
                              <div className="space-y-2">
                                <div>
                                  <p className="font-medium text-swiss-gray-900 mb-1">{t.statistics.whatIsIt}</p>
                                  <p className="text-swiss-gray-600">{indicatorExplanations[indicator.id].what}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-swiss-gray-900 mb-1">{t.statistics.whyItMatters}</p>
                                  <p className="text-swiss-gray-600">{indicatorExplanations[indicator.id].why}</p>
                                </div>
                              </div>
                            }
                          />
                        )}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-swiss-gray-500">{indicator.description}</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600 swiss-number shrink-0">
                      {indicator.unit === "people"
                        ? (indicator.value / 1000000).toFixed(1) + "M"
                        : indicator.unit === "CHF"
                        ? `${indicator.value.toLocaleString("de-CH")}`
                        : indicator.unit === "CHF/month"
                        ? `${indicator.value}`
                        : `${indicator.value}${indicator.unit === "%" ? "%" : ""}`}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <SingleIndicatorChart indicator={indicator} height={180} startYear={startYear} color="#2563EB" />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-swiss-gray-100">
                    <span className="text-xs text-swiss-gray-500">{t.statistics.source} {indicator.source}</span>
                    <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      {t.statistics.viewSource}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Demographic Indicators */}
      {(categoryFilter === "all" || categoryFilter === "demographic") && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-swiss-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            {t.statistics.demographicTrends}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {demographicIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base">{indicator.shortName}</CardTitle>
                      <p className="text-xs sm:text-sm text-swiss-gray-500">{indicator.description}</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-purple-600 swiss-number shrink-0">
                      {indicator.unit === "people" ? (indicator.value / 1000000).toFixed(1) + "M" : indicator.unit === "years" ? `${indicator.value}` : `${indicator.value}${indicator.unit === "%" ? "%" : ""}`}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <SingleIndicatorChart indicator={indicator} height={180} startYear={startYear} color="#7C3AED" />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-swiss-gray-100">
                    <span className="text-xs text-swiss-gray-500">{t.statistics.source} {indicator.source}</span>
                    <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                      {t.statistics.viewSource}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Social Indicators */}
      {(categoryFilter === "all" || categoryFilter === "social") && (
        <section className="mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-swiss-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            {t.statistics.socialTrends}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {socialIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <CardTitle className="text-sm sm:text-base">{indicator.shortName}</CardTitle>
                      <p className="text-xs sm:text-sm text-swiss-gray-500">{indicator.description}</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-green-600 swiss-number shrink-0">
                      {indicator.unit === "CHF/month" ? `${indicator.value}` : indicator.unit === "per 100k" ? indicator.value.toLocaleString("de-CH") : `${indicator.value}${indicator.unit === "%" ? "%" : ""}`}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                  <SingleIndicatorChart indicator={indicator} height={180} startYear={startYear} color="#059669" />
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-swiss-gray-100">
                    <span className="text-xs text-swiss-gray-500">{t.statistics.source} {indicator.source}</span>
                    <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline flex items-center gap-1">
                      {t.statistics.viewSource}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Data Sources Footer */}
      <section className="border-t border-swiss-gray-200 pt-6 sm:pt-8 mt-8 sm:mt-12">
        <h3 className="text-lg font-semibold text-swiss-gray-900 mb-4">{t.statistics.dataSources}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: "BFS", url: "https://www.bfs.admin.ch", desc: t.statistics.sourceBFS },
            { name: "SECO", url: "https://www.seco.admin.ch", desc: t.statistics.sourceSECO },
            { name: "BAG", url: "https://www.bag.admin.ch", desc: t.statistics.sourceBAG },
            { name: "OpenData.swiss", url: "https://opendata.swiss", desc: t.statistics.sourceOpenData },
          ].map((source) => (
            <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 bg-swiss-gray-50 rounded-lg hover:bg-swiss-gray-100 transition-colors">
              <p className="font-medium text-swiss-gray-900 text-sm sm:text-base">{source.name}</p>
              <p className="text-xs sm:text-sm text-swiss-gray-500">{source.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
