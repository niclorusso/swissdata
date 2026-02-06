"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

export function Progress({
  value,
  max = 100,
  className,
  indicatorClassName,
  showLabel = false,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("relative", className)}>
      <div className="h-2 w-full rounded-full bg-swiss-gray-200 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-500 ease-out",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="absolute right-0 -top-6 text-sm font-medium text-swiss-gray-700">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
