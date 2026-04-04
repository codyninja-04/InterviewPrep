<div align="center">

# PrepSync

### AI-Powered Interview Preparation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

**Paste any job description. Get tailored interview questions. Practice with AI-scored feedback. Track your improvement over time.**

[Getting Started](#getting-started) &bull; [Features](#features) &bull; [Tech Stack](#tech-stack) &bull; [Project Structure](#project-structure) &bull; [API Routes](#api-routes)

</div>

---

## About

**PrepSync** is a full-stack AI-powered interview preparation platform that helps job seekers practice for interviews with personalized, role-specific questions and detailed feedback on their answers.

### How it works

1. **Paste a Job Description** — The AI parses the JD and extracts the role title, company, required/preferred skills, experience level, key responsibilities, and culture signals.
2. **Review the Skills Breakdown** — See exactly what skills the AI identified so you know what to prepare for before the session starts.
3. **Practice** — Answer 8 tailored interview questions: 3 technical, 3 behavioral, and 2 situational — each mapped to a specific skill from the JD.
4. **Get Scored** — Each answer is rated 1–10 by AI with detailed feedback: strengths, areas for improvement, and a sample stronger answer.
5. **Track Progress** — The dashboard shows your average scores over time, performance by question type, and skill-level analytics.
6. **Review History** — Revisit any past session with the full question/answer/score breakdown.

---

## Features

### Core Functionality
- **AI-Powered JD Parsing** — Automatically extracts job title, company, required skills, preferred skills, experience level, key responsibilities, and culture signals from any job description.
- **Tailored Question Generation** — Generates 8 role-specific interview questions (3 technical, 3 behavioral, 2 situational), each mapped to a skill identified in the JD with context on what interviewers look for.
- **AI Answer Scoring** — Each answer is scored 1–10 with structured feedback: strengths, improvements, and a sample better answer.
- **Progress Dashboard** — Visualize your performance over time with score trends, per-category breakdowns (technical / behavioral / situational), and session-by-session comparisons using bar charts and stat cards.
- **Session History** — Browse all past interview sessions with date, job title, company, average score, and the ability to drill into full question/answer/score details.

### Authentication & Data
- **Google OAuth** — Sign in with Google via Supabase Auth. Sessions are persisted per-user with Row Level Security so your data stays private.
- **Supabase PostgreSQL** — All sessions (parsed JD, questions, answers, scores) are stored in a single `prep_sessions` table with RLS policies for select, insert, and delete.

### AI Resilience
- **Multi-Provider Fallback Chain** — Primary: Google Gemini 2.0 Flash. Fallback 1: Groq (Llama 3.3 70B). Fallback 2: OpenRouter. If one provider is down or rate-limited, the system automatically tries the next.
- **API Key Rotation** — Supports multiple Gemini API keys that rotate on each request to avoid rate limits.

### UI / UX
- **Dark Theme** — Polished dark UI with violet/purple accent colors and smooth gradient backgrounds.
- **Framer Motion Animations** — Smooth page transitions, card animations, and micro-interactions throughout the app.
- **Fully Responsive** — Optimized layouts for mobile, tablet, and desktop viewports.
- **Custom UI Components** — Hand-built Button, Card, Badge, ProgressBar, and Textarea components with consistent styling.

---

## Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components, API Routes |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety |
| **UI** | [React 19](https://react.dev/) | Latest React with Server Components |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS with PostCSS |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) | Declarative animations and transitions |
| **Auth** | [Supabase Auth](https://supabase.com/auth) | Google OAuth with PKCE flow |
| **Database** | [Supabase (PostgreSQL)](https://supabase.com/) | Row Level Security, server & browser clients |
| **State** | [Zustand 5](https://zustand-demo.pmnd.rs/) | Lightweight state management with localStorage persistence |
| **AI (Primary)** | [Google Gemini 2.0 Flash](https://ai.google.dev/) | Fast, high-quality generation for JD parsing, question generation, and scoring |
| **AI (Fallback)** | [Groq (Llama 3.3 70B)](https://groq.com/) + [OpenRouter](https://openrouter.ai/) | Automatic fallback when primary provider is unavailable |
| **Deployment** | [Vercel](https://vercel.com/) | Edge-optimized hosting for Next.js |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.17.0
- **npm** / **yarn** / **pnpm**
- A [Supabase](https://supabase.com/) project (free tier works)
- At least one AI provider API key (Gemini recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/codyninja-04/InterviewPrep.git
cd InterviewPrep
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Supabase ──────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# ── AI Providers (at least one required) ──────────────
# Gemini (primary) — supports up to 3 keys for rotation
GEMINI_API_KEY=xxxxx
GEMINI_API_KEY_2=xxxxx          # optional
GEMINI_API_KEY_3=xxxxx          # optional

# Groq (fallback 1) — optional
GROQ_API_KEY=xxxxx

# OpenRouter (fallback 2) — optional
OPENROUTER_API_KEY=xxxxx
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side only) |
| `GEMINI_API_KEY` | Yes* | Google Gemini API key |
| `GEMINI_API_KEY_2` | No | Additional Gemini key for rate limit rotation |
| `GEMINI_API_KEY_3` | No | Additional Gemini key for rate limit rotation |
| `GROQ_API_KEY` | No | Groq API key (fallback provider) |
| `OPENROUTER_API_KEY` | No | OpenRouter API key (fallback provider) |

*At least one AI provider key is required. Gemini is recommended as the primary provider.

### 4. Set Up the Database

Run the following SQL in your Supabase SQL Editor to create the `prep_sessions` table with Row Level Security:

```sql
-- Create the sessions table
create table public.prep_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  job_title   text not null,
  company     text,
  raw_jd      text not null,
  parsed_jd   jsonb not null,
  questions   jsonb not null,
  avg_score   real,
  created_at  timestamptz not null default now()
);

-- Index for fast user-scoped queries sorted by date
create index idx_prep_sessions_user_created
  on public.prep_sessions (user_id, created_at desc);

-- Enable Row Level Security
alter table public.prep_sessions enable row level security;

-- RLS policies: users can only access their own sessions
create policy "Users can view their own sessions"
  on public.prep_sessions for select using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on public.prep_sessions for insert with check (auth.uid() = user_id);

create policy "Users can delete their own sessions"
  on public.prep_sessions for delete using (auth.uid() = user_id);
```

### 5. Configure Google OAuth in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) > **Authentication** > **Providers**
2. Enable **Google** provider
3. Add your Google OAuth client ID and secret (from [Google Cloud Console](https://console.cloud.google.com/apis/credentials))
4. Set the redirect URL to: `https://your-domain.com/auth/callback` (or `http://localhost:3000/auth/callback` for local dev)

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/parse-jd` | POST | Accepts a raw job description string and returns a structured `ParsedJD` object with job title, company, skills, experience level, responsibilities, and culture signals. |
| `/api/generate-questions` | POST | Takes a parsed JD and generates 8 tailored interview questions (3 technical, 3 behavioral, 2 situational), each mapped to a specific skill. |
| `/api/score-answer` | POST | Scores a user's answer to a question on a 1–10 scale with strengths, improvements, and a sample stronger answer. |
| `/api/sessions` | GET | Fetches all sessions for the authenticated user (ordered by date descending). |
| `/api/sessions` | POST | Saves a completed interview session (parsed JD, questions with answers/scores, average score). |
| `/api/sessions/[id]` | GET | Fetches a single session by ID (with RLS — only the session owner can access). |
| `/api/sessions/[id]` | DELETE | Deletes a session by ID (with RLS — only the session owner can delete). |

---

## Project Structure

```
prepsync/
├── app/
│   ├── page.tsx                     # Landing page
│   ├── layout.tsx                   # Root layout (fonts, Navbar, global styles)
│   ├── globals.css                  # Tailwind imports + custom CSS
│   ├── prep/
│   │   ├── page.tsx                 # JD input form + parsed skills breakdown
│   │   └── session/page.tsx         # Live interview session + results view
│   ├── dashboard/page.tsx           # Progress analytics (charts, stats)
│   ├── history/
│   │   ├── page.tsx                 # Session history list
│   │   └── [id]/page.tsx            # Individual session detail view
│   ├── api/
│   │   ├── parse-jd/route.ts        # JD parsing endpoint
│   │   ├── generate-questions/route.ts  # Question generation endpoint
│   │   ├── score-answer/route.ts    # Answer scoring endpoint
│   │   └── sessions/
│   │       ├── route.ts             # List + create sessions
│   │       └── [id]/route.ts        # Get + delete single session
│   └── auth/callback/route.ts       # Supabase OAuth callback handler
├── components/
│   ├── Navbar.tsx                   # Top navigation bar with auth state
│   ├── QuestionCard.tsx             # Interview question display + answer input
│   ├── ScoreFeedback.tsx            # Score display with strengths/improvements
│   ├── SkillsBreakdown.tsx          # Parsed skills visualization
│   ├── ResultsView.tsx              # Session results summary
│   ├── StatCard.tsx                 # Dashboard metric card
│   ├── BarChart.tsx                 # Dashboard bar chart
│   └── ui/
│       ├── Button.tsx               # Reusable button component
│       ├── Card.tsx                 # Reusable card wrapper
│       ├── Badge.tsx                # Skill/tag badge
│       ├── ProgressBar.tsx          # Animated progress bar
│       └── Textarea.tsx             # Styled textarea input
├── lib/
│   ├── gemini.ts                    # Multi-provider AI client with fallback chain
│   ├── prompts.ts                   # AI prompt templates (parse, generate, score)
│   ├── types.ts                     # TypeScript interfaces (ParsedJD, Question, AnswerScore, etc.)
│   ├── utils.ts                     # Utility functions
│   └── supabase/
│       ├── client.ts                # Browser-side Supabase client
│       ├── server.ts                # Server-side Supabase client
│       ├── actions.ts               # Auth server actions (sign in, sign out)
│       └── types.ts                 # Database row types
├── store/
│   └── useSessionStore.ts           # Zustand store (session state + localStorage persistence)
├── middleware.ts                     # Supabase session refresh middleware
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Data Model

### `prep_sessions` Table

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary key (auto-generated) |
| `user_id` | `uuid` | Foreign key to `auth.users(id)` |
| `job_title` | `text` | Extracted job title from the JD |
| `company` | `text` | Extracted company name (nullable) |
| `raw_jd` | `text` | Original job description text |
| `parsed_jd` | `jsonb` | Structured parsed JD (skills, responsibilities, etc.) |
| `questions` | `jsonb` | Array of questions with answers and scores |
| `avg_score` | `real` | Average score across all answered questions |
| `created_at` | `timestamptz` | Session creation timestamp |

### Key TypeScript Types

```typescript
interface ParsedJD {
  job_title: string;
  company: string | null;
  required_skills: string[];
  preferred_skills: string[];
  experience_level: "junior" | "mid" | "senior";
  key_responsibilities: string[];
  culture_signals: string[];
}

interface Question {
  id: string;
  question: string;
  type: "technical" | "behavioral" | "situational";
  mapped_skill: string;
  what_they_look_for: string;
  user_answer?: string;
  score?: AnswerScore;
}

interface AnswerScore {
  score: number;
  strengths: string[];
  improvements: string[];
  sample_better_answer: string;
}
```

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| **Dev** | `npm run dev` | Start the development server with hot reload |
| **Build** | `npm run build` | Create an optimized production build |
| **Start** | `npm run start` | Start the production server |

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/new)
3. Add all environment variables from `.env.local` to your Vercel project settings
4. Deploy — Vercel auto-detects Next.js and handles the rest

### Other Platforms

PrepSync is a standard Next.js app and can be deployed to any platform that supports Node.js:
- **Railway** / **Render** / **Fly.io** — set `npm run build` as the build command and `npm run start` as the start command
- Ensure all environment variables are configured in your platform's dashboard

---

## License

MIT
