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
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className={cn(
          "inline-flex items-center justify-center w-5 h-5 rounded-full",
          "text-swiss-gray-400 hover:text-swiss-gray-600 hover:bg-swiss-gray-100",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
          className
        )}
        aria-label="More information"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 .75.75 0 011.06 1.06zm.78 3.81c-.165.248-.399.513-.706.788-.49.44-.906.662-1.242.662a.75.75 0 000 1.5c.697 0 1.34-.349 1.94-.889a7.71 7.71 0 00.966-1.067.75.75 0 00-1.154-.956c-.03.04-.06.08-.092.12a5.61 5.61 0 01-.247.299.75.75 0 00-.15.205c-.077.154-.115.32-.115.49v.003a.75.75 0 001.5 0v-.003c0-.05.004-.1.012-.15a.75.75 0 00-.062-.252zM10 15a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
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
