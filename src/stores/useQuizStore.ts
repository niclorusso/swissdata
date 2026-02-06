import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuizQuestion, QuizResult } from "@/types";
import { questions, getRandomQuestions } from "@/data/questions";
import { calculateAccuracy } from "@/lib/formatters";

interface QuizState {
  // Quiz configuration
  selectedQuestions: QuizQuestion[];
  currentIndex: number;
  isQuizActive: boolean;
  isQuizComplete: boolean;

  // Current question state
  currentGuess: number | null;
  hasRevealed: boolean;

  // Results
  results: QuizResult[];
  totalScore: number;

  // Actions
  startQuiz: (count?: number) => void;
  setGuess: (value: number) => void;
  revealAnswer: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  getAverageAccuracy: () => number;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      selectedQuestions: [],
      currentIndex: 0,
      isQuizActive: false,
      isQuizComplete: false,
      currentGuess: null,
      hasRevealed: false,
      results: [],
      totalScore: 0,

      startQuiz: (count = 5) => {
        const selected = getRandomQuestions(Math.min(count, questions.length));
        set({
          selectedQuestions: selected,
          currentIndex: 0,
          isQuizActive: true,
          isQuizComplete: false,
          currentGuess: null,
          hasRevealed: false,
          results: [],
          totalScore: 0,
        });
      },

      setGuess: (value: number) => {
        set({ currentGuess: value });
      },

      revealAnswer: () => {
        const state = get();
        const currentQuestion = state.selectedQuestions[state.currentIndex];

        if (!currentQuestion || state.currentGuess === null) return;

        const range = currentQuestion.maxValue - currentQuestion.minValue;
        const accuracy = calculateAccuracy(
          state.currentGuess,
          currentQuestion.actualValue,
          range
        );

        const result: QuizResult = {
          questionId: currentQuestion.id,
          userGuess: state.currentGuess,
          actualValue: currentQuestion.actualValue,
          accuracy,
        };

        set((state) => ({
          hasRevealed: true,
          results: [...state.results, result],
          totalScore: state.totalScore + accuracy,
        }));
      },

      nextQuestion: () => {
        const state = get();
        const nextIndex = state.currentIndex + 1;

        if (nextIndex >= state.selectedQuestions.length) {
          set({
            isQuizComplete: true,
            isQuizActive: false,
          });
        } else {
          set({
            currentIndex: nextIndex,
            currentGuess: null,
            hasRevealed: false,
          });
        }
      },

      resetQuiz: () => {
        set({
          selectedQuestions: [],
          currentIndex: 0,
          isQuizActive: false,
          isQuizComplete: false,
          currentGuess: null,
          hasRevealed: false,
          results: [],
          totalScore: 0,
        });
      },

      getAverageAccuracy: () => {
        const state = get();
        if (state.results.length === 0) return 0;
        return Math.round(state.totalScore / state.results.length);
      },
    }),
    {
      name: "swiss-data-quiz",
      partialize: (state) => ({
        results: state.results,
        totalScore: state.totalScore,
      }),
    }
  )
);
