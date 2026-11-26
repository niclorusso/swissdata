"use client";

import { useMemo, useState } from "react";
import { cantons } from "@/data/cantons";
import { cantonCenters, cantonPaths } from "@/data/swiss-map-paths";

type MetricOption = {
  id: string;
  label: string;
  unit: string;
  getValue: (cantonId: string) => number;
};

const metricOptions: MetricOption[] = [
  {
    id: "population",
    label: "Population",
    unit: "people",
    getValue: (cantonId) => cantons.find((c) => c.id === cantonId)?.population ?? 0,
  },
  {
    id: "density",
    label: "Population Density",
    unit: "people/km2",
    getValue: (cantonId) => {
      const canton = cantons.find((c) => c.id === cantonId);
      if (!canton || canton.area === 0) return 0;
      return canton.population / canton.area;
    },
  },
  {
    id: "gdp-per-capita",
    label: "Income Proxy (GDP per capita)",
    unit: "CHF",
    getValue: (cantonId) =>
      cantons
        .find((c) => c.id === cantonId)
        ?.indicators.find((i) => i.indicatorId === "gdp-per-capita")?.value ?? 0,
  },
  {
    id: "average-rent",
    label: "Average Rent",
    unit: "CHF/month",
    getValue: (cantonId) =>
      cantons
        .find((c) => c.id === cantonId)
        ?.indicators.find((i) => i.indicatorId === "average-rent")?.value ?? 0,
  },
  {
    id: "foreign-population",
    label: "Foreign Population Share",
    unit: "%",
    getValue: (cantonId) =>
      cantons
        .find((c) => c.id === cantonId)
        ?.indicators.find((i) => i.indicatorId === "foreign-population")?.value ?? 0,
  },
];

function formatValue(value: number, unit: string): string {
  if (unit === "people") return new Intl.NumberFormat("de-CH").format(Math.round(value));
  if (unit === "people/km2") return `${new Intl.NumberFormat("de-CH").format(Math.round(value))} /km2`;
  if (unit === "CHF") return `CHF ${new Intl.NumberFormat("de-CH").format(Math.round(value))}`;
  if (unit === "CHF/month") return `CHF ${new Intl.NumberFormat("de-CH").format(Math.round(value))}/mo`;
  if (unit === "%") return `${value.toFixed(1)}%`;
  return new Intl.NumberFormat("de-CH").format(value);
}

function isCommandToken(token: string): boolean {
  return /^[A-Za-z]$/.test(token);
}

function formatNumber(value: number): string {
  return Number(value.toFixed(2)).toString();
}

type DistortPointFn = (x: number, y: number) => { x: number; y: number };

