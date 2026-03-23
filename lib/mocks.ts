import type { ParsedJD, Question } from "@/lib/types";

// Simulates network + AI latency so loading states are testable
export function mockDelay(ms = 1400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── parse-jd mock ─────────────────────────────────────────────────────────────

export const MOCK_PARSED_JD: ParsedJD = {
  job_title: "Senior Frontend Engineer",
  company: "Acme Corp",
  required_skills: [
    "React",
    "TypeScript",
    "GraphQL",
    "Next.js",
    "CSS-in-JS",
    "REST APIs",
  ],
  preferred_skills: ["AWS", "Storybook", "Playwright", "Docker"],
  experience_level: "senior",
  key_responsibilities: [
    "Own and evolve the core web platform from design to production",
    "Collaborate with Product and Design to ship high-quality user experiences",
    "Define frontend architecture patterns and mentor junior engineers",
    "Drive performance optimisation and accessibility improvements",
    "Participate in cross-functional planning and technical roadmap discussions",
  ],
  culture_signals: [
    "Async-first remote culture",
    "High ownership and autonomy",
    "Strong documentation culture",
    "Ship fast, iterate often",
  ],
};

// ── generate-questions mock ───────────────────────────────────────────────────

export const MOCK_QUESTIONS: Omit<Question, "id">[] = [
  // Technical (4)
  {
    question:
      "Walk me through how you'd implement server-side rendering for a data-heavy dashboard in Next.js. What tradeoffs would you consider?",
    type: "technical",
    mapped_skill: "Next.js",
    what_they_look_for:
      "Understands getServerSideProps vs App Router patterns, caching strategies, and when SSR is the right call vs ISR or CSR.",
  },
  {
    question:
      "You're seeing significant re-renders across a large React component tree. What's your debugging process and what tools do you reach for first?",
    type: "technical",
    mapped_skill: "React",
    what_they_look_for:
      "Mentions React DevTools Profiler, memo, useMemo, useCallback, and can explain why premature optimisation is a trap.",
  },
  {
    question:
      "How would you design a GraphQL client-side caching strategy for a real-time collaborative app? Describe the Apollo or urql approach you'd take.",
    type: "technical",
    mapped_skill: "GraphQL",
    what_they_look_for:
      "Understands normalised caches, optimistic updates, subscriptions, and cache invalidation edge cases.",
  },
  {
    question:
      "Explain how TypeScript's structural type system differs from nominal typing, and give a real example where it's burned you.",
    type: "technical",
    mapped_skill: "TypeScript",
    what_they_look_for:
      "Can articulate duck typing in practice, mention branded types as a workaround, and discuss discriminated unions.",
  },
  // Behavioral (3)
  {
    question:
      "Tell me about a time you pushed back on a product or design decision. How did you frame the conversation and what was the outcome?",
    type: "behavioral",
    mapped_skill: "Collaboration",
    what_they_look_for:
      "Looks for evidence of respectful assertiveness, using data or user impact to make the case, and reaching a good outcome.",
  },
  {
    question:
      "Describe a situation where you had to mentor a junior engineer who was struggling. What approach did you take and how did it land?",
    type: "behavioral",
    mapped_skill: "Leadership",
    what_they_look_for:
      "Wants to see empathy, specific techniques (pair programming, structured feedback), and evidence the engineer grew.",
  },
  {
    question:
      "Give me an example of a technical decision you made that you later regretted. What did you learn and how did you unwind it?",
    type: "behavioral",
    mapped_skill: "Ownership",
    what_they_look_for:
      "Honest reflection, demonstrates growth mindset, and shows they can clean up their own mistakes without drama.",
  },
  // Situational (3)
  {
    question:
      "Your team's main customer-facing page has a Lighthouse score of 38. You have two weeks and no designer available. How do you approach it?",
    type: "situational",
    mapped_skill: "Performance",
    what_they_look_for:
      "Prioritises metrics that matter (LCP, CLS, FID), knows quick wins (image formats, code splitting, font loading), and communicates progress.",
  },
  {
    question:
      "You inherit a React codebase with zero tests, inconsistent styling, and no documentation. Where do you start and how do you build momentum?",
    type: "situational",
    mapped_skill: "React",
    what_they_look_for:
      "Avoids big-bang rewrites, sets up testing infrastructure around the highest-risk areas first, and gets buy-in from the team.",
  },
  {
    question:
      "A critical bug hits production on a Friday at 4pm. You identify the fix but it requires a large, risky refactor. What do you do?",
    type: "situational",
    mapped_skill: "Decision Making",
    what_they_look_for:
      "Opts for the minimal hotfix now plus a tracked follow-up ticket, communicates clearly with stakeholders, and resists heroics.",
  },
];

// ── score-answer mock ─────────────────────────────────────────────────────────

export const MOCK_SCORES = [
  {
    score: 8,
    strengths: [
      "Clear structure — set up context before diving into the solution",
      "Mentioned concrete tradeoffs (SSR vs ISR vs CSR) rather than picking one without reasoning",
    ],
    improvements: [
      "Didn't address caching headers or CDN behaviour at all — important for SSR at scale",
      "Could have mentioned Streaming / React Suspense as a modern Next.js approach",
    ],
    sample_better_answer:
      "For a data-heavy dashboard I'd default to React Server Components with streaming so the shell renders immediately and each data section resolves independently. I'd use Next.js route-level caching with revalidate tags so we're not hitting the DB on every request. For user-specific data that can't be cached I'd defer it to client fetches after the skeleton is painted — that keeps the TTFB low while keeping the page feel interactive.",
  },
  {
    score: 6,
    strengths: [
      "Correctly identified React DevTools Profiler as the first tool to reach for",
      "Mentioned memo as a solution — shows awareness of the main lever",
    ],
    improvements: [
      "Didn't mention why over-memoising is itself a problem — interviewers flag this",
      "No mention of context re-renders or useReducer as an alternative pattern",
    ],
    sample_better_answer:
      "I start with the Profiler to identify which components are actually slow — not which ones look suspicious. Once I have data I look at whether the re-renders are caused by prop changes, context changes, or parent re-renders. Context is often the culprit in large trees and the fix is usually splitting it or moving state down. I use memo and useCallback sparingly and only with a measured before/after benchmark.",
  },
  {
    score: 9,
    strengths: [
      "Explained normalised caching in Apollo clearly without jargon",
      "Brought up optimistic UI unprompted — shows they think about perceived performance",
    ],
    improvements: [
      "Could elaborate on subscription teardown and memory leak edge cases",
    ],
    sample_better_answer:
      "I'd use Apollo's normalised cache keyed on __typename + id so updates anywhere in the graph propagate automatically. For real-time I'd layer WebSocket subscriptions on top and use writeFragment to push updates into the cache without refetching. Optimistic responses are critical here — I'd update the UI immediately on mutation, then reconcile when the server confirms. The one thing I'd stress is setting up proper subscription cleanup in useEffect to avoid memory leaks on unmount.",
  },
];
