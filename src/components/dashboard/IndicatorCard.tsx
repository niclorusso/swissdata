"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/tooltip";
import { Indicator } from "@/types";
import { formatWithUnit, getTrendDisplay } from "@/lib/formatters";
import { useLanguage } from "@/i18n/LanguageContext";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

// Educational descriptions for each indicator type
const indicatorExplanations: Record<string, { what: string; why: string }> = {
  "unemployment-rate": {
    what: "The percentage of the labor force that is jobless and actively seeking employment.",
    why: "A key health indicator of the economy. Low unemployment suggests a strong job market, while high rates may indicate economic problems.",
  },
  "gdp-growth": {
    what: "The annual percentage change in Gross Domestic Product (GDP) - the total value of goods and services produced.",
    why: "Measures overall economic growth. Positive growth means the economy is expanding; negative growth (recession) means it's contracting.",
  },
  "inflation-rate": {
    what: "The rate at which prices for goods and services increase over time, measured by the Consumer Price Index (CPI).",
    why: "Moderate inflation (1-2%) is normal. High inflation erodes purchasing power; deflation (negative) can signal economic problems.",
  },
  "average-wage": {
    what: "The median gross monthly salary across all sectors. Median means half earn more, half earn less.",
    why: "Indicates living standards and economic prosperity. Compare with cost of living for a full picture.",
  },
  "housing-price-index": {
    what: "An index tracking changes in residential property prices over time (base year = 100).",
    why: "Shows whether housing is becoming more or less affordable. Rapid increases may indicate a housing bubble.",
  },
  "public-debt": {
    what: "Total government debt as a percentage of GDP.",
    why: "Lower debt gives governments more flexibility during crises. Switzerland's 'debt brake' keeps this among the lowest globally.",
  },
  "population-total": {
    what: "The total number of permanent residents living in Switzerland.",
    why: "Fundamental demographic measure. Growth affects housing demand, infrastructure needs, and social services planning.",
  },
  "foreign-population": {
    what: "Percentage of permanent residents who are foreign nationals (not Swiss citizens).",
    why: "Reflects immigration patterns. Note: many are long-term residents; this doesn't include naturalized citizens.",
  },
  "median-age": {
    what: "The age that divides the population into two equal halves - half are younger, half are older.",
    why: "Shows population aging trends. A rising median age has implications for pensions, healthcare costs, and labor supply.",
  },
  "life-expectancy": {
    what: "The average number of years a person born today can expect to live.",
    why: "A comprehensive measure of population health, healthcare quality, and living conditions.",
  },
  "crime-rate": {
    what: "Number of reported criminal offenses per 100,000 inhabitants.",
    why: "Measures public safety. Note: reporting rates vary, so compare trends over time rather than absolute numbers.",
  },
  "healthcare-cost": {
    what: "Average monthly health insurance premium for basic mandatory coverage.",
    why: "A significant household expense in Switzerland. Subsidies are available for lower-income residents (26% of population).",
  },
  "education-spending": {
    what: "Public expenditure on education as a percentage of GDP.",
    why: "Shows government investment in human capital. Switzerland's dual education system (vocational + academic) is highly valued.",
  },
  "poverty-rate": {
    what: "Percentage of the population living below the national poverty line.",
    why: "Indicates economic inequality and social welfare effectiveness. Even wealthy countries have poverty, often among elderly and single parents.",
  },
  "renewable-energy": {
    what: "Percentage of total energy consumption from renewable sources (hydro, solar, wind, biomass).",
    why: "Indicates progress toward climate goals. Note: electricity is 76% renewable, but heating/transport still rely on fossil fuels.",
  },
};

interface IndicatorCardProps {
  indicator: Indicator;
}

export function IndicatorCard({ indicator }: IndicatorCardProps) {
  const { t } = useLanguage();

  const { color } = getTrendDisplay(
    indicator.trend,
    indicator.id !== "crime-rate" && indicator.id !== "inflation-rate"
  );

  const TrendIcon =
    indicator.trend === "up"
      ? TrendingUp
      : indicator.trend === "down"
      ? TrendingDown
      : Minus;

  const categoryVariant =
    indicator.category === "economic"
      ? "economic"
      : indicator.category === "demographic"
      ? "demographic"
      : "social";

  const explanation = indicatorExplanations[indicator.id];

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Badge variant={categoryVariant} className="mb-2">
              {indicator.category}
            </Badge>
            <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
              {indicator.shortName}
              {explanation && (
                <InfoTooltip
                  content={
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium text-swiss-gray-900 mb-1">{t.indicatorCard.whatIsIt}</p>
                        <p className="text-swiss-gray-600">{explanation.what}</p>
                      </div>
                      <div>
                        <p className="font-medium text-swiss-gray-900 mb-1">{t.indicatorCard.whyItMatters}</p>
                        <p className="text-swiss-gray-600">{explanation.why}</p>
                      </div>
                    </div>
                  }
                />
              )}
            </CardTitle>
          </div>
          <a
            href={indicator.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-swiss-gray-400 hover:text-swiss-gray-600 transition-colors"
            title={`Source: ${indicator.source}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main value */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold swiss-number text-swiss-gray-900">
              {formatWithUnit(indicator.value, indicator.unit)}
            </span>
          </div>

          {/* Trend */}
          {indicator.trendPercentage !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${color}`}>
              <TrendIcon className="h-4 w-4" />
              <span className="font-medium">
                {indicator.trendPercentage > 0 ? "+" : ""}
                {indicator.trendPercentage}%
              </span>
              <span className="text-swiss-gray-500">{t.indicatorCard.vsLastYear}</span>
            </div>
          )}

          {/* Context */}
          {indicator.context && (
            <p className="text-xs sm:text-sm text-swiss-gray-600 line-clamp-2">
              {indicator.context}
            </p>
          )}

          {/* Source and date */}
          <div className="flex items-center justify-between text-xs text-swiss-gray-400 pt-2 border-t border-swiss-gray-100">
            <span>{indicator.source}</span>
            <span>{indicator.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
