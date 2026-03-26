// ─── JD Parser ───────────────────────────────────────────────────────────────
// Kept minimal — JD is already truncated before being injected

export const JD_PARSER_PROMPT = `Extract structured data from this job description. Return JSON only.

{
  "job_title": "string",
  "company": "string|null",
  "required_skills": ["max 6 items"],
  "preferred_skills": ["max 4 items"],
  "experience_level": "junior|mid|senior",
  "key_responsibilities": ["max 4 items"],
  "culture_signals": ["max 3 items"]
}

Rules: required_skills = explicit hard requirements only. preferred_skills = "bonus/nice-to-have" items. experience_level = infer from years/title. Arrays: short specific phrases, no duplicates.

JD:
{jd_text}`;

// ─── Question Generator ───────────────────────────────────────────────────────

export const QUESTION_GEN_PROMPT = `Generate 8 interview questions for this role. Return JSON array only.

Role: {job_title} ({level})
Skills: {skills}

Mix: 3 technical, 3 behavioral (STAR), 2 situational.

[{"question":"string","type":"technical|behavioral|situational","mapped_skill":"string","what_they_look_for":"1 sentence"}]`;

// ─── Answer Scorer ────────────────────────────────────────────────────────────

export const ANSWER_SCORER_PROMPT = `Score this interview answer. Return JSON only.

Q: {question}
Type: {type} | Skill: {skill}
Answer: {answer}

{"score":1-10,"strengths":["2 items max"],"improvements":["2 items max"],"sample_better_answer":"2 sentences"}`;
