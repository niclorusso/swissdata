"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Canton } from "@/types";
import { formatNumber, getTranslatedUnit, NBSP } from "@/lib/formatters";
import { formatCantonValue } from "@/lib/cantonValues";
import { cantonName } from "@/lib/utils";
import { cantonIndicatorMeta } from "@/data/cantons";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Users, Ruler, X } from "lucide-react";

interface CantonTooltipProps {
  canton: Canton;
  onClose: () => void;
}

/** All figures of one canton, each with its unit, its year and the figure for Switzerland. */
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
    >
      <Card className="w-full p-5" data-canton-card={canton.id}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Badge variant="outline" className="text-base sm:text-lg font-bold px-2.5 sm:px-3 py-1">
              {canton.abbreviation}
            </Badge>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-ink">{cantonName(canton, locale)}</h2>
              <p className="text-sm text-swiss-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" aria-hidden="true" />
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

        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-swiss-gray-400" aria-hidden="true" />
            <div>
              <p className="text-swiss-gray-600">{t.cantonTooltip.population}</p>
              <p className="font-semibold swiss-number">{formatNumber(canton.population, locale)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Ruler className="h-4 w-4 text-swiss-gray-400" aria-hidden="true" />
            <div>
              <p className="text-swiss-gray-600">{t.cantonTooltip.area}</p>
              <p className="font-semibold swiss-number">
                {formatNumber(canton.area, locale)}{NBSP}km²
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-4 space-y-3 pt-3 border-t border-swiss-gray-100">
          {canton.indicators.map((cantonInd) => {
            const indicator = cantonIndicatorMeta.find((m) => m.id === cantonInd.indicatorId);
            if (!indicator) return null;
            return (
              <li key={cantonInd.indicatorId} className="flex items-start justify-between gap-3">
                <span className="text-sm text-swiss-gray-700">
                  {indicatorNames[indicator.id] ?? indicator.id}{" "}
                  <span className="text-swiss-gray-600">{indicator.year}</span>
                </span>
                <span className="text-right">
                  <span className="block font-semibold swiss-number text-sm text-ink">
                    {formatCantonValue(cantonInd.value, indicator.unit, locale)}
                  </span>
                  <span className="block text-sm text-swiss-gray-600 swiss-number">
                    {t.cantonTooltip.nationalValue.replace("{value}", formatCantonValue(indicator.national, indicator.unit, locale))}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 pt-3 border-t border-swiss-gray-100 flex items-center justify-between text-sm">
          <span className="text-swiss-gray-600">{t.cantonTooltip.populationDensity}</span>
          <span className="font-semibold swiss-number">
            {formatNumber(Math.round(canton.population / canton.area), locale)}{NBSP}
            {getTranslatedUnit("per km²", locale)}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
