"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { dataSources } from "@/data/sources";
import { indicators } from "@/data/indicators";
import { questions } from "@/data/questions";
import { CONTACT_LABEL, CONTACT_URL, DATA_CHECKED } from "@/data/meta";
import { localePath } from "@/i18n/routes";
import { formatLongDate } from "@/lib/formatters";
import { ReportError } from "@/components/ReportError";

/** A text with {contactLink} written as the link to the author's site. */
function WithContact({ text }: { text: string }) {
  const [before, after] = text.split("{contactLink}");
  return (
    <>
      {before}
      <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px] hover:text-ink">
        {CONTACT_LABEL}
      </a>
      {after}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl sm:text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

/** What the site is, who makes it, why, how the figures are checked, how to report an error, limits, sources. */
export default function AboutPage() {
  const { t, locale } = useLanguage();
  const lastCheck = formatLongDate(DATA_CHECKED, locale);
  const p = "text-base leading-relaxed text-swiss-gray-700";

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="max-w-[68ch] space-y-8">
        <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight text-ink">{t.about.title}</h1>

        <Section title={t.about.whatTitle}>
          <p className={p}>
            {t.about.what
              .replace("{indicatorCount}", String(indicators.length))
              .replace("{questionCount}", String(questions.length))}
          </p>
        </Section>

        <Section title={t.about.whoTitle}>
          <p className={p}>
            <WithContact text={t.about.who} />
          </p>
        </Section>

        <Section title={t.about.whyTitle}>
          <p className={p}>{t.about.why}</p>
        </Section>

        <Section title={t.about.checkTitle}>
          <p className={p}>{t.about.check.replace("{lastCheck}", lastCheck)}</p>
          <p>
            <Link href={localePath(locale, "/changes")} className="inline-flex items-center min-h-[44px] text-base font-medium text-ink underline underline-offset-[3px] hover:text-swiss-gray-600">
              {t.about.changeLogLink}
            </Link>
          </p>
        </Section>

        <Section title={t.about.reportTitle}>
          <p className={p}>{t.about.report}</p>
          <ReportError withTitle={false} />
        </Section>

        <Section title={t.about.limitsTitle}>
          <ul className={`${p} list-disc pl-5 space-y-1.5`}>
            {[t.about.limit1, t.about.limit2, t.about.limit3, t.about.limit4].map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </Section>

        <Section title={t.about.quizScoreTitle}>
          <p className={p}>{t.about.quizScore}</p>
        </Section>

        <Section title={t.about.sourcesTitle}>
          <ul className="space-y-2 text-base leading-relaxed text-swiss-gray-700">
            {dataSources.map((source) => (
              <li key={source.abbr}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-[3px] hover:text-swiss-gray-600">
                  {source.name[locale]}
                </a>
                <Fragment>{" – "}</Fragment>
                {source.use[locale]}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
