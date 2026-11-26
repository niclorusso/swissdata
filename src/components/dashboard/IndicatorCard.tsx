"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/tooltip";
import { SourceLine } from "@/components/ui/source-line";
import { Indicator } from "@/types";
import { formatNumber, formatWithUnit, percentSign } from "@/lib/formatters";
import { useLanguage } from "@/i18n/LanguageContext";
import { getIndicatorExplanation } from "@/i18n/indicatorExplanations";
import { localizePeriod } from "@/i18n/periods";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface IndicatorCardProps {
  indicator: Indicator;
}

export function IndicatorCard({ indicator }: IndicatorCardProps) {
  const { t, locale } = useLanguage();

  const TrendIcon =
    indicator.trend === "up"
      ? TrendingUp
      : indicator.trend === "down"
      ? TrendingDown
      : Minus;

  const explanation = getIndicatorExplanation(indicator.id, locale, "card");

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-1">
          {indicator.shortName}
          {explanation && (
            <InfoTooltip
              label={`${t.indicatorCard.whatIsIt} ${indicator.shortName}`}
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
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main value */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold swiss-number text-swiss-gray-900">
              {formatWithUnit(indicator.value, indicator.unit, locale)}
            </span>
          </div>

          {/* Change against the previous period: direction only, no good/bad colour */}
          {indicator.trendPercentage !== undefined && (
            <div className="flex items-center gap-1 text-sm text-swiss-gray-700">
              <TrendIcon className="h-4 w-4" aria-hidden="true" />
              <span className="font-medium swiss-number">
                {formatNumber(indicator.trendPercentage, locale, { sign: true })}
                {percentSign(locale)}
              </span>
              <span className="text-swiss-gray-500">
                {indicator.previousPeriod
                  ? t.indicatorCard.vsPeriod.replace("{period}", indicator.previousPeriod)
                  : t.indicatorCard.vsLastYear}
              </span>
            </div>
          )}

          {/* Context */}
          {indicator.context && (
            <p className="text-sm text-swiss-gray-600 line-clamp-2">
              {indicator.context}
            </p>
          )}

          <SourceLine
            publisher={indicator.source}
            url={indicator.sourceUrl}
            date={localizePeriod(indicator.lastUpdated, locale)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
