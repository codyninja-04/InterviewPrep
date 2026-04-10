// ─── Parsed Job Description ─────────────────────────────────────────────────

export interface ParsedJD {
  job_title: string;
  company: string | null;
  required_skills: string[];
  preferred_skills: string[];
  experience_level: "junior" | "mid" | "senior";
  key_responsibilities: string[];
  culture_signals: string[];
}

// ─── Interview Question ──────────────────────────────────────────────────────

export type QuestionType = "technical" | "behavioral" | "situational";

export interface QuestionAttempt {
  answer: string;
  score: AnswerScore;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  mapped_skill: string;
  what_they_look_for: string;
  user_answer?: string;
  score?: AnswerScore;
  attempts?: QuestionAttempt[]; // all scored attempts, oldest first
}

// ─── Answer Score ────────────────────────────────────────────────────────────

export interface AnswerScore {
  score: number;
  strengths: string[];
  improvements: string[];
  sample_better_answer: string;
}

// ─── Prep Session ────────────────────────────────────────────────────────────

export interface PrepSession {
  id: string;
  jobTitle: string;
  company: string | null;
  rawJD: string;
  parsedJD: ParsedJD;
  questions: Question[];
  createdAt: string;
}

// ─── API Responses ───────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
}
