"use client";

import { Indicator, IndicatorCategory } from "@/types";
import { IndicatorCard } from "./IndicatorCard";
import { TrendChart } from "./TrendChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";
import { TrendingUp, Users, Heart } from "lucide-react";

interface CategorySectionProps {
  category: IndicatorCategory;
  indicators: Indicator[];
}

export function CategorySection({ category, indicators }: CategorySectionProps) {
  const { t } = useLanguage();

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

  const chartIndicator = indicators.find((i) => i.historicalData && i.historicalData.length > 0);

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Category Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`p-2.5 sm:p-3 rounded-lg ${config.bgColor}`}>
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${config.color}`} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-swiss-gray-900">{config.title}</h2>
          <p className="text-xs sm:text-sm text-swiss-gray-500">{config.description}</p>
        </div>
      </div>

      {/* Indicator Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {indicators.map((indicator) => (
          <IndicatorCard key={indicator.id} indicator={indicator} />
        ))}
      </div>

      {/* Trend Chart */}
      {chartIndicator && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              {chartIndicator.name} - {t.category.historicalTrend}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <TrendChart indicator={chartIndicator} height={250} />
          </CardContent>
        </Card>
      )}
    </section>
  );
}
