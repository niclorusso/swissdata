"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface SourceLineProps {
  /** who publishes the figure */
  publisher: string;
  /** address of the table or publication */
  url: string;
  /** reference date or year of the figure */
  date?: string | number;
  className?: string;
}

/** The source of a figure or chart, in one form everywhere: "Source: publisher (link) · date". */
export function SourceLine({ publisher, url, date, className }: SourceLineProps) {
  const { t } = useLanguage();
  return (
    <p className={cn("sdf-source", className)}>
      {t.common.source}:{" "}
      <a href={url} target="_blank" rel="noopener noreferrer">
        {publisher}
      </a>
      {date !== undefined && date !== "" ? ` · ${date}` : ""}
    </p>
  );
}
