"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { reportErrorUrl } from "@/data/meta";
import { SITE_URL } from "@/i18n/routes";

/**
 * "Report an error": a link that opens a new issue with a short template (the address of this page already filled in),
 * and the note that it needs a GitHub account.
 */
export function ReportError({ withTitle = true }: { withTitle?: boolean }) {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  return (
    <section className="space-y-2">
      {withTitle && <h2 className="text-xl sm:text-2xl font-semibold text-ink">{t.changes.reportTitle}</h2>}
      <p>
        <a
          href={reportErrorUrl(locale, SITE_URL + pathname)}
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
