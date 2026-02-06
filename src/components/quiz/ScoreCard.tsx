"use client";

import { motion } from "framer-motion";
import { QuizResult } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/i18n/LanguageContext";
import { Trophy, Target, RefreshCcw, Share2, CheckCircle2, XCircle } from "lucide-react";
import { questions } from "@/data/questions";

interface ScoreCardProps {
  results: QuizResult[];
  totalScore: number;
  onRestart: () => void;
}

export function ScoreCard({ results, totalScore, onRestart }: ScoreCardProps) {
  const { t } = useLanguage();
  const averageAccuracy = Math.round(totalScore / results.length);

  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { grade: "A+", message: t.scoreCard.dataExpert, color: "text-green-600" };
    if (accuracy >= 80) return { grade: "A", message: t.scoreCard.wellInformed, color: "text-green-600" };
    if (accuracy >= 70) return { grade: "B", message: t.scoreCard.goodKnowledge, color: "text-blue-600" };
    if (accuracy >= 60) return { grade: "C", message: t.scoreCard.roomToLearn, color: "text-yellow-600" };
    if (accuracy >= 50) return { grade: "D", message: t.scoreCard.keepExploring, color: "text-orange-600" };
    return { grade: "F", message: t.scoreCard.timeToFactCheck, color: "text-red-600" };
  };

  const { grade, message, color } = getGrade(averageAccuracy);

  const getQuestionById = (id: string) => questions.find((q) => q.id === id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main score card */}
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10"
            >
              <Trophy className="h-10 w-10 text-primary" />
            </motion.div>
          </div>
          <CardTitle className="text-xl sm:text-2xl">{t.scoreCard.quizComplete}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Grade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={`text-5xl sm:text-6xl font-bold ${color}`}>{grade}</div>
            <p className="text-base sm:text-lg text-swiss-gray-600 mt-2">{message}</p>
          </motion.div>

          {/* Accuracy */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-swiss-gray-700">
              <Target className="h-5 w-5" />
              <span className="font-medium">{t.scoreCard.averageAccuracy}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold swiss-number">{averageAccuracy}%</div>
            <Progress value={averageAccuracy} className="max-w-xs mx-auto mt-2" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button onClick={onRestart} variant="outline" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              {t.scoreCard.tryAgain}
            </Button>
            <Button
              onClick={() => {
                const text = t.scoreCard.shareText.replace("{score}", String(averageAccuracy));
                if (navigator.share) {
                  navigator.share({ title: "SwissData Quiz Result", text });
                } else {
                  navigator.clipboard.writeText(text);
                }
              }}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              {t.scoreCard.shareResult}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">{t.scoreCard.yourAnswers}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {results.map((result, index) => {
              const question = getQuestionById(result.questionId);
              const isGood = result.accuracy >= 70;

              return (
                <motion.div
                  key={result.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-swiss-gray-50"
                >
                  <div
                    className={`p-1 rounded-full shrink-0 ${
                      isGood ? "bg-green-100" : "bg-orange-100"
                    }`}
                  >
                    {isGood ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-swiss-gray-900 truncate">
                      {question?.question || t.scoreCard.unknownQuestion}
                    </p>
                    <p className="text-xs text-swiss-gray-500">
                      {t.scoreCard.yourGuess} {result.userGuess} | {t.scoreCard.actual} {result.actualValue}
                    </p>
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-semibold shrink-0 ${
                      isGood ? "text-green-600" : "text-orange-600"
                    }`}
                  >
                    {result.accuracy}%
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
