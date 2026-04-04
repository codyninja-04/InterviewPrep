import type { ParsedJD, Question } from "@/lib/types";

export interface PrepSessionRow {
  id: string;
  user_id: string;
  job_title: string;
  company: string | null;
  raw_jd: string;
  parsed_jd: ParsedJD;
  questions: Question[];
  avg_score: number | null;
  created_at: string;
}
