"use client";

import { motion } from "framer-motion";
import { QuizQuestion } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import { HelpCircle } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
  const { t } = useLanguage();

  const categoryVariant =
    question.category === "economic"
      ? "economic"
      : question.category === "demographic"
      ? "demographic"
      : "social";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-swiss-gray-500">
        <span>
          {t.questionCard.question} {questionNumber} {t.questionCard.of} {totalQuestions}
        </span>
        <Badge variant={categoryVariant}>{question.category}</Badge>
      </div>

      {/* Question display */}
      <div className="bg-swiss-gray-50 border border-swiss-gray-200 rounded-lg p-4 sm:p-8">
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-swiss-gray-100 rounded-full">
            <HelpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-swiss-gray-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-swiss-gray-500 uppercase tracking-wide mb-2 sm:mb-3">
              {t.questionCard.testKnowledge}
            </p>
            <p className="text-lg sm:text-xl font-semibold text-swiss-gray-900 leading-relaxed">
              {question.question}
            </p>
          </div>
        </div>
      </div>

      {/* Hint about what they're guessing */}
      <div className="text-center">
        <p className="text-xs sm:text-sm text-swiss-gray-500">
          {t.questionCard.sliderHint}
        </p>
      </div>
    </motion.div>
  );
}
