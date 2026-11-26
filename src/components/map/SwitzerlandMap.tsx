"use client";

import { useState } from "react";
import { cantons } from "@/data/cantons";
import { cantonPaths, cantonCenters } from "@/data/swiss-map-paths";
import { Canton } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { cantonName } from "@/lib/utils";

interface SwitzerlandMapProps {
  selectedCanton: string | null;
  onCantonSelect: (cantonId: string | null) => void;
  highlightIndicator?: string;
  getCantonColor?: (canton: Canton) => string;
  isCantonDimmed?: (canton: Canton) => boolean;
}

export function SwitzerlandMap({
  selectedCanton,
  onCantonSelect,
  highlightIndicator,
  getCantonColor,
  isCantonDimmed,
}: SwitzerlandMapProps) {
  const [hoveredCanton, setHoveredCanton] = useState<string | null>(null);
  const { t, locale } = useLanguage();

  const defaultGetColor = (canton: Canton) => {
    if (selectedCanton === canton.id) return "#D82525";
    if (hoveredCanton === canton.id) return "#FCA5A5";
    return "#E5E5E5";
  };

  const colorFn = getCantonColor || defaultGetColor;

  const getCantonById = (id: string) => cantons.find((c) => c.id === id);

  return (
    <div className="relative w-full aspect-[4/3]">
      <svg
        viewBox="0 0 1052.361 744.094"
        className="w-full h-full"
        style={{ maxHeight: "600px" }}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={t.cantons.title}
      >
        {/* Background */}
        <rect width="1052.361" height="744.094" fill="#F5F4EF" rx="8" />

        {/* Canton paths */}
        {cantons.map((canton) => {
          const path = cantonPaths[canton.id];
          if (!path) return null;

          const isSelected = selectedCanton === canton.id;
          const isHovered = hoveredCanton === canton.id;
          // A faded canton keeps its border at full strength; the selected canton is never faded
          const isDimmed = !isSelected && isCantonDimmed ? isCantonDimmed(canton) : false;

          return (
            <path
              key={canton.id}
              d={path}
              fill={colorFn(canton)}
              stroke={isSelected ? "#991B1B" : isHovered ? "#D82525" : "#525252"}
              strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.5}
              fillOpacity={isDimmed ? 0.2 : 1}
              data-canton={canton.id}
              data-dimmed={isDimmed ? "true" : undefined}
              className="cursor-pointer transition-[fill,stroke,fill-opacity] duration-200 motion-reduce:transition-none"
              onMouseEnter={() => setHoveredCanton(canton.id)}
              onMouseLeave={() => setHoveredCanton(null)}
              onClick={() =>
                onCantonSelect(selectedCanton === canton.id ? null : canton.id)
              }
            >
              <title>{cantonName(canton, locale)}</title>
            </path>
          );
        })}

      </svg>

      {/* Hover tooltip */}
      {hoveredCanton && !selectedCanton && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white border border-swiss-gray-200 rounded-lg shadow-lg px-4 py-2 z-10">
          <p className="font-medium text-swiss-gray-900">
            {getCantonById(hoveredCanton) ? cantonName(getCantonById(hoveredCanton)!, locale) : ""}
          </p>
          <p className="text-sm text-swiss-gray-600">{t.cantons.clickToSelect}</p>
        </div>
      )}
    </div>
  );
}
