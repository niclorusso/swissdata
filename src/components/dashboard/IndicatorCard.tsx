"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MoreInfoButton, MoreInfoPanel, useMoreInfo } from "@/components/ui/tooltip";
import { SourceLine } from "@/components/ui/source-line";
import { Indicator } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { localizeSource } from "@/i18n/sourceNames";
import { localePath } from "@/i18n/routes";
import {
  changeLine,
  firstYear,
  formatIndicatorValue,
  howToReadText,
  publishedText,
  relatedText,
  unitLine,
} from "@/lib/indicatorText";

/** The change against the previous figure, the number first and in bold. */
export function ChangeText({ indicator, className }: { indicator: Indicator; className?: string }) {
  const { locale } = useLanguage();
  const line = changeLine(indicator, locale);
  if (!line) return null;
  return (
    <p data-change-kind={indicator.changeKind} className={className}>
      {line.before}
      {line.delta && <strong className="font-semibold text-ink swiss-number">{line.delta}</strong>}
      {line.after}
    </p>
  );
}

/**
 * A figure on the home page. In this order: title and "?", value, unit line, change, definition, the "?"
 * panel (context, the other official measure, how to read), source line, link to the chart.
 */
export function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const { t, locale } = useLanguage();
  const info = useMoreInfo();
  const related = relatedText(indicator, locale);
  const howToRead = howToReadText(indicator, locale);

  return (
    <Card data-indicator={indicator.id} className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-ink">{indicator.shortName}</h3>
        <MoreInfoButton info={info} label={t.indicatorCard.more.replace("{title}", indicator.shortName)} />
      </div>

      <p data-value="" className="mt-2 text-[1.875rem] leading-tight font-bold swiss-number text-ink">
        {formatIndicatorValue(indicator, locale)}
      </p>
      <p data-unit-line="" className="mt-1 text-sm text-swiss-gray-600">
        {unitLine(indicator, locale)}
      </p>
      <ChangeText indicator={indicator} className="mt-2 text-sm text-swiss-gray-700" />
      <p data-definition="" className="mt-2 text-sm leading-relaxed text-swiss-gray-700">
        {indicator.description}
      </p>

      <MoreInfoPanel info={info} className="mt-3">
        {indicator.acronym && <p>{indicator.acronym}</p>}
        {indicator.context && <p>{indicator.context}</p>}
        {related && <p>{related}</p>}
        {howToRead && <p>{howToRead}</p>}
      </MoreInfoPanel>

      <div className="mt-auto">
        <SourceLine
          publisher={localizeSource(indicator.source, locale)}
          url={indicator.sourceUrl}
          published={publishedText(indicator, locale)}
        />
        <Link
          href={`${localePath(locale, "/statistics")}#${indicator.id}`}
          className="inline-flex items-center min-h-[44px] text-sm font-medium text-ink underline-offset-[3px] hover:underline"
        >
          {t.indicatorCard.chartLink.replace("{firstYear}", String(firstYear(indicator)))}
        </Link>
      </div>
    </Card>
  );
}
