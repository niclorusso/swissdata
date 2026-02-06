"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuizStore } from "@/stores/useQuizStore";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { GuessSlider } from "@/components/quiz/GuessSlider";
import { RevealAnimation } from "@/components/quiz/RevealAnimation";
import { ScoreCard } from "@/components/quiz/ScoreCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/data/questions";
import { useLanguage } from "@/i18n/LanguageContext";
import { Play, ArrowRight, RotateCcw, Brain } from "lucide-react";

export default function QuizPage() {
  const { t } = useLanguage();
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

  // Quiz not started - show intro
  if (!isQuizActive && !isQuizComplete) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl sm:text-4xl font-bold text-swiss-gray-900">
              {t.quiz.title}
            </h1>
            <p className="text-base sm:text-lg text-swiss-gray-600">
              {t.quiz.subtitle}
            </p>
          </div>

          {/* How it works */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                {t.quiz.howItWorks}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-swiss-gray-900">
                    {t.quiz.step1Title}
                  </p>
                  <p className="text-sm text-swiss-gray-500">
                    {t.quiz.step1Desc}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-swiss-gray-900">
                    {t.quiz.step2Title}
                  </p>
                  <p className="text-sm text-swiss-gray-500">
                    {t.quiz.step2Desc}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-swiss-gray-900">
                    {t.quiz.step3Title}
                  </p>
                  <p className="text-sm text-swiss-gray-500">
                    {t.quiz.step3Desc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz options */}
          <div className="space-y-4">
            <p className="text-center text-swiss-gray-500 text-sm sm:text-base">
              {t.quiz.chooseLength} {questions.length} {t.quiz.questionsAvailable}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap">
              <Button
                onClick={() => startQuiz(5)}
                size="lg"
                variant="outline"
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                {t.quiz.quick} (5)
              </Button>
              <Button
                onClick={() => startQuiz(10)}
                size="lg"
                variant="outline"
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                {t.quiz.standard} (10)
              </Button>
              <Button onClick={() => startQuiz(20)} size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                {t.quiz.deepDive} (20)
              </Button>
            </div>
          </div>

          {/* Sample topics preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-swiss-gray-900">
              {t.quiz.topicsCovered}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-economic/10 rounded-lg border border-economic/20">
                <p className="text-sm font-medium text-swiss-gray-700">
                  {t.quiz.topicEconomy}
                </p>
              </div>
              <div className="p-4 bg-demographic/10 rounded-lg border border-demographic/20">
                <p className="text-sm font-medium text-swiss-gray-700">
                  {t.quiz.topicPopulation}
                </p>
              </div>
              <div className="p-4 bg-social/10 rounded-lg border border-social/20">
                <p className="text-sm font-medium text-swiss-gray-700">
                  {t.quiz.topicHealthcare}
                </p>
              </div>
              <div className="p-4 bg-swiss-gray-100 rounded-lg border border-swiss-gray-200">
                <p className="text-sm font-medium text-swiss-gray-700">
                  {t.quiz.topicEnergy}
                </p>
              </div>
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
          <ScoreCard
            results={results}
            totalScore={totalScore}
            onRestart={resetQuiz}
          />
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-swiss-gray-500">{t.quiz.progress}</span>
            <span className="font-medium text-swiss-gray-700">
              {currentIndex + 1} / {selectedQuestions.length}
            </span>
          </div>
          <Progress
            value={((currentIndex + (hasRevealed ? 1 : 0)) / selectedQuestions.length) * 100}
          />
        </div>

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
                  {/* Question card */}
                  <QuestionCard
                    question={currentQuestion}
                    questionNumber={currentIndex + 1}
                    totalQuestions={selectedQuestions.length}
                  />

                  {/* Guess slider */}
                  <GuessSlider
                    question={currentQuestion}
                    value={currentGuess ?? (currentQuestion.minValue + currentQuestion.maxValue) / 2}
                    onChange={setGuess}
                  />

                  {/* Submit button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={revealAnswer}
                      size="lg"
                      disabled={currentGuess === null}
                      className="gap-2 min-w-[180px] sm:min-w-[200px]"
                    >
                      {t.quiz.revealAnswer}
                      <ArrowRight className="h-4 w-4" />
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
                  {/* Reveal animation */}
                  <RevealAnimation question={currentQuestion} result={currentResult} />

                  {/* Next button */}
                  <div className="flex justify-center pt-4">
                    <Button onClick={nextQuestion} size="lg" className="gap-2 min-w-[180px] sm:min-w-[200px]">
                      {currentIndex < selectedQuestions.length - 1 ? (
                        <>
                          {t.quiz.nextQuestion}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {t.quiz.seeResults}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Quit button */}
        <div className="flex justify-center">
          <Button
            onClick={resetQuiz}
            variant="ghost"
            size="sm"
            className="text-swiss-gray-500 gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {t.quiz.restartQuiz}
          </Button>
        </div>
      </div>
    </div>
  );
}
