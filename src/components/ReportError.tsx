"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { reportErrorUrl } from "@/data/meta";

/** "Report an error": a link that opens a new issue with a short template, and the note that it needs a GitHub account. */
export function ReportError({ withTitle = true }: { withTitle?: boolean }) {
  const { t, locale } = useLanguage();
  return (
    <section className="space-y-2">
      {withTitle && <h2 className="text-xl sm:text-2xl font-semibold text-ink">{t.changes.reportTitle}</h2>}
      <p>
        <a
          href={reportErrorUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-[44px] text-base font-medium text-ink underline underline-offset-[3px] hover:text-swiss-gray-600"
        >
          {t.changes.reportLink}
        </a>
      </p>
      <p className="text-sm text-swiss-gray-600">{t.changes.reportNote}</p>
    </section>
  );
}
