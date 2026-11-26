"use client";

import { motion } from "framer-motion";
import { QuizQuestion, QuizResult } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { quizTextLang } from "@/i18n/dataTranslations";
import { isSwissLabel, localizeLabel } from "@/i18n/places";
import { formatNumber, formatPercent, formatWithUnit, ownDecimals } from "@/lib/formatters";
import { SourceLine } from "@/components/ui/source-line";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts";

interface RevealAnimationProps {
  question: QuizQuestion;
  result: QuizResult;
}

/** The answer: accuracy, estimate and answer, explanation, comparison chart, source. */
export function RevealAnimation({ question, result }: RevealAnimationProps) {
  const { t, locale } = useLanguage();
  const formatValue = (val: number) => formatWithUnit(val, question.unit, locale);

  // every bar label with the decimals of the most precise value (16.0 beside 17.6, not 16)
  const chartDecimals = Math.max(0, ...(question.comparisonData ?? []).map((point) => ownDecimals(point.value)));
  // bar labels in the language of the page; the key stays the label of the data file
  const chartData = (question.comparisonData ?? []).map((point) => ({ ...point, key: point.label, label: localizeLabel(point.label, locale) }));
  const chartHeight = chartData.length ? Math.max(160, chartData.length * 28) : 160;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold bg-swiss-gray-100 text-ink swiss-number" data-accuracy="">
          {t.reveal.accuracy.replace("{value}", formatPercent(result.accuracy, locale, { decimals: 0 }))}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-swiss-gray-50 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-sm text-swiss-gray-600 mb-1">{t.reveal.yourGuess}</p>
          <p className="text-xl sm:text-2xl font-bold swiss-number text-swiss-gray-700">{formatValue(result.userGuess)}</p>
        </div>
        <div className="bg-primary/10 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-sm text-accent-foreground mb-1">{t.reveal.actualValue}</p>
          <p className="text-xl sm:text-2xl font-bold swiss-number text-accent-foreground">{formatValue(result.actualValue)}</p>
        </div>
      </div>

      <div className="bg-white border border-swiss-gray-200 rounded-lg p-4 sm:p-6">
        <h2 className="font-semibold text-ink mb-3">{t.reveal.context}</h2>
        <p className="text-sm sm:text-base text-swiss-gray-700 leading-relaxed" lang={quizTextLang(locale)}>
          {question.explanation}
        </p>

        {chartData.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <p className="text-sm font-medium text-swiss-gray-600 mb-3" lang={question.comparisonLabel ? quizTextLang(locale) : undefined}>
              {question.comparisonLabel ?? t.reveal.internationalComparison}
            </p>
            <div style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 56, left: 8, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#4B5058", fontSize: 14 }} width={112} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                    <LabelList dataKey="value" position="right" fill="#4B5058" fontSize={14} formatter={(value: number) => formatNumber(value, locale, { decimals: chartDecimals })} />
                    {chartData.map((entry) => (
                      <Cell key={entry.key} fill={isSwissLabel(entry.key) ? "#D82525" : "#A9A69C"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <SourceLine publisher={question.source[locale]} url={question.sourceUrl} date={question.period} />
      </div>
    </motion.div>
  );
}
