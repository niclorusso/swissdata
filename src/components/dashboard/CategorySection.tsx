"use client";

import { Indicator, IndicatorCategory } from "@/types";
import { IndicatorCard } from "./IndicatorCard";
import { useLanguage } from "@/i18n/LanguageContext";

/** One section of the home page: its name and three cards. */
export function CategorySection({ category, indicators }: { category: IndicatorCategory; indicators: Indicator[] }) {
  const { t } = useLanguage();
  return (
    <section className="space-y-3 sm:space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-ink">{t.categoryName[category]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {indicators.map((indicator) => (
          <IndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>
    </section>
  );
}