function distortSvgPath(path: string, distortPoint: DistortPointFn): string {
  const tokens = path.match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? [];
  if (tokens.length === 0) return path;

  let index = 0;
  let cmd = "";
  let currentX = 0;
  let currentY = 0;
  let subpathStartX = 0;
  let subpathStartY = 0;
  const output: string[] = [];

  const hasNextNumber = () =>
    index < tokens.length && !isCommandToken(tokens[index]);

  const readNumber = () => Number(tokens[index++]);

  const readPoint = (relative: boolean) => {
    const xRaw = readNumber();
    const yRaw = readNumber();
    const x = relative ? currentX + xRaw : xRaw;
    const y = relative ? currentY + yRaw : yRaw;
    return { x, y };
  };

  while (index < tokens.length) {
    if (isCommandToken(tokens[index])) {
      cmd = tokens[index++];
    }
    if (!cmd) break;

    const relative = cmd === cmd.toLowerCase();
    const upper = cmd.toUpperCase();

    if (upper === "M") {
      const first = readPoint(relative);
      currentX = first.x;
      currentY = first.y;
      subpathStartX = first.x;
      subpathStartY = first.y;
      const moved = distortPoint(first.x, first.y);
      output.push(`M ${formatNumber(moved.x)} ${formatNumber(moved.y)}`);

      while (hasNextNumber()) {
        const next = readPoint(relative);
        currentX = next.x;
        currentY = next.y;
        const p = distortPoint(next.x, next.y);
        output.push(`L ${formatNumber(p.x)} ${formatNumber(p.y)}`);
      }
      continue;
    }

    if (upper === "L") {
      while (hasNextNumber()) {
        const next = readPoint(relative);
        currentX = next.x;
        currentY = next.y;
        const p = distortPoint(next.x, next.y);
        output.push(`L ${formatNumber(p.x)} ${formatNumber(p.y)}`);
      }
      continue;
    }

    if (upper === "H") {
      while (hasNextNumber()) {
        const xRaw = readNumber();
        currentX = relative ? currentX + xRaw : xRaw;
        const p = distortPoint(currentX, currentY);
        output.push(`L ${formatNumber(p.x)} ${formatNumber(p.y)}`);
      }
      continue;
    }

    if (upper === "V") {
      while (hasNextNumber()) {
        const yRaw = readNumber();
        currentY = relative ? currentY + yRaw : yRaw;
        const p = distortPoint(currentX, currentY);
        output.push(`L ${formatNumber(p.x)} ${formatNumber(p.y)}`);
      }
      continue;
    }

    if (upper === "C") {
      while (hasNextNumber()) {
        const c1 = readPoint(relative);
        const c2 = readPoint(relative);
        const end = readPoint(relative);
        currentX = end.x;
        currentY = end.y;
        const d1 = distortPoint(c1.x, c1.y);
        const d2 = distortPoint(c2.x, c2.y);
        const de = distortPoint(end.x, end.y);
        output.push(
          `C ${formatNumber(d1.x)} ${formatNumber(d1.y)} ${formatNumber(
            d2.x
          )} ${formatNumber(d2.y)} ${formatNumber(de.x)} ${formatNumber(de.y)}`
        );
      }
      continue;
    }

    if (upper === "S") {
      while (hasNextNumber()) {
        const c2 = readPoint(relative);
        const end = readPoint(relative);
        currentX = end.x;
        currentY = end.y;
        const d2 = distortPoint(c2.x, c2.y);
        const de = distortPoint(end.x, end.y);
        output.push(
          `S ${formatNumber(d2.x)} ${formatNumber(d2.y)} ${formatNumber(
            de.x
          )} ${formatNumber(de.y)}`
        );
      }
      continue;
    }

    if (upper === "Q") {
      while (hasNextNumber()) {
        const c1 = readPoint(relative);
        const end = readPoint(relative);
        currentX = end.x;
        currentY = end.y;
        const d1 = distortPoint(c1.x, c1.y);
        const de = distortPoint(end.x, end.y);
        output.push(
          `Q ${formatNumber(d1.x)} ${formatNumber(d1.y)} ${formatNumber(
            de.x
          )} ${formatNumber(de.y)}`
        );
      }
      continue;
    }

    if (upper === "T") {
      while (hasNextNumber()) {
        const end = readPoint(relative);
        currentX = end.x;
        currentY = end.y;
        const de = distortPoint(end.x, end.y);
        output.push(`T ${formatNumber(de.x)} ${formatNumber(de.y)}`);
      }
      continue;
    }

    if (upper === "A") {
      while (hasNextNumber()) {
        const rx = readNumber();
        const ry = readNumber();
        const rotation = readNumber();
        const largeArc = readNumber();
        const sweep = readNumber();
        const xRaw = readNumber();
        const yRaw = readNumber();
        const endX = relative ? currentX + xRaw : xRaw;
        const endY = relative ? currentY + yRaw : yRaw;
        currentX = endX;
        currentY = endY;
        const de = distortPoint(endX, endY);
        output.push(
          `A ${formatNumber(rx)} ${formatNumber(ry)} ${formatNumber(
            rotation
          )} ${largeArc} ${sweep} ${formatNumber(de.x)} ${formatNumber(de.y)}`
        );
      }
      continue;
    }

    if (upper === "Z") {
      currentX = subpathStartX;
      currentY = subpathStartY;
      output.push("Z");
      continue;
    }
  }

  return output.join(" ");
}

