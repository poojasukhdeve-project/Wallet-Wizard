# 💰 Wallet Wizard

A modern **full-stack personal finance management application** that helps users track expenses, manage categories, and analyze spending behavior with a clean and intuitive dashboard.

---

## 🚀 Live Demo

🔗 https://wallet-wizard-ten.vercel.app/

---

## 📌 Features

- 🔐 **Authentication**
  - User Registration & Login
  - Secure authentication using Supabase

- 💸 **Transaction Management**
  - Add new transactions
  - View transaction list
  - Categorize expenses

- 🗂️ **Category Management**
  - Create and manage categories
  - Organize spending efficiently

- 📊 **Dashboard**
  - Overview of total spending
  - Transactions summary
  - Category insights

- 📈 **Analytics**
  - Spending trends visualization
  - Category-based analysis

- ☁️ **Cloud Database**
  - Real-time data storage using Supabase (PostgreSQL)

---

## 🏗️ Tech Stack

### Frontend
- Next.js (React Framework)
- TypeScript
- CSS / Tailwind CSS

### Backend / Database
- Supabase (PostgreSQL + Authentication + APIs)

### Deployment
- Vercel (Frontend Hosting)

---

## 🧠 Architecture

This project uses a **Backend-as-a-Service (BaaS)** approach with Supabase.

- Frontend (Next.js on Vercel)
- ↓
- Supabase (Auth + Database + API)

### Why Supabase?
- No need for custom backend (Express)  
- Built-in authentication  
- Scalable PostgreSQL database  
- Faster development  

---

wallet-wizard/
│
├── client/                # Next.js frontend
│   ├── components/        # UI components
│   ├── pages/             # Application routes
│   ├── lib/               # Supabase configuration
│   ├── styles/            # Styling
│   └── public/            # Static assets
│
├── server/ (optional)     # Express backend (not used in final deployment)
│
├── .env.local             # Environment variables (local only)
├── package.json
└── README.md

---
