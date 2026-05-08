\# VBS 2026 Registration Platform - Project Context \& Rules



\## 1. Project Overview

A high-energy, kid-friendly React web application for The Atrium Church's 2026 Vacation Bible School. Features include a scattered polaroid hero section, a Masonry photo gallery, and a complex multi-child registration form with dynamic Paystack payment routing based on campus selection (Ilorin vs. Lagos).



\## 2. Tech Stack

React 19 (Vite), TypeScript, Tailwind CSS v4, Framer Motion, TanStack Query, Supabase, Paystack, Zod (Validation).



\## 3. Strict Architectural Rules (Always Update, Never Replace this file)

\*   \*\*Auth Centralization:\*\* Implement a centralized Auth provider caching the session. Multiple components must not trigger independent network calls.

\*   \*\*Data Fetching:\*\* TanStack Query is mandatory for all API calls to ensure global caching and prevent duplicate requests.

\*   \*\*Backend Middleware:\*\* Prioritize local JWT verification to eliminate outgoing network round-trips.

\*   \*\*Pagination:\*\* Never initialize a 'get all' query. Always implement server-side pagination and strict field selection.



\## 4. Security Protocols

\*   \*\*OWASP Enforcement:\*\* Rely on React's native data binding. No `dangerouslySetInnerHTML` unless explicitly sanitized.

\*   \*\*Secrets:\*\* Zero hardcoded secrets. All environment variables must reside in `.env`.

\*   \*\*Supabase RLS:\*\* Row Level Security is strictly mandatory for all tables. A parent can only view/modify records where `parent\_id` matches `auth.uid()`.

\*   \*\*Data Minimization:\*\* APIs must only return exact fields required by the UI. Never log sensitive PII to the console.



\## 5. Apple/Google Elite Quality Standards

Evaluate all code against these criteria before finalization:

1\.  \*\*Architecture:\*\* Strict feature-based folder structure. 100% type safety.

2\.  \*\*Performance:\*\* Optimize Vite bundle. Enforce lazy loading (especially Masonry gallery). 60fps Framer Motion animations.

3\.  \*\*UX/UI \& Mobile:\*\* Mobile-first is mandatory. WCAG 2.2 AA contrast. Skeleton loaders for pending states. Bouncy, kid-friendly micro-interactions.

4\.  \*\*Resilience:\*\* Robust error handling for payment failures and form state recovery.



\*MANDATORY REVIEW:\* Upon request for a "Quality Audit", output: 1. Critical issues, 2. Missing edge cases, 3. Recommended improvements, 4. Category scores (0-100), 5. App Quality Grade.

