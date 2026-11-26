"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { changeLog } from "@/data/changeLog";
import { DATA_CHECKED } from "@/data/meta";
import { colon, formatLongDate, formatNumber } from "@/lib/formatters";
import { localizeLabel } from "@/i18n/places";
import { ReportError } from "@/components/ReportError";

/** Dated corrections and updates of the figures, newest first, grouped by day. */
export default function ChangesPage() {
  const { t, locale } = useLanguage();
  const dates = Array.from(new Set(changeLog.map((entry) => entry.date))).sort().reverse();

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="max-w-[68ch] space-y-8">
        <header className="space-y-3">
          <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight text-ink">{t.changes.title}</h1>
          <p className="text-base sm:text-lg text-swiss-gray-600">
            {t.changes.intro.replace("{lastCheck}", formatLongDate(DATA_CHECKED, locale))}
          </p>
        </header>

        {dates.map((date) => (
          <section key={date} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-ink">
              <time dateTime={date}>{formatLongDate(date, locale)}</time>
            </h2>
            <ul className="space-y-5">
              {changeLog
                .filter((entry) => entry.date === date)
                .map((entry) => (
                  <li key={entry.id} className="border-t border-line pt-4 space-y-2">
                    <p className="text-sm font-semibold text-swiss-gray-600">
                      {entry.kind === "update" ? t.changes.update : t.changes.correction}
                    </p>
                    <p className="text-base text-ink leading-relaxed">{entry.text[locale]}</p>
                    {entry.items && (
                      <ul className="list-disc pl-5 space-y-1.5 text-base text-ink leading-relaxed">
                        {entry.items.map((item, i) => (
                          <li key={i}>{item[locale]}</li>
                        ))}
                      </ul>
                    )}
                    {entry.values && (
                      <ul
                        className={
                          entry.values.length > 8
                            ? "grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 text-base text-ink leading-relaxed"
                            : "list-disc pl-5 space-y-1 text-base text-ink leading-relaxed"
                        }
                      >
                        {entry.values.map((row) => (
                          <li key={row.label}>
                            {localizeLabel(row.label, locale) + colon(locale)}{" "}
                            {row.before === undefined
                              ? `${formatNumber(row.after ?? 0, locale, { decimals: entry.decimals })} (${t.changes.added})`
                              : `${formatNumber(row.before, locale, { decimals: entry.decimals })} → ${
                                  row.after === undefined
                                    ? t.changes.removed
                                    : formatNumber(row.after, locale, { decimals: entry.decimals })
                                }`}
                          </li>
                        ))}
                      </ul>
                    )}
                    {entry.source && (
                      <p className="sdf-source !border-0 !pt-0 !mt-1">
                        {t.changes.source + colon(locale)}{" "}
                        <a href={entry.source.url} target="_blank" rel="noopener noreferrer">
                          {entry.source.name[locale]}
                        </a>
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <ReportError />
      </div>
    </div>
  );
}
