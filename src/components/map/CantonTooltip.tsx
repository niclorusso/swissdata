"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Canton } from "@/types";
import { formatNumber, formatWithUnit, getTranslatedUnit, NBSP } from "@/lib/formatters";
import { cantonName } from "@/lib/utils";
import { cantonIndicatorMeta } from "@/data/cantons";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Users, Ruler, X } from "lucide-react";

interface CantonTooltipProps {
  canton: Canton;
  onClose: () => void;
}

export function CantonTooltip({ canton, onClose }: CantonTooltipProps) {
  const { t, locale } = useLanguage();

  // Labels of the canton indicators (ids, units and Swiss figures come from src/data/cantons.ts)
  const indicatorNames: Record<string, string> = {
    "unemployment-rate": t.cantons.unemployment,
    "foreign-population": t.cantons.foreignPopulation,
    "health-premium": t.cantons.healthPremium,
    "gdp-per-capita": t.cantons.gdpPerCapita,
    "average-rent": t.cantons.averageRent,
    "crime-rate-per-1000": t.cantons.crimeRate,
  };

  const decimalsOf = (unit: string) => (unit === "CHF" || unit === "CHF/month" ? 0 : 1);
  const formatIndicatorValue = (unit: string, value: number) =>
    formatWithUnit(value, unit === "per 1,000 inhabitants" ? "count" : unit, locale, { decimals: decimalsOf(unit) });

  // Difference to the Swiss figure of the same table and year
  const formatDiff = (unit: string, diff: number) => formatNumber(diff, locale, { decimals: decimalsOf(unit), sign: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Badge variant="outline" className="text-base sm:text-lg font-bold px-2.5 sm:px-3 py-1">
                {canton.abbreviation}
              </Badge>
              <div>
                <CardTitle className="text-lg sm:text-xl">{cantonName(canton, locale)}</CardTitle>
                <p className="text-sm text-swiss-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {canton.capital}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.cantonTooltip.close}
              className="inline-flex items-center justify-center w-11 h-11 -mt-2 -mr-2 hover:bg-swiss-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-swiss-gray-600" aria-hidden="true" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-swiss-gray-400" />
              <div>
                <p className="text-swiss-gray-500">{t.cantonTooltip.population}</p>
                <p className="font-semibold swiss-number">
                  {formatNumber(canton.population, locale)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Ruler className="h-4 w-4 text-swiss-gray-400" />
              <div>
                <p className="text-swiss-gray-500">{t.cantonTooltip.area}</p>
                <p className="font-semibold swiss-number">
                  {formatNumber(canton.area, locale)}{NBSP}km²
                </p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="space-y-3 pt-3 border-t border-swiss-gray-100">
            <p className="text-sm font-semibold text-swiss-gray-700">
              {t.cantonTooltip.keyIndicators}
            </p>
            {canton.indicators.map((cantonInd) => {
              const indicator = cantonIndicatorMeta.find(
                (m) => m.id === cantonInd.indicatorId
              );
              if (!indicator) return null;

              const cantonValue = cantonInd.value;
              const diff = cantonValue - indicator.national;

              return (
                <div
                  key={cantonInd.indicatorId}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-swiss-gray-700">
                    {indicatorNames[indicator.id] ?? indicator.id}{" "}
                    <span className="text-swiss-gray-500">{indicator.year}</span>
                  </span>
                  <div className="text-right">
                    <span className="font-semibold swiss-number text-sm">
                      {formatIndicatorValue(indicator.unit, cantonValue)}
                    </span>
                    <span className="block text-sm text-swiss-gray-600 swiss-number">
                      {formatDiff(indicator.unit, diff)} {t.cantonTooltip.vsCH}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Population density */}
          <div className="pt-3 border-t border-swiss-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-swiss-gray-500">{t.cantonTooltip.populationDensity}</span>
              <span className="font-semibold swiss-number">
                {formatNumber(Math.round(canton.population / canton.area), locale)}{NBSP}
                {getTranslatedUnit("per km²", locale)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
