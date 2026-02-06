"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, className, side = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current?.getBoundingClientRect();
      const tooltipWidth = tooltipRect?.width || 200;
      const tooltipHeight = tooltipRect?.height || 100;

      let top = 0;
      let left = 0;

      switch (side) {
        case "top":
          top = rect.top - tooltipHeight - 8 + window.scrollY;
          left = rect.left + rect.width / 2 - tooltipWidth / 2 + window.scrollX;
          break;
        case "bottom":
          top = rect.bottom + 8 + window.scrollY;
          left = rect.left + rect.width / 2 - tooltipWidth / 2 + window.scrollX;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipHeight / 2 + window.scrollY;
          left = rect.left - tooltipWidth - 8 + window.scrollX;
          break;
        case "right":
          top = rect.top + rect.height / 2 - tooltipHeight / 2 + window.scrollY;
          left = rect.right + 8 + window.scrollX;
          break;
      }

      // Keep tooltip within viewport
      left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
      top = Math.max(8, top);

      setPosition({ top, left });
    }
  }, [isVisible, side]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex"
      >
        {children}
      </div>
      {isVisible &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            className={cn(
              "fixed z-50 max-w-xs px-3 py-2 text-sm bg-swiss-gray-900 text-white rounded-lg shadow-lg",
              "animate-in fade-in-0 zoom-in-95 duration-150",
              className
            )}
            style={{ top: position.top, left: position.left }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

// Simple info button with tooltip
interface InfoTooltipProps {
  content: ReactNode;
  className?: string;
}

export function InfoTooltip({ content, className }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className={cn(
          "inline-flex items-center justify-center w-4 h-4 rounded-full",
          "bg-swiss-gray-200 text-swiss-gray-500 hover:bg-swiss-gray-300 hover:text-swiss-gray-700",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
          "text-[10px] font-semibold leading-none",
          className
        )}
        aria-label="More information"
      >
        ?
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-64 p-3 mt-2 right-0",
            "bg-white border border-swiss-gray-200 rounded-lg shadow-lg",
            "text-sm text-swiss-gray-700",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
