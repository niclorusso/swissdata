"use client";

import { Slider } from "@/components/ui/slider";
import { QuizQuestion } from "@/types";
import { formatWithUnit } from "@/lib/formatters";
import { useLanguage } from "@/i18n/LanguageContext";

interface GuessSliderProps {
  question: QuizQuestion;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function GuessSlider({ question, value, onChange, disabled }: GuessSliderProps) {
  const { locale } = useLanguage();
  const formatValue = (val: number) => formatWithUnit(val, question.unit, locale);

  // Calculate step based on range and unit type
  // Rankings and years should always use whole numbers
  const range = question.maxValue - question.minValue;
  const isWholeNumberUnit = question.unit === "rank" || question.unit === "year" || question.unit === "years";
  const step = isWholeNumberUnit ? 1 : range > 100 ? 5 : range > 20 ? 1 : 0.5;

  return (
    <div className="py-8 px-4">
      <Slider
        value={value}
        onChange={onChange}
        min={question.minValue}
        max={question.maxValue}
        step={step}
        disabled={disabled}
        formatValue={formatValue}
        label={question.question}
        className="mt-4"
      />
    </div>
  );
}
