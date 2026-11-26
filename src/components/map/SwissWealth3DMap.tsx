"use client";

import { useEffect, useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ColumnLayer, TextLayer } from "@deck.gl/layers";
import {
  AmbientLight,
  DirectionalLight,
  LightingEffect,
  MapViewState,
  PickingInfo,
} from "@deck.gl/core";
import MapLibreMap, { NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Pause, Play } from "lucide-react";

interface TaxTimeseriesRecord {
  year: number;
  bfsNumber: number;
  municipality: string;
  canton: string;
  latitude: number;
  longitude: number;
  taxpayers: number;
  totalTaxableIncomeChf: number;
  avgTaxableIncomeChf: number;
}

interface TaxTimeseriesPayload {
  metric: string;
  description: string;
  years: number[];
  records: TaxTimeseriesRecord[];
}

type RankedMunicipality = TaxTimeseriesRecord & {
  rank: number;
};

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 47.3,
  longitude: 8.6,
  zoom: 7.8,
  pitch: 58,
  bearing: 24,
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const directionalLight = new DirectionalLight({
  color: [255, 255, 255],
  intensity: 1.2,
  direction: [-3, -9, -2],
});

const lightingEffect = new LightingEffect({ ambientLight, directionalLight });
const OPEN_MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";
const DATA_URL = "/data/swiss-municipality-tax-timeseries-2010-2019.json";
const COLUMN_COLOR: [number, number, number, number] = [59, 130, 246, 230];

function formatChf(value: number): string {
  return new Intl.NumberFormat("de-CH").format(Math.round(value));
}

