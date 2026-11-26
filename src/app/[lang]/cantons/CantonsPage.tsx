"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SwitzerlandMap } from "@/components/map/SwitzerlandMap";
import { CantonTooltip } from "@/components/map/CantonTooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cantons, getCantonById, cantonIndicatorMeta, cantonPopulationMeta, cantonAreaMeta } from "@/data/cantons";
import { indicators } from "@/data/indicators";
import { Canton } from "@/types";
import { formatNumber, formatWithUnit, formatSwissDate, getTranslatedUnit, percentSign, NBSP } from "@/lib/formatters";
import { SourceLine } from "@/components/ui/source-line";
import { useLanguage } from "@/i18n/LanguageContext";
import { cantonName } from "@/lib/utils";
import { Map, TrendingUp, Users, Heart, ArrowUpDown, Info } from "lucide-react";

type SortKey = "name" | "population" | "area" | "density";
type SortDirection = "asc" | "desc";

// The legend has five steps. Each step covers one fifth of the range between
// the lowest and the highest canton value of the selected indicator.
const LEGEND_STEP_COUNT = 5;

export default function CantonsPage() {
  const { t, locale } = useLanguage();
  const [selectedCantonId, setSelectedCantonId] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string>("unemployment-rate");
  const [sortKey, setSortKey] = useState<SortKey>("population");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  // Legend filter. Hover and keyboard focus preview a step; a click, a tap, Enter or Space pins it.
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const [pinnedStep, setPinnedStep] = useState<number | null>(null);
  const shownStep = hoveredStep ?? focusedStep ?? pinnedStep;
  const legendRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Escape, or a click or tap outside the legend and the map, removes the filter
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setPinnedStep(null); setFocusedStep(null); setHoveredStep(null); }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!legendRef.current?.contains(target) && !mapRef.current?.contains(target)) setPinnedStep(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Ids, units, reference years and sources come from src/data/cantons.ts (generated from official tables).
  const cantonIndicatorNames: Record<string, string> = {
    "unemployment-rate": t.cantons.unemployment,
    "foreign-population": t.cantons.foreignPopulation,
    "health-premium": t.cantons.healthPremium,
    "gdp-per-capita": t.cantons.gdpPerCapita,
    "average-rent": t.cantons.averageRent,
    "crime-rate-per-1000": t.cantons.crimeRate,
  };
  const cantonIndicators = cantonIndicatorMeta.map((meta) => ({ ...meta, name: cantonIndicatorNames[meta.id] ?? meta.id }));

  const selectedCanton = selectedCantonId ? getCantonById(selectedCantonId) : null;
  const selectedIndicatorMeta = cantonIndicators.find((i) => i.id === selectedIndicator);

  const getIndicatorCategory = (indicatorId: string) => {
    const mainIndicator = indicators.find((i) => i.id === indicatorId);
    if (mainIndicator) return mainIndicator.category;
    if (indicatorId === "gdp-per-capita" || indicatorId === "average-rent") return "economic";
    if (indicatorId === "foreign-population") return "demographic";
    if (indicatorId === "crime-rate-per-1000" || indicatorId === "health-premium") return "social";
    return "economic";
  };

  // Scale of the selected indicator: lowest and highest canton value, and the six bounds of the five legend steps.
  // The map and the legend both read the scale from here.
  const getIndicatorScale = () => {
    const allValues = cantons.map((c) => c.indicators.find((i) => i.indicatorId === selectedIndicator)?.value).filter((v): v is number => v !== undefined);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    // Rounded to 6 decimals so that a bound such as 1.32 is exactly the number that is printed
    const bounds = Array.from({ length: LEGEND_STEP_COUNT + 1 }, (_, k) =>
      k === 0 ? min : k === LEGEND_STEP_COUNT ? max : Math.round((min + ((max - min) * k) / LEGEND_STEP_COUNT) * 1e6) / 1e6);
    return { min, max, bounds, values: allValues };
  };
  const scale = getIndicatorScale();

  // Colour of a value of the selected indicator. The map and the legend both take their colours from here.
  const getValueColor = (value: number) => {
    const normalized = (value - scale.min) / (scale.max - scale.min);
    const category = getIndicatorCategory(selectedIndicator);
    const hue = category === "economic" ? 220 : category === "demographic" ? 270 : 160;
    return `hsl(${hue}, 60%, ${90 - normalized * 40}%)`;
  };

  const getCantonColor = (canton: Canton) => {
    const cantonIndicator = canton.indicators.find((i) => i.indicatorId === selectedIndicator);
    if (!cantonIndicator) return "#E5E5E5";
    if (selectedCantonId === canton.id) return "#D82525";
    return getValueColor(cantonIndicator.value);
  };

  // Index of the legend step of a value: a step starts at its lower bound and ends just under the next one;
  // the highest value belongs to the last step.
  const getLegendStep = (value: number) => {
    let step = 0;
    for (let k = 1; k < LEGEND_STEP_COUNT; k++) if (value >= scale.bounds[k]) step = k;
    return step;
  };
  const legendStepCounts = Array.from({ length: LEGEND_STEP_COUNT }, (_, k) => scale.values.filter((v) => getLegendStep(v) === k).length);

  // A canton is faded when a step with cantons is shown and the canton is in another step.
  // Cantons without a value are never faded.
  const isCantonDimmed = (canton: Canton) => {
    if (shownStep === null || legendStepCounts[shownStep] === 0) return false;
    const cantonIndicator = canton.indicators.find((i) => i.indicatorId === selectedIndicator);
    return cantonIndicator !== undefined && getLegendStep(cantonIndicator.value) !== shownStep;
  };

  // Value range of a legend step, e.g. "from 1.32 to under 2.04%". The bounds are printed exactly, not rounded.
  // A step without cantons says so in place of the unit, which keeps the text on one line on phones.
  const getLegendStepText = (index: number) => {
    const formatBound = (value: number) =>
      formatNumber(value, locale, { decimals: [0, 1, 2].find((d) => Number(value.toFixed(d)) === value) ?? 2 });
    const template = index === LEGEND_STEP_COUNT - 1 ? t.cantons.legendRangeLast : t.cantons.legendRange;
    const range = template.replace("{from}", formatBound(scale.bounds[index])).replace("{to}", formatBound(scale.bounds[index + 1]));
    if (legendStepCounts[index] === 0) return `${range}: ${t.cantons.legendNoCanton}`;
    const unit = selectedIndicatorMeta?.unit ?? "";
    return unit === "%" ? `${range}${percentSign(locale)}` : `${range}${NBSP}${getTranslatedUnit(unit, locale)}`;
  };

  const sortedCantons = [...cantons].sort((a, b) => {
    let aVal: number, bVal: number;
    switch (sortKey) {
      case "name": return sortDirection === "asc" ? cantonName(a, locale).localeCompare(cantonName(b, locale)) : cantonName(b, locale).localeCompare(cantonName(a, locale));
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
            <span className="text-sm text-swiss-gray-600 self-center mr-2 shrink-0">{t.cantons.colorBy}</span>
            {cantonIndicators.map((indicator) => (
              <button key={indicator.id} type="button" aria-pressed={selectedIndicator === indicator.id} onClick={() => { setSelectedIndicator(indicator.id); setPinnedStep(null); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedIndicator === indicator.id ? "bg-primary text-white" : "bg-swiss-gray-100 text-swiss-gray-700 hover:bg-swiss-gray-200"}`}>
                {indicator.name}
              </button>
            ))}
          </div>

          <Card>
            <CardContent className="p-2 sm:p-4">
              <div ref={mapRef}>
                <SwitzerlandMap selectedCanton={selectedCantonId} onCantonSelect={setSelectedCantonId} highlightIndicator={selectedIndicator} getCantonColor={getCantonColor} isCantonDimmed={isCantonDimmed} />
              </div>
            </CardContent>
          </Card>

          <div className="relative flex items-center justify-center gap-4 text-sm">
            <span className="text-swiss-gray-500">{t.cantons.lower}</span>
            <div ref={legendRef} className="flex h-4"
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setHoveredStep(null); }}>
              {Array.from({ length: LEGEND_STEP_COUNT }, (_, index) => {
                const isEmpty = legendStepCounts[index] === 0;
                return (
                  // Each step shows the colours of its own range, so the five steps together are the scale of the map.
                  // A step without cantons stays in the scale but does nothing.
                  // On phones the ::after of the step extends the tap area to 44px in height; the visible size stays the same.
                  <button key={index} type="button" aria-label={`${selectedIndicatorMeta?.name ?? ""}: ${getLegendStepText(index)}`}
                    aria-pressed={pinnedStep === index} aria-disabled={isEmpty || undefined}
                    onPointerEnter={(e) => { if (e.pointerType === "mouse") setHoveredStep(index); }}
                    onClick={() => { if (!isEmpty) setPinnedStep(pinnedStep === index ? null : index); }}
                    onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setFocusedStep(index); }}
                    onBlur={() => setFocusedStep(null)}
                    className={`relative w-6 sm:w-8 h-full min-w-0 min-h-0 first:rounded-l last:rounded-r after:absolute after:inset-x-0 after:-inset-y-3.5 after:content-[''] sm:after:content-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-swiss-gray-900 ${isEmpty ? "cursor-default" : ""} ${shownStep === index && !isEmpty ? "ring-2 ring-inset ring-swiss-gray-900" : ""}`}
                    style={{ background: `linear-gradient(to right, ${getValueColor(scale.bounds[index])}, ${getValueColor(scale.bounds[index + 1])})` }} />
                );
              })}
            </div>
            <span className="text-swiss-gray-500">{t.cantons.higher}</span>
            {/* Range of the step that is shown. Placed over the gap under the legend, so nothing moves when it appears. */}
            {shownStep !== null && (
              <p aria-hidden="true" className="absolute inset-x-0 top-full mt-1 text-center text-swiss-gray-500 pointer-events-none">{getLegendStepText(shownStep)}</p>
            )}
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
                <CardTitle className="text-sm text-swiss-gray-600">{t.cantons.switzerland}</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  // Figure for Switzerland from the same official table and year as the canton values
                  const displayValue = selectedIndicatorMeta.national;
                  const unit = selectedIndicatorMeta.unit;
                  return (
                    <>
                      <div className="text-2xl font-bold swiss-number">
                        {formatWithUnit(displayValue, unit, locale, { decimals: unit === "CHF" || unit === "CHF/month" ? 0 : 1 })}
                      </div>
                      <p className="text-sm text-swiss-gray-600 mt-1">{selectedIndicatorMeta.name}</p>
                      <SourceLine
                        publisher={selectedIndicatorMeta.source[locale]}
                        url={selectedIndicatorMeta.sourceUrl}
                        date={`${selectedIndicatorMeta.year}${selectedIndicatorMeta.provisional ? ` (${t.cantons.provisional})` : ""}`}
                      />
                      {selectedIndicator === "unemployment-rate" && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg flex gap-2 text-sm text-blue-900">
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
                    <button onClick={() => handleSort("name")} className="flex items-center gap-1 text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900">
                      {t.cantons.canton} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4">
                    <button onClick={() => handleSort("population")} className="flex items-center gap-1 text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900 ml-auto">
                      {t.cantons.population} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4 hidden sm:table-cell">
                    <button onClick={() => handleSort("area")} className="flex items-center gap-1 text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900 ml-auto">
                      {t.cantons.area} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="text-right py-3 px-3 sm:px-4">
                    <button onClick={() => handleSort("density")} className="flex items-center gap-1 text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900 ml-auto">
                      {t.cantons.density} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCantons.map((canton) => (
                  <tr key={canton.id} onClick={() => setSelectedCantonId(canton.id)} tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedCantonId(canton.id); } }}
                    className={`border-b border-swiss-gray-100 cursor-pointer transition-colors ${selectedCantonId === canton.id ? "bg-primary/5" : "hover:bg-swiss-gray-50"}`}>
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Badge variant="outline" className="font-mono text-xs">{canton.abbreviation}</Badge>
                        <span className="font-medium text-sm sm:text-base">{cantonName(canton, locale)}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-3 sm:px-4 swiss-number text-sm">{formatNumber(canton.population, locale)}</td>
                    <td className="text-right py-3 px-3 sm:px-4 swiss-number text-sm hidden sm:table-cell">{formatNumber(canton.area, locale)}</td>
                    <td className="text-right py-3 px-3 sm:px-4 swiss-number text-sm">{formatNumber(Math.round(canton.population / canton.area), locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-swiss-gray-600">{t.cantons.dataSources}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-swiss-gray-600">
            {cantonIndicators.map((indicator) => (
              <li key={indicator.id}>
                <span className="font-medium text-swiss-gray-700">{indicator.name}</span>
                {": "}
                {indicator.year}
                {indicator.provisional ? ` (${t.cantons.provisional})` : ""}
                {" \u00B7 "}
                <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] sm:min-h-0 underline underline-offset-[3px] hover:text-swiss-gray-900">
                  {indicator.source[locale]}
                </a>
              </li>
            ))}
            {[
              { name: t.cantons.population, meta: cantonPopulationMeta },
              { name: t.cantons.area, meta: cantonAreaMeta },
            ].map(({ name, meta }) => (
              <li key={name}>
                <span className="font-medium text-swiss-gray-700">{name}</span>
                {": "}
                {formatSwissDate(meta.referenceDate)}
                {" \u00B7 "}
                <a href={meta.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] sm:min-h-0 underline underline-offset-[3px] hover:text-swiss-gray-900">
                  {meta.source[locale]}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-swiss-gray-600 mt-3">
            {t.cantons.territoryNote}{" "}
            {t.cantons.oldBordersNote.replace(
              "{list}",
              cantonIndicators.filter((i) => !i.currentBorders).map((i) => `${i.name} (${i.year})`).join(", ")
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
