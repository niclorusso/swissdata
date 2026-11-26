"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/stores/useQuizStore";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { GuessSlider } from "@/components/quiz/GuessSlider";
import { RevealAnimation } from "@/components/quiz/RevealAnimation";
import { ScoreCard } from "@/components/quiz/ScoreCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowRight, RotateCcw } from "lucide-react";

const LENGTHS = [5, 10, 20] as const;

export default function QuizPage() {
  const { t, locale } = useLanguage();
  const {
    selectedQuestions,
    currentIndex,
    isQuizActive,
    isQuizComplete,
    currentGuess,
    hasRevealed,
    results,
    totalScore,
    startQuiz,
    setGuess,
    revealAnswer,
    nextQuestion,
    resetQuiz,
  } = useQuizStore();

  const currentQuestion = selectedQuestions[currentIndex];
  const currentResult = results[currentIndex];

  // Initialize guess to middle of range when question changes
  useEffect(() => {
    if (currentQuestion && currentGuess === null) {
      const midpoint = (currentQuestion.minValue + currentQuestion.maxValue) / 2;
      setGuess(midpoint);
    }
  }, [currentQuestion, currentGuess, setGuess]);

  // Before the first question: what the quiz is and where the answers come from
  if (!isQuizActive && !isQuizComplete) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-10">
        <div className="max-w-[68ch] space-y-5">
          <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight text-ink">{t.quiz.title}</h1>
          <p className="text-base sm:text-lg text-swiss-gray-700 leading-relaxed">
            {t.quiz.intro.replace("{questionCount}", String(questions.length))}
          </p>
          {t.quiz.languageNote && (
            <p className="text-sm text-swiss-gray-700 bg-white border border-line rounded-xl px-4 py-3">{t.quiz.languageNote}</p>
          )}
          <div className="space-y-3 pt-2">
            <p className="text-base font-medium text-ink">{t.quiz.chooseLength}</p>
            <div className="flex flex-wrap gap-3">
              {LENGTHS.map((n) => (
                <Button key={n} onClick={() => startQuiz(n, locale)} size="lg" variant={n === 10 ? "default" : "outline"}>
                  {t.quiz.length.replace("{n}", String(n))}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz complete - show results
  if (isQuizComplete) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <ScoreCard results={results} totalScore={totalScore} onRestart={resetQuiz} />
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Progress value={((currentIndex + (hasRevealed ? 1 : 0)) / selectedQuestions.length) * 100} />

        <Card>
          <CardContent className="pt-6 px-4 sm:px-6">
            <AnimatePresence mode="wait">
              {!hasRevealed ? (
                <motion.div
                  key={`question-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <QuestionCard
                    question={currentQuestion}
                    questionNumber={currentIndex + 1}
                    totalQuestions={selectedQuestions.length}
                  />

                  <GuessSlider
                    question={currentQuestion}
                    value={currentGuess ?? (currentQuestion.minValue + currentQuestion.maxValue) / 2}
                    onChange={setGuess}
                  />

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={revealAnswer}
                      size="lg"
                      disabled={currentGuess === null}
                      className="gap-2 min-w-[180px] sm:min-w-[200px]"
                    >
                      {t.quiz.revealAnswer}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`reveal-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <RevealAnimation question={currentQuestion} result={currentResult} />

                  <div className="flex justify-center pt-4">
                    <Button onClick={nextQuestion} size="lg" className="gap-2 min-w-[180px] sm:min-w-[200px]">
                      {currentIndex < selectedQuestions.length - 1 ? t.quiz.nextQuestion : t.quiz.seeResults}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={resetQuiz} variant="ghost" size="sm" className="text-swiss-gray-600 gap-2 h-11">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t.quiz.restartQuiz}
          </Button>
        </div>
      </div>
    </div>
  );
}
