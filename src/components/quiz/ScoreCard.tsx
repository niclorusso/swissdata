"use client";

import { QuizResult } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SourceLine } from "@/components/ui/source-line";
import { publishedText } from "@/lib/indicatorText";
import { useLanguage } from "@/i18n/LanguageContext";
import { quizTextLang } from "@/i18n/dataTranslations";
import { SITE_URL, localePath } from "@/i18n/routes";
import { RefreshCcw, Share2 } from "lucide-react";
import { getLocalizedQuestions } from "@/data/questions";
import { formatPercent, formatWithUnit } from "@/lib/formatters";

interface ScoreCardProps {
  results: QuizResult[];
  totalScore: number;
  onRestart: () => void;
}

/** The result: average accuracy and, for each question, the estimate, the answer and the source. */
export function ScoreCard({ results, totalScore, onRestart }: ScoreCardProps) {
  const { t, locale } = useLanguage();
  const averageAccuracy = Math.round(totalScore / results.length);
  const average = formatPercent(averageAccuracy, locale, { decimals: 0 });

  const localizedQuestions = getLocalizedQuestions(locale);
  const getQuestionById = (id: string) => localizedQuestions.find((q) => q.id === id);

  const share = () => {
    const url = SITE_URL + localePath(locale, "/quiz");
    const text = t.scoreCard.shareText.replace("{score}", average).replace("{n}", String(results.length));
    if (navigator.share) {
      navigator.share({ title: t.scoreCard.shareTitle, text, url }).catch(() => undefined);
    } else {
      navigator.clipboard?.writeText(`${text} ${url}`).catch(() => undefined);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 sm:p-6">
        <h1 className="text-[1.75rem] sm:text-[2.5rem] font-bold leading-tight text-ink">{t.scoreCard.title}</h1>
        <p className="mt-3 text-lg font-semibold text-ink swiss-number" data-average="">
          {t.scoreCard.averageAccuracy.replace("{value}", average)}
        </p>
        <Progress value={averageAccuracy} className="max-w-xs mt-2" />
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button onClick={onRestart} variant="outline" className="gap-2">
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            {t.scoreCard.newQuiz}
          </Button>
          <Button onClick={share} className="gap-2">
            <Share2 className="h-4 w-4" aria-hidden="true" />
            {t.scoreCard.shareResult}
          </Button>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-ink">{t.scoreCard.answers}</h2>
        <ol className="mt-3 space-y-3 sm:space-y-4">
          {results.map((result) => {
            const question = getQuestionById(result.questionId);
            const value = (v: number) => (question ? formatWithUnit(v, question.unit, locale) : String(v));
            return (
              <li key={result.questionId} className="p-3 rounded-lg bg-swiss-gray-50">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-ink" lang={quizTextLang(locale)}>
                    {question?.question || t.scoreCard.unknownQuestion}
                  </p>
                  <span className="text-sm font-semibold shrink-0 swiss-number text-ink">
                    {formatPercent(result.accuracy, locale, { decimals: 0 })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-swiss-gray-700 swiss-number">
                  {t.scoreCard.estimateAnswer.replace("{guess}", value(result.userGuess)).replace("{answer}", value(result.actualValue))}
                </p>
                {question && <SourceLine className="!mt-2 !pt-2" publisher={question.source[locale]} url={question.sourceUrl} date={question.period} published={publishedText(question, locale)} />}
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
