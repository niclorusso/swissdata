"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Canton } from "@/types";
import { formatSwissNumber, formatPercentage } from "@/lib/formatters";
import { cantonIndicatorMeta } from "@/data/cantons";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Users, Ruler, X } from "lucide-react";

interface CantonTooltipProps {
  canton: Canton;
  onClose: () => void;
}

export function CantonTooltip({ canton, onClose }: CantonTooltipProps) {
  const { t } = useLanguage();

  // Labels of the canton indicators (ids, units and Swiss figures come from src/data/cantons.ts)
  const indicatorNames: Record<string, string> = {
    "unemployment-rate": t.cantons.unemployment,
    "foreign-population": t.cantons.foreignPopulation,
    "health-premium": t.cantons.healthPremium,
    "gdp-per-capita": t.cantons.gdpPerCapita,
    "average-rent": t.cantons.averageRent,
    "crime-rate-per-1000": t.cantons.crimeRate,
  };

  const formatIndicatorValue = (unit: string, value: number) => {
    switch (unit) {
      case "%":
        return formatPercentage(value);
      case "CHF/month":
        return `CHF ${formatSwissNumber(Math.round(value))}/mo`;
      case "CHF":
        return `CHF ${formatSwissNumber(Math.round(value))}`;
      default:
        return formatSwissNumber(value, { decimals: 1 });
    }
  };

  // Difference to the Swiss figure of the same table and year
  const formatDiff = (unit: string, diff: number) =>
    unit === "CHF" || unit === "CHF/month"
      ? formatSwissNumber(Math.round(diff))
      : diff.toFixed(1);

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
                <CardTitle className="text-lg sm:text-xl">{canton.name}</CardTitle>
                <p className="text-xs sm:text-sm text-swiss-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {canton.capital}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-swiss-gray-100 rounded transition-colors"
            >
              <X className="h-5 w-5 text-swiss-gray-400" />
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
                  {formatSwissNumber(canton.population)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Ruler className="h-4 w-4 text-swiss-gray-400" />
              <div>
                <p className="text-swiss-gray-500">{t.cantonTooltip.area}</p>
                <p className="font-semibold swiss-number">
                  {formatSwissNumber(canton.area)} km²
                </p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="space-y-3 pt-3 border-t border-swiss-gray-100">
            <p className="text-xs font-medium text-swiss-gray-500 uppercase tracking-wide">
              {t.cantonTooltip.keyIndicators}
            </p>
            {canton.indicators.map((cantonInd) => {
              const indicator = cantonIndicatorMeta.find(
                (m) => m.id === cantonInd.indicatorId
              );
              if (!indicator) return null;

              const cantonValue = cantonInd.value;
              const diff = cantonValue - indicator.national;
              const isHigher = diff > 0;

              return (
                <div
                  key={cantonInd.indicatorId}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs sm:text-sm text-swiss-gray-700">
                    {indicatorNames[indicator.id] ?? indicator.id}{" "}
                    <span className="text-swiss-gray-400">{indicator.year}</span>
                  </span>
                  <div className="text-right">
                    <span className="font-semibold swiss-number text-sm">
                      {formatIndicatorValue(indicator.unit, cantonValue)}
                    </span>
                    <span className="text-xs ml-2 text-swiss-gray-500">
                      {isHigher ? "+" : ""}
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
                {formatSwissNumber(Math.round(canton.population / canton.area))}{" "}
                per km²
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
