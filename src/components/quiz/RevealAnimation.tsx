"use client";

import { motion } from "framer-motion";
import { QuizQuestion, QuizResult } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { ExternalLink, BarChart3, Info } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface RevealAnimationProps {
  question: QuizQuestion;
  result: QuizResult;
}

export function RevealAnimation({ question, result }: RevealAnimationProps) {
  const { t } = useLanguage();
  const isGoodGuess = result.accuracy >= 70;
  const formatValue = (val: number) => {
    if (question.unit === "%") return `${val}%`;
    if (question.unit === "per 1000") return `${val} per 1'000`;
    if (question.unit === "per km²") return `${val}/km²`;
    if (question.unit === "rank") return `#${val}`;
    if (question.unit === "year") return val.toString();
    if (question.unit === "years") return `${val} years`;
    if (question.unit === "hours") return `${val}h`;
    return `${val} ${question.unit}`;
  };

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
          {result.accuracy}% {t.reveal.accurate}
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
          <p className="text-xs sm:text-sm text-swiss-gray-500 mb-1">{t.reveal.yourGuess}</p>
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
          <p className="text-xs sm:text-sm text-primary/80 mb-1">{t.reveal.actualValue}</p>
          <p className="text-xl sm:text-2xl font-bold swiss-number text-primary">
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
        <p className="text-sm sm:text-base text-swiss-gray-700 leading-relaxed">{question.explanation}</p>

        {/* Comparison chart if available */}
        {question.comparisonData && question.comparisonData.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm font-medium text-swiss-gray-500 mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {t.reveal.internationalComparison}
            </p>
            <div style={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={question.comparisonData}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 80, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#525252", fontSize: 11 }}
                    width={75}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {question.comparisonData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.label === "Switzerland" ||
                          entry.label.includes("Swiss")
                            ? "#DC2626"
                            : "#D4D4D4"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Source */}
        <div className="mt-4 pt-4 border-t border-swiss-gray-100 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-swiss-gray-500">{question.source}</span>
          <a
            href={question.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-primary hover:underline"
          >
            {t.reveal.viewSource}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
