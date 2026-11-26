"use client";

import { motion } from "framer-motion";
import { QuizQuestion } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import { quizTextLang } from "@/i18n/dataTranslations";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  const { t, locale } = useLanguage();

  const categoryVariant =
    question.category === "economic" ? "economic" : question.category === "demographic" ? "demographic" : "social";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between text-sm text-swiss-gray-600">
        <span>
          {t.questionCard.question} {questionNumber} {t.questionCard.of} {totalQuestions}
        </span>
        <Badge variant={categoryVariant}>{t.categoryName[question.category]}</Badge>
      </div>

      <p className="text-lg sm:text-xl font-semibold text-ink leading-relaxed" lang={quizTextLang(locale)}>
        {question.question}
      </p>

      <p className="text-sm text-swiss-gray-600">{t.questionCard.sliderHint}</p>
    </motion.div>
  );
}
