# Wallet Wizard — Personal Finance Tracker

A full-stack personal finance tracking web app that helps users manage expenses, organize transactions by category, and get real-time insight into their spending.

Built as part of the **Build Fellowship** — a project-based program focused on real-world software development.

**Author:** Pooja Sukhdeve — MS in Computer Science, Boston University

**Live Demo:** https://wallet-wizard-ten.vercel.app/login
**Repository:** https://github.com/poojasukhdeve-project/Wallet-Wizard

---

## Overview

Wallet Wizard solves the problem of inefficient, manual expense tracking. It gives users a clean interface to log daily expenses, organize spending into categories, and see their financial picture update in real time — without spreadsheets or guesswork.

---

## Problem Statement

Managing personal finances manually tends to break down because of:

- No real-time visibility into spending
- No clear financial insights or trends
- Manual, error-prone tracking (spreadsheets, notes)
- Poorly organized, hard-to-search transaction history

---

## Solution

Wallet Wizard addresses this with:

- Real-time expense tracking
- Category-based organization of transactions
- An interactive analytics dashboard
- Secure, per-user authentication

---

## Features

- **Authentication** — secure user accounts via Supabase Auth
- **Transaction Management** — add, delete, and manage transactions
- **Custom Categories** — organize expenses by user-defined categories
- **Real-Time Dashboard** — live updates as data changes
- **Analytics & Insights** — spending breakdowns and trends
- **Soft Delete** — safe data handling that avoids permanent, accidental loss

---

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend / Database | Supabase (BaaS), PostgreSQL |
| Deployment | Vercel |

---

## System Architecture

1. User interacts with the Next.js frontend
2. Supabase handles authentication
3. User actions trigger API calls to Supabase
4. Supabase processes requests against PostgreSQL
5. Data is stored/updated in PostgreSQL
6. Real-time subscriptions push updates back to the UI

---

## Database Design

- **Tables:** `transactions`, `categories`
- **Foreign key:** `user_id` — supports multi-user data isolation
- **Composite key:** `(user_id + category_name)` — prevents category name collisions across users while still allowing each user their own categories
- **Soft delete:** `is_deleted` flag instead of hard deletes, preserving data integrity and enabling recovery

---

## Key Challenges & Solutions

### 1. Production build failures from ESLint
**Problem:** ESLint errors that were harmless locally were blocking the production build on Vercel.
**Fix:** Adjusted ESLint configuration so it enforced real issues without blocking deployment on non-critical warnings.
**Takeaway:** A dev environment and a CI/production build can enforce rules differently — always test the actual build command, not just local dev mode.

### 2. Missing environment variables in deployment
**Problem:** Environment variables that worked locally weren't present in the Vercel deployment, breaking the live app.
**Fix:** Properly configured and secured the required environment variables directly in the Vercel project settings.
**Takeaway:** Local `.env` files don't travel with your code — deployment environments need their own explicit, secured configuration.

### 3. Git merge conflicts across branches
**Problem:** Parallel work across branches led to merge conflicts.
**Fix:** Adopted a structured workflow using feature branches and pull requests instead of committing directly to main.
**Takeaway:** A disciplined Git workflow prevents most conflicts before they happen, rather than needing to resolve them after the fact.

### 4. API and database query issues
**Problem:** Some API calls returned incorrect data or failed silently due to broken queries.
**Fix:** Debugged the queries directly against the database and added proper error handling around API responses.
**Takeaway:** Silent failures are more dangerous than loud ones — explicit error handling surfaces problems early instead of letting bad data flow through.

### 5. Category duplication across users
**Problem:** The category system initially didn't allow multiple users to have categories with the same name (e.g., two users both wanting a "Groceries" category).
**Fix:** Solved with a composite key on `(user_id + category_name)`, scoping uniqueness to each user instead of globally.
**Takeaway:** Multi-user data models need uniqueness constraints scoped correctly — what looks like a duplicate at the table level may be perfectly valid per-user.

### 6. Risk of permanent data loss
**Problem:** Hard deletes removed transaction data permanently, with no way to recover from an accidental delete.
**Fix:** Implemented soft delete using an `is_deleted` flag instead of physically removing rows.
**Takeaway:** For financial data especially, recoverability matters — soft deletes trade a small amount of complexity for meaningfully better data safety.

---

## What I Learned

- Debugging is a core skill in real-world development, not an edge case
- Production environments behave differently from local setups in ways that aren't obvious until you deploy
- Database design decisions (keys, constraints) directly impact scalability and correctness
- Soft delete strategies improve data reliability, especially for anything financial
- A structured Git workflow (branches + PRs) meaningfully improves collaboration and reduces conflict

---

## Why This Project Stands Out

Wallet Wizard goes beyond a basic CRUD app by solving real multi-user engineering problems:

- Multi-user data handling via composite keys
- Scalable database architecture with proper foreign-key relationships
- Soft delete strategy for data integrity
- Real deployment and environment configuration issues, solved and documented
- A complete, deployed, end-to-end application — not just a local demo

This demonstrates full-stack development, debugging under real constraints, and system design thinking.

---

## Results

- Built a production-ready full-stack application
- Implemented secure authentication and real-time updates
- Designed a scalable, multi-user database architecture
- Successfully deployed to Vercel

---

## Getting Started

**Clone the repository**
```bash
git clone https://github.com/poojasukhdeve-project/Wallet-Wizard.git
cd Wallet-Wizard
```

**Install dependencies**
```bash
npm install
```

**Set up environment variables** — create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

**Run the app**
```bash
npm run dev
```

**Open in browser**
```text
http://localhost:3000
```

---

## Future Enhancements

- Budget tracking and spending limits
- AI chatbot for financial insights
- Improved UI/UX
- Advanced analytics and reporting
- Stronger authentication and input validation

---

## License

This project is for educational purposes as part of the Build Fellowship program.
