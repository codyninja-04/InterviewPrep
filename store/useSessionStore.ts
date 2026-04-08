import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ParsedJD, Question, AnswerScore } from "@/lib/types";

interface SessionState {
  // Raw JD text carried forward from the input page
  rawJD: string;
  // Gemini-parsed job description
  parsedJD: ParsedJD | null;
  // Generated question set
  questions: Question[];

  // Actions
  setRawJD: (jd: string) => void;
  setParsedJD: (data: ParsedJD) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionId: string, answer: string) => void;
  setScore: (questionId: string, score: AnswerScore) => void;
  clearScore: (questionId: string) => void;
  reset: () => void;
}

const INITIAL_STATE = {
  rawJD: "",
  parsedJD: null,
  questions: [],
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setRawJD: (rawJD) => set({ rawJD }),
      setParsedJD: (parsedJD) => set({ parsedJD }),
      setQuestions: (questions) => set({ questions }),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, user_answer: answer } : q
          ),
        })),

      setScore: (questionId, score) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, score } : q
          ),
        })),

      clearScore: (questionId) =>
        set((state) => ({
          questions: state.questions.map((q) => {
            if (q.id !== questionId) return q;
            const { score: _omit, ...rest } = q;
            void _omit;
            return rest;
          }),
        })),

      reset: () => set(INITIAL_STATE),
    }),
    { name: "prepsync-session" }
  )
);
