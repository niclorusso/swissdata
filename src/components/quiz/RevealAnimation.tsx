"use client";

import { motion } from "framer-motion";
import { QuizQuestion, QuizResult } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { quizTextLang } from "@/i18n/dataTranslations";
import { BarChart3, Info } from "lucide-react";
import { formatNumber, formatPercent, formatWithUnit, ownDecimals } from "@/lib/formatters";
import { SourceLine } from "@/components/ui/source-line";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface RevealAnimationProps {
  question: QuizQuestion;
  result: QuizResult;
}

export function RevealAnimation({ question, result }: RevealAnimationProps) {
  const { t, locale } = useLanguage();
  const isGoodGuess = result.accuracy >= 70;
  const formatValue = (val: number) => formatWithUnit(val, question.unit, locale);

  // every bar label with the decimals of the most precise value (16.0 beside 17.6, not 16)
  const chartDecimals = Math.max(0, ...(question.comparisonData ?? []).map((point) => ownDecimals(point.value)));

  // Calculate chart height based on number of items
  const chartHeight = question.comparisonData
    ? Math.max(160, question.comparisonData.length * 28)
    : 160;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Accuracy score */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold ${
            isGoodGuess
              ? "bg-green-100 text-green-800"
              : "bg-orange-100 text-orange-800"
          }`}
        >
          {formatPercent(result.accuracy, locale, { decimals: 0 })} {t.reveal.accurate}
        </motion.div>
      </div>

      {/* Values comparison */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-swiss-gray-50 rounded-lg p-3 sm:p-4 text-center"
        >
          <p className="text-sm text-swiss-gray-600 mb-1">{t.reveal.yourGuess}</p>
          <p className="text-xl sm:text-2xl font-bold swiss-number text-swiss-gray-700">
            {formatValue(result.userGuess)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary/10 rounded-lg p-3 sm:p-4 text-center"
        >
          <p className="text-sm text-accent-foreground mb-1">{t.reveal.actualValue}</p>
          <p className="text-xl sm:text-2xl font-bold swiss-number text-accent-foreground">
            {formatValue(result.actualValue)}
          </p>
        </motion.div>
      </div>

      {/* Context / Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white border border-swiss-gray-200 rounded-lg p-4 sm:p-6"
      >
        <h4 className="font-semibold text-swiss-gray-900 mb-3 flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          {t.reveal.context}
        </h4>
        <p className="text-sm sm:text-base text-swiss-gray-700 leading-relaxed" lang={quizTextLang(locale)}>{question.explanation}</p>

        {/* Comparison chart if available */}
        {question.comparisonData && question.comparisonData.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <p className="text-sm font-medium text-swiss-gray-600 mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {question.comparisonLabel ?? t.reveal.internationalComparison}
            </p>
            <div style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={question.comparisonData}
                  layout="vertical"
                  margin={{ top: 0, right: 56, left: 8, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#4B5058", fontSize: 14 }}
                    width={96}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                    <LabelList dataKey="value" position="right" fill="#4B5058" fontSize={14} formatter={(value: number) => formatNumber(value, locale, { decimals: chartDecimals })} />
                    {question.comparisonData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.label === "Switzerland" ||
                          entry.label.includes("Swiss")
                            ? "#D82525"
                            : "#A9A69C"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <SourceLine publisher={question.source} url={question.sourceUrl} date={question.period} />
      </motion.div>
    </motion.div>
  );
}
