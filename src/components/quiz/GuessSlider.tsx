"use client";

import { Slider } from "@/components/ui/slider";
import { QuizQuestion } from "@/types";

interface GuessSliderProps {
  question: QuizQuestion;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function GuessSlider({ question, value, onChange, disabled }: GuessSliderProps) {
  const formatValue = (val: number) => {
    if (question.unit === "%") return `${val}%`;
    if (question.unit === "per 1000") return `${val} per 1'000`;
    if (question.unit === "per km²") return `${val}/km²`;
    if (question.unit === "rank") return `#${val}`;
    if (question.unit === "year") return val.toString();
    if (question.unit === "years") return `${val} years`;
    return `${val} ${question.unit}`;
  };

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
        className="mt-4"
      />
    </div>
  );
}
