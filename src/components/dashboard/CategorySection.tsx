"use client";

import Link from "next/link";
import { Indicator, IndicatorCategory } from "@/types";
import { IndicatorCard } from "./IndicatorCard";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { localePath } from "@/i18n/routes";
import { TrendingUp, Users, Heart, ArrowRight } from "lucide-react";

interface CategorySectionProps {
  category: IndicatorCategory;
  indicators: Indicator[];
}

export function CategorySection({ category, indicators }: CategorySectionProps) {
  const { t, locale } = useLanguage();

  const categoryConfig = {
    economic: {
      title: t.category.economicTitle,
      description: t.category.economicDesc,
      icon: TrendingUp,
      color: "text-economic",
      bgColor: "bg-economic-light",
    },
    demographic: {
      title: t.category.demographicTitle,
      description: t.category.demographicDesc,
      icon: Users,
      color: "text-demographic",
      bgColor: "bg-demographic-light",
    },
    social: {
      title: t.category.socialTitle,
      description: t.category.socialDesc,
      icon: Heart,
      color: "text-social",
      bgColor: "bg-social-light",
    },
  };

  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Category Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`p-2.5 sm:p-3 rounded-lg ${config.bgColor}`}>
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${config.color}`} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-swiss-gray-900">{config.title}</h2>
          <p className="text-sm text-swiss-gray-500">{config.description}</p>
        </div>
      </div>

      {/* Indicator Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {indicators.map((indicator) => (
          <IndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>

      {/* Link to Statistics */}
      <div className="flex justify-end">
        <Link href={localePath(locale, "/statistics")} className={buttonVariants({ variant: "outline", size: "default", className: "gap-2 h-11" })}>
          {t.category.viewAllStatistics}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
