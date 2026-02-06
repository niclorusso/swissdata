"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SwitzerlandMap } from "@/components/map/SwitzerlandMap";
import { CantonTooltip } from "@/components/map/CantonTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cantons, getCantonById } from "@/data/cantons";
import { indicators, getLocalizedIndicators } from "@/data/indicators";
import { Canton } from "@/types";
import { formatSwissNumber, formatPercentage } from "@/lib/formatters";
import { useLanguage } from "@/i18n/LanguageContext";
import { Map, TrendingUp, Users, Heart, ArrowUpDown, Info } from "lucide-react";

type SortKey = "name" | "population" | "area" | "density";
type SortDirection = "asc" | "desc";

export default function CantonsPage() {
  const { t, locale } = useLanguage();
  const localizedIndicatorList = getLocalizedIndicators(locale);
  const [selectedCantonId, setSelectedCantonId] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string>("unemployment-rate");
  const [sortKey, setSortKey] = useState<SortKey>("population");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const cantonIndicators = [
    { id: "unemployment-rate", name: t.cantons.unemployment, unit: "%" },
    { id: "foreign-population", name: t.cantons.foreignPopulation, unit: "%" },
    { id: "healthcare-cost", name: t.cantons.healthcareCost, unit: "CHF/month" },
    { id: "gdp-per-capita", name: t.cantons.gdpPerCapita, unit: "CHF" },
    { id: "average-rent", name: t.cantons.averageRent, unit: "CHF/month" },
    { id: "crime-rate", name: t.cantons.crimeRate, unit: "per 100k" },
  ];

  const selectedCanton = selectedCantonId ? getCantonById(selectedCantonId) : null;
  const selectedIndicatorMeta = cantonIndicators.find((i) => i.id === selectedIndicator);
  const selectedIndicatorData = localizedIndicatorList.find((i) => i.id === selectedIndicator);

  const getIndicatorCategory = (indicatorId: string) => {
    const mainIndicator = indicators.find((i) => i.id === indicatorId);
    if (mainIndicator) return mainIndicator.category;
    if (indicatorId === "gdp-per-capita" || indicatorId === "average-rent") return "economic";
    if (indicatorId === "foreign-population") return "demographic";
    if (indicatorId === "crime-rate" || indicatorId === "healthcare-cost") return "social";
    return "economic";
  };

  const getCantonColor = (canton: Canton) => {
    const cantonIndicator = canton.indicators.find((i) => i.indicatorId === selectedIndicator);
    if (!cantonIndicator) return "#E5E5E5";
    const allValues = cantons.map((c) => c.indicators.find((i) => i.indicatorId === selectedIndicator)?.value).filter((v): v is number => v !== undefined);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const normalized = (cantonIndicator.value - min) / (max - min);
    if (selectedCantonId === canton.id) return "#DC2626";
    const category = getIndicatorCategory(selectedIndicator);
    const hue = category === "economic" ? 220 : category === "demographic" ? 270 : 160;
    return `hsl(${hue}, 60%, ${90 - normalized * 40}%)`;
  };

  const sortedCantons = [...cantons].sort((a, b) => {
    let aVal: number, bVal: number;
    switch (sortKey) {
      case "name": return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      case "population": aVal = a.population; bVal = b.population; break;
      case "area": aVal = a.area; bVal = b.area; break;
      case "density": aVal = a.population / a.area; bVal = b.population / b.area; break;
      default: return 0;
    }
    return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) { setSortDirection(sortDirection === "asc" ? "desc" : "asc"); }
    else { setSortKey(key); setSortDirection("desc"); }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-swiss-gray-900 flex items-center gap-2 sm:gap-3">
          <Map className="h-7 w-7 sm:h-10 sm:w-10 text-primary shrink-0" />
          {t.cantons.title}
        </h1>
        <p className="text-sm sm:text-lg text-swiss-gray-600 max-w-2xl">{t.cantons.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2 pb-1">
            <span className="text-sm text-swiss-gray-500 self-center mr-2 shrink-0">{t.cantons.colorBy}</span>
            {cantonIndicators.map((indicator) => (
              <button key={indicator.id} onClick={() => setSelectedIndicator(indicator.id)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${selectedIndicator === indicator.id ? "bg-primary text-white" : "bg-swiss-gray-100 text-swiss-gray-700 hover:bg-swiss-gray-200"}`}>
                {indicator.name}
              </button>
            ))}
          </div>

          <Card>
            <CardContent className="p-2 sm:p-4">
              <SwitzerlandMap selectedCanton={selectedCantonId} onCantonSelect={setSelectedCantonId} highlightIndicator={selectedIndicator} getCantonColor={getCantonColor} />
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm">
            <span className="text-swiss-gray-500">{t.cantons.lower}</span>
            <div className="flex h-4 rounded overflow-hidden">
              {[0.2, 0.4, 0.6, 0.8, 1].map((val) => {
                const category = getIndicatorCategory(selectedIndicator);
                const hue = category === "economic" ? 220 : category === "demographic" ? 270 : 160;
                return <div key={val} className="w-6 sm:w-8 h-full" style={{ backgroundColor: `hsl(${hue}, 60%, ${90 - val * 40}%)` }} />;
              })}
            </div>
            <span className="text-swiss-gray-500">{t.cantons.higher}</span>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedCanton ? (
              <CantonTooltip key={selectedCanton.id} canton={selectedCanton} onClose={() => setSelectedCantonId(null)} />
            ) : (
              <Card>
                <CardContent className="py-8 sm:py-12 text-center">
                  <Map className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-swiss-gray-300 mb-4" />
                  <p className="text-sm sm:text-base text-swiss-gray-500">{t.cantons.selectCanton}</p>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>

          {selectedIndicatorMeta && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-swiss-gray-500">{t.cantons.nationalAverage}</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const cantonValues = cantons.map((c) => c.indicators.find((i) => i.indicatorId === selectedIndicator)?.value).filter((v): v is number => v !== undefined);
                  const avgValue = cantonValues.length > 0 ? cantonValues.reduce((a, b) => a + b, 0) / cantonValues.length : 0;
                  const displayValue = selectedIndicatorData?.value ?? avgValue;
                  const unit = selectedIndicatorMeta.unit;
                  return (
                    <>
                      <div className="text-2xl font-bold swiss-number">
                        {unit === "%" ? formatPercentage(displayValue) : `${formatSwissNumber(Math.round(displayValue))} ${unit}`}
                      </div>
                      <p className="text-sm text-swiss-gray-500 mt-1">{selectedIndicatorMeta.name}</p>
                      {selectedIndicator === "unemployment-rate" && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg flex gap-2 text-xs text-blue-700">
                          <Info className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>{t.cantons.unemploymentNote}</span>
                        </div>
                      )}
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">{t.cantons.allCantons}</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-swiss-gray-200">
                  <th className="text-left py-3 px-3 sm:px-4">
                    <button onClick={() => handleSort("name")} className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900">
                      {t.cantons.canton} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4">
                    <button onClick={() => handleSort("population")} className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900 ml-auto">
                      {t.cantons.population} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4 hidden sm:table-cell">
                    <button onClick={() => handleSort("area")} className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900 ml-auto">
                      {t.cantons.area} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4">
                    <button onClick={() => handleSort("density")} className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900 ml-auto">
                      {t.cantons.density} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCantons.map((canton) => (
                  <tr key={canton.id} onClick={() => setSelectedCantonId(canton.id)}
                    className={`border-b border-swiss-gray-100 cursor-pointer transition-colors ${selectedCantonId === canton.id ? "bg-primary/5" : "hover:bg-swiss-gray-50"}`}>
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Badge variant="outline" className="font-mono text-xs">{canton.abbreviation}</Badge>
                        <span className="font-medium text-sm sm:text-base">{canton.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-3 sm:px-4 swiss-number text-sm">{formatSwissNumber(canton.population)}</td>
                    <td className="text-right py-3 px-3 sm:px-4 swiss-number text-sm hidden sm:table-cell">{formatSwissNumber(canton.area)}</td>
                    <td className="text-right py-3 px-3 sm:px-4 swiss-number text-sm">{formatSwissNumber(Math.round(canton.population / canton.area))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
