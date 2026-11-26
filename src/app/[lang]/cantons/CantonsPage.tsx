"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SwitzerlandMap } from "@/components/map/SwitzerlandMap";
import { CantonTooltip } from "@/components/map/CantonTooltip";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cantons, getCantonById, cantonIndicatorMeta, cantonPopulationMeta, cantonAreaMeta } from "@/data/cantons";
import { indicators } from "@/data/indicators";
import { Canton, CantonIndicatorMeta } from "@/types";
import { colon, formatNumber, formatSwissDate, percentSign, NBSP } from "@/lib/formatters";
import { cantonDecimals, formatCantonValue } from "@/lib/cantonValues";
import { formatIndicatorValue, latestYear } from "@/lib/indicatorText";
import { SourceLine } from "@/components/ui/source-line";
import { useLanguage } from "@/i18n/LanguageContext";
import { cantonPublisher } from "@/i18n/sourceNames";
import { cantonName, cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

type SortKey = "name" | "indicator" | "population";
type SortDirection = "asc" | "desc";

// The legend has five bands of equal width, from the lowest to the highest canton value of the indicator.
const LEGEND_STEP_COUNT = 5;

export default function CantonsPage() {
  const { t, locale } = useLanguage();
  const [selectedCantonId, setSelectedCantonId] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string>("unemployment-rate");
  const [sortKey, setSortKey] = useState<SortKey>("indicator");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  // Legend filter. Hover and keyboard focus preview a band; a click, a tap, Enter or Space pins it.
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const [pinnedStep, setPinnedStep] = useState<number | null>(null);
  const shownStep = hoveredStep ?? focusedStep ?? pinnedStep;
  const legendRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  // When a boundary label is wider than its band, only the lowest and the highest value are printed
  const [compactLabels, setCompactLabels] = useState(false);
  const readoutRef = useRef<HTMLDivElement>(null);
  const [revealReadout, setRevealReadout] = useState(false);

  // A canton tapped on the map: its figure appears under the legend; on a small screen the page moves just
  // enough to show it
  const selectFromMap = (id: string | null) => {
    setSelectedCantonId(id);
    if (id) setRevealReadout(true);
  };
  useEffect(() => {
    if (!revealReadout) return;
    readoutRef.current?.scrollIntoView({ block: "nearest" });
    setRevealReadout(false);
  }, [revealReadout]);

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
  const unitPhrases = t.cantons.unitPhrases as Record<string, string>;
  const unitShort = t.cantons.unitShort as Record<string, string>;
  const yearText = (meta: CantonIndicatorMeta) => `${meta.year}${meta.provisional ? ` (${t.cantons.provisional})` : ""}`;
  const cantonIndicators = cantonIndicatorMeta.map((meta) => ({
    ...meta,
    name: cantonIndicatorNames[meta.id] ?? meta.id,
    unitPhrase: (unitPhrases[meta.id] ?? "").replace("{year}", yearText(meta)),
  }));

  const selectedCanton = selectedCantonId ? getCantonById(selectedCantonId) : null;
  const meta = cantonIndicators.find((i) => i.id === selectedIndicator)!;
  const decimals = cantonDecimals(meta.unit);
  const valueOf = (canton: Canton) => canton.indicators.find((i) => i.indicatorId === selectedIndicator)?.value;

  const getIndicatorCategory = (indicatorId: string) => {
    const mainIndicator = indicators.find((i) => i.id === indicatorId);
    if (mainIndicator) return mainIndicator.category;
    if (indicatorId === "gdp-per-capita" || indicatorId === "average-rent") return "economic";
    if (indicatorId === "foreign-population") return "demographic";
    if (indicatorId === "crime-rate-per-1000" || indicatorId === "health-premium") return "social";
    return "economic";
  };

  // Scale of the selected indicator: lowest and highest canton value, and the six bounds of the five bands.
  // The inner bounds are rounded to the decimals the page prints before the cantons are put in bands,
  // so that the printed bounds are exactly the ones used. The map and the legend both read the scale from here.
  const getIndicatorScale = () => {
    const allValues = cantons.map(valueOf).filter((v): v is number => v !== undefined);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const factor = Math.pow(10, decimals);
    const bounds = Array.from({ length: LEGEND_STEP_COUNT + 1 }, (_, k) =>
      k === 0 ? min : k === LEGEND_STEP_COUNT ? max : Math.round((min + ((max - min) * k) / LEGEND_STEP_COUNT) * factor) / factor);
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
    const value = valueOf(canton);
    if (value === undefined) return "#E5E5E5";
    if (selectedCantonId === canton.id) return "#D82525";
    return getValueColor(value);
  };

  // Band of a value: a band starts at its lower bound and ends just under the next one; the highest value
  // belongs to the last band.
  const getLegendStep = (value: number) => {
    let step = 0;
    for (let k = 1; k < LEGEND_STEP_COUNT; k++) if (value >= scale.bounds[k]) step = k;
    return step;
  };
  const legendStepCounts = Array.from({ length: LEGEND_STEP_COUNT }, (_, k) => scale.values.filter((v) => getLegendStep(v) === k).length);

  // A canton is faded when a band with cantons is shown and the canton is in another band.
  // Cantons without a value are never faded.
  const isCantonDimmed = (canton: Canton) => {
    if (shownStep === null || legendStepCounts[shownStep] === 0) return false;
    const value = valueOf(canton);
    return value !== undefined && getLegendStep(value) !== shownStep;
  };

  const formatBound = (value: number) => formatNumber(value, locale, { decimals });
  const withUnit = (text: string) =>
    meta.unit === "%" ? text + percentSign(locale) : `${text}${NBSP}${unitShort[meta.unit] ?? ""}`;

  // "da 1,8 a meno di 2,5: 9 Cantoni"
  const getLegendStepText = (index: number) => {
    const count = legendStepCounts[index];
    const countText = count === 0 ? t.cantons.legendNoCanton : count === 1 ? t.cantons.legendCountOne : t.cantons.legendCount.replace("{n}", String(count));
    const template = index === LEGEND_STEP_COUNT - 1 ? t.cantons.legendRangeLast : t.cantons.legendRange;
    return template
      .replace("{from}", formatBound(scale.bounds[index]))
      .replace("{to}", formatBound(scale.bounds[index + 1]))
      .replace("{count}", countText);
  };

  // Measure the boundary labels: if one is wider than a band, print only the lowest and the highest value
  useLayoutEffect(() => {
    const measure = () => {
      const row = labelsRef.current;
      if (!row) return;
      const band = row.clientWidth / LEGEND_STEP_COUNT;
      const widths = Array.from(row.querySelectorAll<HTMLElement>("[data-bound]")).map((el) => el.scrollWidth);
      setCompactLabels(widths.some((width) => width > band - 6));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedIndicator, locale]);

  const selectIndicator = (id: string) => {
    setSelectedIndicator(id);
    setPinnedStep(null);
    setSortKey("indicator");
    setSortDirection("desc");
  };

  const sortedCantons = [...cantons].sort((a, b) => {
    let aVal: number, bVal: number;
    switch (sortKey) {
      case "name": return sortDirection === "asc" ? cantonName(a, locale).localeCompare(cantonName(b, locale)) : cantonName(b, locale).localeCompare(cantonName(a, locale));
      case "indicator": aVal = valueOf(a) ?? -Infinity; bVal = valueOf(b) ?? -Infinity; break;
      case "population": aVal = a.population; bVal = b.population; break;
      default: return 0;
    }
    return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDirection(key === "name" ? "asc" : "desc"); }
  };
  const ariaSort = (key: SortKey) => (sortKey === key ? (sortDirection === "asc" ? "ascending" : "descending") : "none");

  const ilo = indicators.find((i) => i.id === "unemployment-rate-ilo");
  // "Disoccupazione registrata (%)"; no unit in brackets when the name already has it ("Reati per 1000 abitanti")
  const shortUnit = unitShort[meta.unit] ?? meta.unit;
  const indicatorHeader = meta.name.includes(shortUnit) ? meta.name : `${meta.name} (${shortUnit})`;
  const selectedValue = selectedCanton ? valueOf(selectedCanton) : undefined;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      <div className="space-y-3 max-w-[72ch]">
        <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight text-ink">{t.cantons.title}</h1>
        <p className="text-base sm:text-lg text-swiss-gray-600">{t.cantons.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <div className="flex flex-wrap gap-2 pb-1" role="group" aria-label={t.cantons.colorBy}>
            <span className="text-sm text-swiss-gray-600 self-center mr-1 shrink-0">{t.cantons.colorBy}</span>
            {cantonIndicators.map((indicator) => (
              <button key={indicator.id} type="button" aria-pressed={selectedIndicator === indicator.id} onClick={() => selectIndicator(indicator.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedIndicator === indicator.id ? "bg-primary text-white" : "bg-swiss-gray-100 text-swiss-gray-700 hover:bg-swiss-gray-200"}`}>
                {indicator.name}
              </button>
            ))}
          </div>

          <Card className="p-2 sm:p-4">
            <div ref={mapRef}>
              <SwitzerlandMap selectedCanton={selectedCantonId} onCantonSelect={selectFromMap} highlightIndicator={selectedIndicator} getCantonColor={getCantonColor} isCantonDimmed={isCantonDimmed} />
            </div>
          </Card>

          {/* Legend: what the colours mean, as numbers; a band filters the map */}
          <div className="space-y-2">
            <p className="text-sm text-ink">
              <span className="font-semibold">{meta.name}</span>, {meta.unitPhrase}
            </p>
            <div ref={legendRef} className="w-full max-w-[320px] sm:max-w-[400px]"
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setHoveredStep(null); }}>
              <div className="flex h-4">
                {Array.from({ length: LEGEND_STEP_COUNT }, (_, index) => {
                  const isEmpty = legendStepCounts[index] === 0;
                  return (
                    // Each band shows the colours of its own range, so the five bands together are the scale of the map.
                    // A band without cantons stays in the scale but does nothing.
                    // The ::after of the band extends the tap area to 44px in height; the visible size stays 16px.
                    <button key={index} type="button" aria-label={`${meta.name}${colon(locale)} ${getLegendStepText(index)}`}
                      aria-pressed={pinnedStep === index} aria-disabled={isEmpty || undefined}
                      onPointerEnter={(e) => { if (e.pointerType === "mouse") setHoveredStep(index); }}
                      onClick={() => { if (!isEmpty) setPinnedStep(pinnedStep === index ? null : index); }}
                      onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setFocusedStep(index); }}
                      onBlur={() => setFocusedStep(null)}
                      className={`relative flex-1 h-full min-w-0 min-h-0 first:rounded-l last:rounded-r after:absolute after:inset-x-0 after:-inset-y-3.5 after:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-swiss-gray-900 ${isEmpty ? "cursor-default" : ""} ${shownStep === index && !isEmpty ? "ring-2 ring-inset ring-swiss-gray-900" : ""}`}
                      style={{ background: `linear-gradient(to right, ${getValueColor(scale.bounds[index])}, ${getValueColor(scale.bounds[index + 1])})` }} />
                  );
                })}
              </div>
              {/* the six bounds; the unit after the last one */}
              <div ref={labelsRef} className="relative h-5 mt-1 text-source text-swiss-gray-600 swiss-number" data-legend-labels="">
                {scale.bounds.map((bound, k) => {
                  if (compactLabels && k > 0 && k < LEGEND_STEP_COUNT) return null;
                  const text = k === LEGEND_STEP_COUNT ? withUnit(formatBound(bound)) : formatBound(bound);
                  const position =
                    k === 0 ? { left: 0 } : k === LEGEND_STEP_COUNT ? { right: 0 } : { left: `${(k * 100) / LEGEND_STEP_COUNT}%`, transform: "translateX(-50%)" };
                  return (
                    <span key={k} data-bound={k} className="absolute top-0 whitespace-nowrap" style={position}>
                      {text}
                    </span>
                  );
                })}
              </div>
            </div>
            {/* range of the band shown; the line keeps its height so that nothing moves */}
            <p className="min-h-[1.25rem] text-sm text-ink" aria-live="polite" data-legend-range="">
              {shownStep !== null ? getLegendStepText(shownStep) : ""}
            </p>
            <p className="text-sm text-swiss-gray-600">{t.cantons.legendHint}</p>
          </div>

          {/* Readout: the selected canton's figure, still on screen after a tap on the map */}
          <div ref={readoutRef} className="flex flex-wrap items-center gap-x-4 gap-y-1 min-h-[44px] text-base" data-readout="">
            {selectedCanton && selectedValue !== undefined ? (
              <>
                <p className="text-ink swiss-number">
                  {t.cantons.readout
                    .replace("{canton}", cantonName(selectedCanton, locale))
                    .replace("{value}", formatCantonValue(selectedValue, meta.unit, locale))
                    .replace("{national}", formatCantonValue(meta.national, meta.unit, locale))}
                </p>
                <a href="#canton-card" className="inline-flex items-center min-h-[44px] text-sm font-medium text-ink underline underline-offset-[3px] lg:hidden">
                  {t.cantons.allFigures}
                </a>
              </>
            ) : (
              <p className="text-sm text-swiss-gray-600">{t.cantons.readoutEmpty}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 min-w-0">
          <Card className="p-5">
            <p className="text-sm font-semibold text-swiss-gray-600">{t.cantons.switzerland}</p>
            <p className="mt-1 text-2xl font-bold swiss-number text-ink">{formatCantonValue(meta.national, meta.unit, locale)}</p>
            <p className="mt-1 text-sm text-swiss-gray-600">
              {meta.name}, {meta.unitPhrase}
            </p>
            <SourceLine publisher={cantonPublisher(meta.source.en, locale)} url={meta.sourceUrl} date={yearText(meta)} />
            {selectedIndicator === "unemployment-rate" && ilo && (
              <p className="mt-3 text-sm text-swiss-gray-700">
                {t.cantons.unemploymentNote.replace("{year}", String(latestYear(ilo))).replace("{ilo}", formatIndicatorValue(ilo, locale))}
              </p>
            )}
          </Card>

          <div id="canton-card" className="scroll-mt-4">
            <AnimatePresence mode="wait">
              {selectedCanton && (
                <CantonTooltip key={selectedCanton.id} canton={selectedCanton} onClose={() => setSelectedCantonId(null)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Card className="py-5 sm:p-6">
        <h2 className="px-4 sm:px-0 text-base sm:text-lg font-semibold text-ink">{t.cantons.allCantons}</h2>
        <p className="px-4 sm:px-0 mt-1 mb-3 text-sm text-swiss-gray-600">{t.cantons.compareHint}</p>
        <div className="overflow-x-auto" data-canton-table="">
          <table className="w-full">
            <thead>
              <tr className="border-b border-swiss-gray-200">
                <th className="text-left py-3 px-2 sm:px-4 align-bottom" aria-sort={ariaSort("name")}>
                  <button type="button" onClick={() => handleSort("name")} className="text-left text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900">
                    {t.cantons.canton}
                    <ArrowUpDown className="inline h-3 w-3 ml-1 align-[-1px]" aria-hidden="true" />
                  </button>
                </th>
                <th className="text-right py-3 px-2 sm:px-4 align-bottom" aria-sort={ariaSort("indicator")}>
                  <button type="button" onClick={() => handleSort("indicator")} className="text-right text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900">
                    {indicatorHeader}
                    <ArrowUpDown className="inline h-3 w-3 ml-1 align-[-1px]" aria-hidden="true" />
                  </button>
                </th>
                <th className="text-right py-3 px-2 sm:px-4 align-bottom" aria-sort={ariaSort("population")}>
                  <button type="button" onClick={() => handleSort("population")} className="text-right text-sm font-semibold text-swiss-gray-700 hover:text-swiss-gray-900">
                    {t.cantons.population}
                    <ArrowUpDown className="inline h-3 w-3 ml-1 align-[-1px]" aria-hidden="true" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Switzerland first, not sorted with the cantons */}
              <tr className="border-b border-swiss-gray-200 font-semibold bg-paper" data-national-row="">
                <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">{t.cantons.switzerland}</td>
                <td className="text-right py-3 px-2 sm:px-4 swiss-number text-sm">{formatBound(meta.national)}</td>
                <td className="text-right py-3 px-2 sm:px-4 swiss-number text-sm">{formatNumber(cantonPopulationMeta.national, locale)}</td>
              </tr>
              {sortedCantons.map((canton) => {
                const value = valueOf(canton);
                return (
                  <tr key={canton.id} onClick={() => setSelectedCantonId(canton.id)} tabIndex={0} aria-current={selectedCantonId === canton.id ? "true" : undefined}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedCantonId(canton.id); } }}
                    className={cn("border-b border-swiss-gray-100 cursor-pointer transition-colors", selectedCantonId === canton.id ? "bg-primary/10" : "hover:bg-swiss-gray-50")}>
                    <td className="py-3 px-2 sm:px-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* the abbreviation only where there is room for it */}
                        <Badge variant="outline" className="hidden sm:inline-flex font-mono text-xs shrink-0">{canton.abbreviation}</Badge>
                        <span className="font-medium text-sm sm:text-base">{cantonName(canton, locale)}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 sm:px-4 swiss-number text-sm">{value === undefined ? "–" : formatBound(value)}</td>
                    <td className="text-right py-3 px-2 sm:px-4 swiss-number text-sm">{formatNumber(canton.population, locale)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-swiss-gray-600">{t.cantons.dataSources}</h2>
        <ul className="mt-2 space-y-1 text-sm text-swiss-gray-600">
          {cantonIndicators.map((indicator) => (
            <li key={indicator.id}>
              <span className="font-medium text-swiss-gray-700">{indicator.name}</span>
              {colon(locale) + " "}
              {yearText(indicator)}
              {" · "}
              <a href={indicator.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] sm:min-h-0 underline underline-offset-[3px] hover:text-swiss-gray-900">
                {indicator.source[locale]}
              </a>
            </li>
          ))}
          {[
            { name: t.cantons.population, meta: cantonPopulationMeta },
            { name: t.cantons.area, meta: cantonAreaMeta },
          ].map(({ name, meta: base }) => (
            <li key={name}>
              <span className="font-medium text-swiss-gray-700">{name}</span>
              {colon(locale) + " "}
              {formatSwissDate(base.referenceDate)}
              {" · "}
              <a href={base.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] sm:min-h-0 underline underline-offset-[3px] hover:text-swiss-gray-900">
                {base.source[locale]}
              </a>
            </li>
          ))}
        </ul>
        <details className="mt-3 text-sm text-swiss-gray-600">
          <summary className="cursor-pointer min-h-[44px] flex items-center font-medium text-swiss-gray-700">{t.cantons.bordersSummary}</summary>
          <p className="mt-1">
            {t.cantons.territoryNote}{" "}
            {t.cantons.oldBordersNote.replace(
              "{list}",
              cantonIndicators.filter((i) => !i.currentBorders).map((i) => `${i.name} (${i.year})`).join(", ")
            )}
          </p>
        </details>
      </Card>
    </div>
  );
}
