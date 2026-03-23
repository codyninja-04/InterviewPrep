<div align="center">

# 🎯 PrepSync

### Your AI-Powered Interview Preparation Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

[Live Demo](https://prepsync.vercel.app) · [Report Bug](https://github.com/yourusername/prepsync/issues) · [Request Feature](https://github.com/yourusername/prepsync/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 About the Project

**PrepSync** is a modern, AI-powered interview preparation platform built with **Next.js 15** and **TypeScript**. It helps job seekers streamline their prep process by organizing study materials, tracking progress, and simulating real interview scenarios — all in one place.

> Built for developers, by developers. PrepSync keeps your preparation in sync with your goals.

---

## ✨ Features

- 🤖 **AI Mock Interviews** — Practice with intelligent, context-aware question sets
- 📊 **Progress Dashboard** — Track your readiness score and identify weak spots
- 📚 **Topic Bank** — Curated resources for DSA, System Design, Behavioral & more
- 🗓️ **Study Planner** — Schedule and sync your prep timeline
- 📝 **Notes & Flashcards** — Quick-review cards for last-minute prep
- 🔐 **Authentication** — Secure login with OAuth (Google, GitHub)
- 📱 **Responsive Design** — Seamless experience on mobile, tablet, and desktop
- 🌙 **Dark Mode** — Easy on the eyes during late-night sessions

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Font** | [Geist](https://vercel.com/font) via `next/font` |
| **Auth** | [NextAuth.js](https://next-auth.js.org/) |
| **Database** | [Prisma](https://www.prisma.io/) + PostgreSQL |
| **AI** | [Anthropic Claude API](https://www.anthropic.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** `>= 18.17.0`
- **npm** / **yarn** / **pnpm** / **bun**
- **Git**

```bash
node --version   # v18.17.0 or higher
npm --version    # 9.x or higher
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/prepsync.git
cd prepsync
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up the database** *(if applicable)*

```bash
npx prisma generate
npx prisma db push
```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/prepsync"

# Auth (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AI
ANTHROPIC_API_KEY=your_anthropic_api_key
```

> ⚠️ **Never commit `.env.local` to version control.** It's already in `.gitignore`.

### Running the App

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

## 📁 Project Structure

```
prepsync/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── mock-interview/
│   │   ├── progress/
│   │   └── planner/
│   ├── api/                # API route handlers
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn/base components
│   └── shared/             # App-specific components
├── lib/                    # Utility functions & configs
│   ├── auth.ts
│   ├── db.ts
│   └── utils.ts
├── prisma/                 # Database schema & migrations
│   └── schema.prisma
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── .env.local              # Local environment variables (gitignored)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Lint the codebase with ESLint |
| `npm run type-check` | Run TypeScript compiler checks |
| `npm run db:push` | Push Prisma schema changes to the database |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |

---

## 🚢 Deployment

The easiest way to deploy PrepSync is via [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/prepsync)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Add all required environment variables in the Vercel dashboard
4. Click **Deploy** 🚀

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the [Conventional Commits](https://www.conventionalcommits.org/) spec.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

## 📬 Contact

**Your Name** — [@yourtwitter](https://twitter.com/yourtwitter) — your.email@example.com

Project Link: [https://github.com/yourusername/prepsync](https://github.com/yourusername/prepsync)

---

<div align="center">
  <sub>Built with ❤️ using <a href="https://nextjs.org">Next.js</a> · Star ⭐ this repo if you found it helpful!</sub>
</div>