export function SwissWealth3DMap() {
  const [payload, setPayload] = useState<TaxTimeseriesPayload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState<RankedMunicipality | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error(`Failed loading dataset (${response.status})`);
        }
        const json: TaxTimeseriesPayload = await response.json();
        if (!cancelled) {
          setPayload(json);
          setSelectedYear(json.years[0] ?? null);
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : "Unknown loading error";
          setLoadError(message);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const years = payload?.years ?? [];
  const currentYear = selectedYear ?? years[0] ?? null;

  useEffect(() => {
    setSelected(null);
  }, [currentYear]);

  useEffect(() => {
    if (!isPlaying || years.length <= 1 || currentYear === null) {
      return;
    }
    const interval = setInterval(() => {
      setSelectedYear((prev) => {
        const active = prev ?? years[0];
        const currentIndex = years.indexOf(active);
        const nextIndex = (currentIndex + 1) % years.length;
        return years[nextIndex];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying, years, currentYear]);

  const yearRows = useMemo(() => {
    if (!payload || currentYear === null) {
      return [];
    }
    return payload.records.filter((row) => row.year === currentYear);
  }, [payload, currentYear]);

  const rankedData = useMemo<RankedMunicipality[]>(() => {
    const sortedByIncome = [...yearRows].sort(
      (a, b) => b.avgTaxableIncomeChf - a.avgTaxableIncomeChf
    );

    const rankByMunicipality = new Map(
      sortedByIncome.map((entry, index) => [entry.bfsNumber, index + 1])
    );

    return yearRows.map((entry) => ({
      ...entry,
      rank: rankByMunicipality.get(entry.bfsNumber) ?? sortedByIncome.length,
    }));
  }, [yearRows]);

  const elevationStats = useMemo(() => {
    if (rankedData.length === 0) {
      return { min: 0, max: 1 };
    }
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const row of rankedData) {
      if (row.avgTaxableIncomeChf < min) min = row.avgTaxableIncomeChf;
      if (row.avgTaxableIncomeChf > max) max = row.avgTaxableIncomeChf;
    }
    return { min, max };
  }, [rankedData]);

  const getVisualElevation = (income: number) => {
    const range = Math.max(elevationStats.max - elevationStats.min, 1);
    const normalized = (income - elevationStats.min) / range;
    // Non-linear scaling to make differences visually obvious.
    return 350 + Math.pow(Math.max(normalized, 0), 1.35) * 14500;
  };

  const columnLayer = useMemo(
    () =>
      new ColumnLayer<RankedMunicipality>({
        id: "swiss-wealth-columns",
        data: rankedData,
        diskResolution: 24,
        radius: 680,
        extruded: true,
        elevationScale: 1,
        coverage: 0.82,
        pickable: true,
        autoHighlight: true,
        getPosition: (d) => [d.longitude, d.latitude],
        getElevation: (d) => getVisualElevation(d.avgTaxableIncomeChf),
        getFillColor: COLUMN_COLOR,
        getLineColor: [35, 35, 35, 160],
        lineWidthMinPixels: 1,
        material: {
          ambient: 0.3,
          diffuse: 0.65,
          shininess: 50,
          specularColor: [230, 230, 230],
        },
      }),
    [rankedData, elevationStats]
  );

  const labelData = useMemo(
    () =>
      [...rankedData]
        .sort((a, b) => b.taxpayers - a.taxpayers)
        .slice(0, 280),
    [rankedData]
  );

  const textLayer = useMemo(
    () =>
      new TextLayer<RankedMunicipality>({
        id: "swiss-municipality-labels",
        data: labelData,
        pickable: false,
        getPosition: (d) => [d.longitude, d.latitude],
        getText: (d) => d.municipality,
        getSize: 12,
        sizeUnits: "pixels",
        sizeMinPixels: 10,
        sizeMaxPixels: 14,
        getColor: [205, 220, 255, 220],
        getTextAnchor: "middle",
        getAlignmentBaseline: "bottom",
        getPixelOffset: [0, -12],
        fontFamily: "Inter, system-ui, sans-serif",
      }),
    [labelData]
  );

  const onMapClick = (info: PickingInfo<RankedMunicipality>) => {
    if (!info.object) {
      setSelected(null);
      return;
    }
    setSelected(info.object);
  };

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
        Failed to load historical dataset: {loadError}
      </div>
    );
  }

  if (!payload || currentYear === null) {
    return (
      <div className="rounded-xl border border-swiss-gray-200 bg-white p-4 text-sm text-swiss-gray-700">
        Loading Swiss historical dataset...
      </div>
    );
  }

  const minYear = years[0];
  const maxYear = years[years.length - 1];
  const yearIndex = years.indexOf(currentYear);

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-swiss-gray-200 bg-white p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-swiss-gray-500">
              Historical Timeline
            </p>
            <p className="text-lg font-semibold text-swiss-gray-900">
              {currentYear}
            </p>
          </div>
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-swiss-gray-200 text-sm font-medium text-swiss-gray-700 hover:bg-swiss-gray-50"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Pause animation" : "Play animation"}
          </button>
        </div>
        <div className="mt-3">
          <input
            type="range"
            min={0}
            max={Math.max(0, years.length - 1)}
            step={1}
            value={Math.max(0, yearIndex)}
            onChange={(event) => {
              const next = years[Number(event.target.value)];
              setSelectedYear(next);
              setIsPlaying(false);
            }}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-swiss-gray-500 mt-1">
            <span>{minYear}</span>
            <span>{maxYear}</span>
          </div>
        </div>
      </div>

      <div className="relative rounded-xl border border-swiss-gray-200 overflow-visible h-[70vh] min-h-[560px]">
        <DeckGL
          effects={[lightingEffect]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={[columnLayer, textLayer]}
          onClick={onMapClick}
          getCursor={({ isHovering }) => (isHovering ? "pointer" : "grab")}
        >
          <MapLibreMap mapStyle={OPEN_MAP_STYLE} reuseMaps>
            <NavigationControl position="top-right" />
          </MapLibreMap>
        </DeckGL>
        {selected && (
          <div className="absolute left-3 top-3 z-[9999] max-w-sm bg-white/95 backdrop-blur rounded-lg shadow-lg border border-swiss-gray-200 p-3 text-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="font-semibold text-swiss-gray-900">
                  {selected.municipality} ({selected.canton})
                </div>
                <div>Avg Taxable Income: CHF {formatChf(selected.avgTaxableIncomeChf)}</div>
                <div>Rank in Switzerland: #{selected.rank}</div>
                <div>Year: {selected.year}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-swiss-gray-500 hover:text-swiss-gray-900 leading-none"
                aria-label="Close details"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-swiss-gray-600">
        <span>Coverage: Switzerland municipalities</span>
        <span>Years: 2010-2019</span>
        <span>Metric: Avg taxable income (proxy for wealth dynamics)</span>
        <span>Uniform column color, height-only encoding (exaggerated)</span>
      </div>
    </div>
  );
}
