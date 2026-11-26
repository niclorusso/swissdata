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
  /** what the button explains, for screen readers */
  label?: string;
}

export function InfoTooltip({ content, className, label }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      {/* the visible circle is small; the button around it is 44px on phones so that it can be tapped */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        onKeyDown={(event) => event.key === "Escape" && setIsOpen(false)}
        aria-expanded={isOpen}
        aria-label={label ?? "?"}
        className={cn(
          "group inline-flex items-center justify-center -my-3 sm:my-0 min-w-[44px] min-h-[44px] sm:min-w-[24px] sm:min-h-[24px]",
          "focus:outline-none",
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center w-5 h-5 rounded-full",
            "bg-swiss-gray-200 text-swiss-gray-700 group-hover:bg-swiss-gray-300 group-focus-visible:ring-2 group-focus-visible:ring-primary",
            "text-sm font-semibold leading-none"
          )}
        >
          ?
        </span>
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-64 p-3 top-full right-0",
            "bg-white border border-line rounded-xl shadow-lg",
            "text-sm font-normal text-swiss-gray-700",
            "animate-in fade-in-0 zoom-in-95 duration-150"
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
