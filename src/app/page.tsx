"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { CategorySection } from "@/components/dashboard/CategorySection";
import { getLocalizedIndicatorsByCategory } from "@/data/indicators";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, HelpCircle, Map, BarChart3 } from "lucide-react";
import { indicatorSources } from "@/data/sources";

export default function HomePage() {
  const { t, locale } = useLanguage();

  // Filter to show only key indicators on dashboard
  const economicIndicators = getLocalizedIndicatorsByCategory("economic", locale)
    .filter(i => ["gdp-growth-rate", "unemployment-rate-ilo", "federal-debt-gdp"].includes(i.id));
  const demographicIndicators = getLocalizedIndicatorsByCategory("demographic", locale)
    .filter(i => ["population-total", "median-age", "life-expectancy"].includes(i.id));
  const socialIndicators = getLocalizedIndicatorsByCategory("social", locale)
    .filter(i => ["crime-rate-per-1000", "poverty-rate", "healthcare-cost"].includes(i.id));

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
      {/* Title and the three ways into the site; the figures follow directly */}
      <section className="text-center pt-4 pb-2 sm:pt-8 space-y-4 sm:space-y-6">
        <h1 className="text-[2rem] sm:text-4xl md:text-5xl font-bold text-swiss-gray-900 max-w-3xl mx-auto leading-tight">
          {t.home.title}{" "}
          <span className="text-primary">{t.home.titleHighlight}</span>
        </h1>
        <p className="text-base sm:text-lg text-swiss-gray-600 max-w-2xl mx-auto">
          {t.home.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
          <Link href="/quiz" className={buttonVariants({ size: "xl", className: "gap-2 w-full sm:w-auto" })}>
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
            {t.home.testKnowledge}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link href="/statistics" className={buttonVariants({ size: "xl", variant: "outline", className: "gap-2 w-full sm:w-auto" })}>
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
            {t.home.showStats}
          </Link>
          <Link href="/cantons" className={buttonVariants({ size: "xl", variant: "outline", className: "gap-2 w-full sm:w-auto" })}>
            <Map className="h-5 w-5" aria-hidden="true" />
            {t.home.exploreByCanton}
          </Link>
        </div>
      </section>

      {/* Economic Indicators */}
      <CategorySection category="economic" indicators={economicIndicators} />

      {/* Demographic Indicators */}
      <CategorySection category="demographic" indicators={demographicIndicators} />

      {/* Social Indicators */}
      <CategorySection category="social" indicators={socialIndicators} />

      {/* Data Sources */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-swiss-gray-900">{t.home.ourSources}</h2>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {indicatorSources.map((source) => (
            <a
              key={source.abbr}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 bg-white border border-line rounded-xl hover:border-swiss-gray-400 transition-colors flex-1 min-w-[240px] min-h-[44px]"
            >
              <span className="text-left min-w-0">
                <span className="block font-medium text-swiss-gray-900 text-base">{source.abbr}</span>
                <span className="block text-sm text-swiss-gray-600">{source.name[locale]}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