export function CantonDistortionMap() {
  const [selectedMetricId, setSelectedMetricId] = useState<string>("population");
  const [distortionStrength, setDistortionStrength] = useState<number>(1);
  const [hoveredCantonId, setHoveredCantonId] = useState<string | null>(null);

  const selectedMetric =
    metricOptions.find((m) => m.id === selectedMetricId) ?? metricOptions[0];

  const metricValues = useMemo(() => {
    return cantons.map((canton) => ({
      cantonId: canton.id,
      value: selectedMetric.getValue(canton.id),
    }));
  }, [selectedMetric]);

  const { minValue, maxValue } = useMemo(() => {
    const all = metricValues.map((m) => m.value);
    return {
      minValue: Math.min(...all),
      maxValue: Math.max(...all),
    };
  }, [metricValues]);

  const normalizedByCanton = useMemo(() => {
    const map = new Map<string, number>();
    const range = Math.max(maxValue - minValue, 1);
    metricValues.forEach(({ cantonId, value }) => {
      map.set(cantonId, (value - minValue) / range);
    });
    return map;
  }, [distortionStrength, maxValue, metricValues, minValue]);

  const distortedPaths = useMemo(() => {
    // Worldmapper-style: each canton's area scales with the metric.
    // scale = sqrt(value/minValue) so area ∝ value; clamp for readable extremes.
    const scaleByCanton = new Map<string, number>();
    if (minValue <= 0) {
      normalizedByCanton.forEach((n, id) => scaleByCanton.set(id, 0.6 + n * 0.8));
    } else {
      const minS = Math.max(minValue, 1);
      metricValues.forEach(({ cantonId, value }) => {
        let scale = Math.sqrt(Math.max(value, minS * 0.1) / minS);
        scale = Math.max(0.5, Math.min(2.2, scale));
        scaleByCanton.set(cantonId, scale);
      });
    }

    const centerX = 526.18;
    const centerY = 372.04;
    const sigma = 120;
    const sigma2 = sigma * sigma;

    // Blend scale factors by distance to canton centers; same point → same scale → contiguous borders
    const distortPoint: DistortPointFn = (x, y) => {
      let scaleSum = 0;
      let weightSum = 0;

      for (const canton of cantons) {
        const center = cantonCenters[canton.id];
        if (!center) continue;
        const dx = x - center.x;
        const dy = y - center.y;
        const d2 = dx * dx + dy * dy;
        const w = Math.exp(-d2 / (2 * sigma2));
        const scale = scaleByCanton.get(canton.id) ?? 1;
        scaleSum += scale * w;
        weightSum += w;
      }

      const blendedScale = weightSum > 0 ? scaleSum / weightSum : 1;
      // Interpolate: 0 strength = no change, full strength = full scale
      const effectiveScale = 1 + (blendedScale - 1) * distortionStrength;

      const rx = x - centerX;
      const ry = y - centerY;
      return {
        x: centerX + rx * effectiveScale,
        y: centerY + ry * effectiveScale,
      };
    };

    const map = new Map<string, string>();
    cantons.forEach((canton) => {
      const path = cantonPaths[canton.id];
      if (!path) return;
      map.set(canton.id, distortSvgPath(path, distortPoint));
    });
    return map;
  }, [distortionStrength, normalizedByCanton, metricValues, minValue]);

  const hoveredCanton = cantons.find((c) => c.id === hoveredCantonId) ?? null;
  const hoveredValue = hoveredCanton
    ? selectedMetric.getValue(hoveredCanton.id)
    : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
            Distortion metric
          </label>
          <select
            value={selectedMetricId}
            onChange={(event) => setSelectedMetricId(event.target.value)}
            className="w-full rounded-md border border-swiss-gray-300 bg-white px-3 py-2 text-sm"
          >
            {metricOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-swiss-gray-700 mb-2">
            Distortion strength: {Math.round(distortionStrength * 100)}%
          </label>
          <input
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={distortionStrength}
            onChange={(event) =>
              setDistortionStrength(Number(event.target.value))
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="rounded-xl border border-swiss-gray-200 bg-white p-2 sm:p-4">
        <div className="relative w-full aspect-[4/3]">
          <svg
            viewBox="0 0 1052.361 744.094"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <rect width="1052.361" height="744.094" fill="#f8fafc" rx="8" />

            {cantons.map((canton) => {
              const path = distortedPaths.get(canton.id);
              if (!path) return null;
              const isHovered = hoveredCantonId === canton.id;
              const normalized = normalizedByCanton.get(canton.id) ?? 0.5;
              const fillOpacity = 0.35 + normalized * 0.4;

              return (
                <path
                  key={canton.id}
                  d={path}
                  fill={`rgba(37, 99, 235, ${fillOpacity})`}
                  stroke={isHovered ? "#0f172a" : "#1e3a8a"}
                  strokeWidth={isHovered ? 1.8 : 0.8}
                  className="transition-all duration-200 cursor-default"
                  onMouseEnter={() => setHoveredCantonId(canton.id)}
                  onMouseLeave={() => setHoveredCantonId(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="rounded-lg border border-swiss-gray-200 bg-white px-4 py-3 text-sm">
        <p className="text-xs text-swiss-gray-500 mb-2">
          Worldmapper-style: canton area scales with the metric. Borders stay connected, Switzerland remains recognizable.
        </p>
        {hoveredCanton && hoveredValue !== null ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-medium text-swiss-gray-900">
              {hoveredCanton.name} ({hoveredCanton.abbreviation})
            </span>
            <span className="text-swiss-gray-700">
              {selectedMetric.label}: {formatValue(hoveredValue, selectedMetric.unit)}
            </span>
          </div>
        ) : (
          <span className="text-swiss-gray-600">
            Hover a canton to see its metric value.
          </span>
        )}
      </div>
    </div>
  );
}
