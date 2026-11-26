"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { NNBSP } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface SourceLineProps {
  /** who publishes the figure: full name and acronym in the language of the page */
  publisher: string;
  /** address of the table or publication */
  url: string;
  /** period the figure refers to */
  date?: string | number;
  /** when the source published it ("pubblicato il 12 novembre 2026"), if known */
  published?: string | null;
  className?: string;
}

/**
 * The source of a figure or chart, in one form in the three SwissData sites:
 * "Fonte: Ufficio federale di statistica (UST) · 2025 · pubblicato il 12 novembre 2026".
 * French puts a narrow no-break space before the colon.
 */
export function SourceLine({ publisher, url, date, published, className }: SourceLineProps) {
  const { t, locale } = useLanguage();
  const label = `${t.common.source}${locale === "fr" ? NNBSP : ""}:`;
  return (
    <p className={cn("sdf-source", className)}>
      {label}{" "}
      <a href={url} target="_blank" rel="noopener noreferrer">
        {publisher}
      </a>
      {date !== undefined && date !== "" ? ` · ${date}` : ""}
      {published ? ` · ${published}` : ""}
    </p>
  );
}
