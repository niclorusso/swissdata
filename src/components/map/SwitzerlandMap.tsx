"use client";

import { useState } from "react";
import { cantons } from "@/data/cantons";
import { cantonPaths, cantonCenters } from "@/data/swiss-map-paths";
import { Canton } from "@/types";

interface SwitzerlandMapProps {
  selectedCanton: string | null;
  onCantonSelect: (cantonId: string | null) => void;
  highlightIndicator?: string;
  getCantonColor?: (canton: Canton) => string;
}

export function SwitzerlandMap({
  selectedCanton,
  onCantonSelect,
  highlightIndicator,
  getCantonColor,
}: SwitzerlandMapProps) {
  const [hoveredCanton, setHoveredCanton] = useState<string | null>(null);

  const defaultGetColor = (canton: Canton) => {
    if (selectedCanton === canton.id) return "#DC2626";
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
      >
        {/* Background */}
        <rect width="1052.361" height="744.094" fill="#FAFAFA" rx="8" />

        {/* Canton paths */}
        {cantons.map((canton) => {
          const path = cantonPaths[canton.id];
          if (!path) return null;

          const isSelected = selectedCanton === canton.id;
          const isHovered = hoveredCanton === canton.id;

          return (
            <path
              key={canton.id}
              d={path}
              fill={colorFn(canton)}
              stroke={isSelected ? "#991B1B" : isHovered ? "#DC2626" : "#525252"}
              strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.5}
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredCanton(canton.id)}
              onMouseLeave={() => setHoveredCanton(null)}
              onClick={() =>
                onCantonSelect(selectedCanton === canton.id ? null : canton.id)
              }
            >
              <title>{canton.name}</title>
            </path>
          );
        })}

        {/* Country label */}
        <text
          x="526"
          y="710"
          textAnchor="middle"
          className="pointer-events-none select-none"
          fill="#A3A3A3"
          fontSize="20"
          fontWeight="500"
        >
          SWITZERLAND
        </text>
      </svg>

      {/* Hover tooltip */}
      {hoveredCanton && !selectedCanton && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white border border-swiss-gray-200 rounded-lg shadow-lg px-4 py-2 z-10">
          <p className="font-medium text-swiss-gray-900">
            {getCantonById(hoveredCanton)?.name}
          </p>
          <p className="text-xs text-swiss-gray-500">Click to select</p>
        </div>
      )}
    </div>
  );
}
