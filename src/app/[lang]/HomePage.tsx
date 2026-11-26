"use client";

import Link from "next/link";
import { CategorySection } from "@/components/dashboard/CategorySection";
import { getLocalizedIndicatorsByCategory, indicators } from "@/data/indicators";
import { DATA_CHECKED } from "@/data/meta";
import { useLanguage } from "@/i18n/LanguageContext";
import { localePath } from "@/i18n/routes";
import { formatLongDate } from "@/lib/formatters";

// The nine figures of the home page, three per section
const HOME_INDICATORS = {
  economic: ["unemployment-rate-ilo", "gdp-growth-rate", "federal-debt-gdp"],
  demographic: ["population-total", "median-age", "life-expectancy"],
  social: ["crime-rate-per-1000", "poverty-rate", "healthcare-cost"],
} as const;

export default function HomePage() {
  const { t, locale } = useLanguage();
  const pick = (category: keyof typeof HOME_INDICATORS) =>
    getLocalizedIndicatorsByCategory(category, locale).filter((i) => (HOME_INDICATORS[category] as readonly string[]).includes(i.id));

  return (
    <div className="container mx-auto px-4 pt-6 pb-8 sm:pt-10 sm:pb-12 space-y-8 sm:space-y-12">
      {/* What the site is, who makes it and how current the figures are; the figures follow directly */}
      <section className="max-w-[72ch] space-y-3">
        <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight tracking-[-0.02em] text-ink">{t.home.title}</h1>
        <p className="text-base sm:text-lg text-swiss-gray-600">{t.home.lead}</p>
        <p className="text-sm text-subtle">
          <Link href={localePath(locale, "/about")} className="underline underline-offset-[3px] hover:text-ink">
            {t.home.independent}
          </Link>
          {" · "}
          <span data-last-check="">{t.common.lastCheck.replace("{lastCheck}", formatLongDate(DATA_CHECKED, locale))}</span>
        </p>
      </section>

      <CategorySection category="economic" indicators={pick("economic")} />
      <CategorySection category="demographic" indicators={pick("demographic")} />
      <CategorySection category="social" indicators={pick("social")} />

      <p>
        <Link
          href={localePath(locale, "/statistics")}
          className="inline-flex items-center min-h-[44px] text-base font-medium text-ink underline underline-offset-[3px] hover:text-swiss-gray-600"
        >
          {t.home.allIndicators.replace("{indicatorCount}", String(indicators.length))}
        </Link>
      </p>
    </div>
  );
}
