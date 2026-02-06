"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  className,
  showValue = true,
  formatValue,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <div className={cn("relative w-full", className)}>
      {showValue && (
        <div
          className="absolute -top-8 transform -translate-x-1/2 bg-swiss-gray-900 text-white px-2 py-1 rounded text-sm font-medium whitespace-nowrap"
          style={{ left: `${percentage}%` }}
        >
          {displayValue}
        </div>
      )}
      <div className="relative h-2 w-full">
        {/* Track background */}
        <div className="absolute inset-0 rounded-full bg-swiss-gray-200" />
        {/* Filled track */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-economic"
          style={{ width: `${percentage}%` }}
        />
        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={cn(
            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
            disabled && "cursor-not-allowed"
          )}
        />
        {/* Thumb */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-md transition-transform",
            !disabled && "hover:scale-110"
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
      {/* Min/Max labels */}
      <div className="flex justify-between mt-2 text-xs text-swiss-gray-500">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
    </div>
  );
}
