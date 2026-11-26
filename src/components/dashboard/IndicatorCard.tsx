"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/tooltip";
import { Indicator } from "@/types";
import { formatWithUnit, getTrendDisplay } from "@/lib/formatters";
import { useLanguage } from "@/i18n/LanguageContext";
import { indicatorExplanations } from "@/i18n/indicatorExplanations";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

interface IndicatorCardProps {
  indicator: Indicator;
}

export function IndicatorCard({ indicator }: IndicatorCardProps) {
  const { t, locale } = useLanguage();

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

  const explanationData = indicatorExplanations[indicator.id];
  const explanation = explanationData ? explanationData[locale] : null;

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Badge variant={categoryVariant} className="mb-2">
              {indicator.category}
            </Badge>
            <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-1">
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
              {formatWithUnit(indicator.value, indicator.unit, locale)}
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
