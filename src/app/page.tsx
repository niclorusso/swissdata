"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CategorySection } from "@/components/dashboard/CategorySection";
import { indicators, getLocalizedIndicatorsByCategory } from "@/data/indicators";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, HelpCircle, Map, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const { t, locale } = useLanguage();
  const economicIndicators = getLocalizedIndicatorsByCategory("economic", locale);
  const demographicIndicators = getLocalizedIndicatorsByCategory("demographic", locale);
  const socialIndicators = getLocalizedIndicatorsByCategory("social", locale);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 bg-accent/50 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {t.home.badge}
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-swiss-gray-900 max-w-3xl mx-auto leading-tight">
          {t.home.title}{" "}
          <span className="text-primary">{t.home.titleHighlight}</span>
        </h1>
        <p className="text-base sm:text-lg text-swiss-gray-600 max-w-2xl mx-auto">
          {t.home.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
          <Link href="/quiz">
            <Button size="xl" className="gap-2 w-full sm:w-auto">
              <HelpCircle className="h-5 w-5" />
              {t.home.testKnowledge}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cantons">
            <Button size="xl" variant="outline" className="gap-2 w-full sm:w-auto">
              <Map className="h-5 w-5" />
              {t.home.exploreByCanton}
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: t.home.indicatorsTracked, value: indicators.length.toString() },
          { label: t.home.officialSources, value: "7" },
          { label: t.home.cantonsCovered, value: "26" },
          { label: t.home.questionsInQuiz, value: "50+" },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-4 sm:pt-6 pb-4">
              <div className="text-2xl sm:text-3xl font-bold text-swiss-gray-900">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-swiss-gray-500">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Economic Indicators */}
      <CategorySection category="economic" indicators={economicIndicators} />

      {/* Demographic Indicators */}
      <CategorySection category="demographic" indicators={demographicIndicators} />

      {/* Social Indicators */}
      <CategorySection category="social" indicators={socialIndicators} />

      {/* CTA Section */}
      <section className="bg-swiss-gray-50 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-swiss-gray-900 mb-4">
          {t.home.ctaTitle}
        </h2>
        <p className="text-sm sm:text-base text-swiss-gray-600 mb-6 max-w-xl mx-auto">
          {t.home.ctaText}
        </p>
        <Link href="/quiz">
          <Button size="lg" className="gap-2">
            {t.home.startQuiz}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Data Sources */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-swiss-gray-900">{t.home.ourSources}</h3>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {[
            { name: "BFS", url: "https://www.bfs.admin.ch", desc: t.home.sourceBFS },
            { name: "SECO", url: "https://www.seco.admin.ch", desc: t.home.sourceSECO },
            { name: "BAG", url: "https://www.bag.admin.ch", desc: t.home.sourceBAG },
            { name: "OpenData", url: "https://opendata.swiss", desc: t.home.sourceOpenData },
          ].map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 sm:px-4 py-3 bg-white border border-swiss-gray-200 rounded-lg hover:border-primary/50 hover:shadow-sm transition-all flex-1 min-w-[140px] sm:min-w-[200px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-swiss-gray-100 rounded flex items-center justify-center font-bold text-swiss-gray-700 text-sm shrink-0">
                {source.name.slice(0, 2)}
              </div>
              <div className="text-left min-w-0">
                <div className="font-medium text-swiss-gray-900 text-sm sm:text-base">{source.name}</div>
                <div className="text-xs text-swiss-gray-500 truncate">{source.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
