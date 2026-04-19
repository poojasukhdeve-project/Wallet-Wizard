# 💰 Wallet Wizard – Personal Finance Tracker

A full-stack personal finance tracking web application that helps users manage expenses, organize transactions, and gain real-time financial insights.

> Built as part of the Build Fellowship — a project-based program focused on real-world software development.

---

## 🚀 Live Demo
🔗 https://wallet-wizard-ten.vercel.app/login  

## 💻 GitHub Repository
🔗 https://github.com/poojasukhdeve-project/Wallet-Wizard  

---

## 📌 Project Overview

Wallet Wizard is designed to solve the problem of inefficient and manual expense tracking.  
It provides a clean, user-friendly interface to track daily expenses, categorize spending, and visualize financial data in real time.

---

## 🧩 Problem Statement

Managing daily expenses is challenging due to:

- Lack of real-time tracking  
- No clear financial insights  
- Manual and error-prone tracking methods  
- Poor organization of transactions  

---

## 💡 Solution

Wallet Wizard provides:

- Real-time expense tracking  
- Category-based organization  
- Interactive dashboard with analytics  
- Secure authentication system  

---

## ✨ Features

- 🔐 User Authentication (Supabase Auth)  
- 💸 Add, delete, and manage transactions  
- 🗂️ Custom categories for expenses  
- 📊 Real-time dashboard  
- 📈 Analytics & spending insights  
- 🧹 Soft delete for safe data handling  

---

## 🛠️ Tech Stack

### Frontend
- Next.js  
- React  
- TypeScript  
- Tailwind CSS  

### Backend & Database
- Supabase (Backend-as-a-Service)  
- PostgreSQL  

### Deployment
- Vercel  

---

## 🏗️ System Architecture

1. User interacts with frontend (Next.js)  
2. Authentication handled by Supabase  
3. User actions trigger API calls  
4. Supabase processes requests  
5. Data stored in PostgreSQL  
6. Real-time data updates UI  

---

## 🗄️ Database Design

- Tables: `transactions`, `categories`  
- Foreign key: `user_id` for multi-user support  
- Composite key: `(user_id + category_name)` to prevent duplication  
- Soft delete using `is_deleted` flag  

---

## ⚠️ Challenges & Solutions

### 1. Deployment Issues
- ESLint errors blocked production build  
✔️ Fixed by adjusting ESLint settings  

### 2. Environment Variables
- Missing variables in Vercel  
✔️ Configured securely in deployment  

### 3. Git Conflicts
- Merge conflicts between branches  
✔️ Used feature branches & pull requests  

### 4. API & Database Issues
- Incorrect responses and broken queries  
✔️ Debugged queries and added error handling  

### 5. Category Duplication
- Same category not allowed for multiple users  
✔️ Solved using composite key  

### 6. Data Loss Risk
- Hard delete removed data permanently  
✔️ Implemented soft delete  

---

## 📊 Results

- Built a production-ready full-stack application  
- Implemented secure authentication and real-time updates  
- Designed scalable database architecture  
- Successfully deployed on Vercel  

---

## 🧠 Why This Project Stands Out

This project goes beyond a basic CRUD app by solving real-world engineering challenges:

- Implemented multi-user data handling using composite keys  
- Designed scalable database architecture  
- Used soft delete strategy to improve data integrity  
- Solved real deployment and environment issues  
- Built and deployed a complete end-to-end application  

👉 Demonstrates strong skills in full-stack development, debugging, and system design.

---

## 🎓 Lessons Learned

- Debugging is critical in real-world development  
- Production environments differ from local setup  
- Database design impacts scalability  
- Soft delete improves data reliability  
- Structured Git workflow improves collaboration  

---

## 🧪 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/poojasukhdeve-project/Wallet-Wizard.git
cd Wallet-Wizard
```
### 2. Install dependencies
```bash
npm install
```
### 3. Setup environment variables
```bash
Create a .env.local file:
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```
### 4. Run the app
```bash
npm run dev
```
### 5. Open in browser
```bash
http://localhost:3000
```
---

## 🚀 Future Enhancements

- Budget tracking & spending limits  
- AI chatbot for financial insights  
- Improved UI/UX  
- Advanced analytics & reporting  
- Better authentication & validation  

---

## 👩‍💻 Author

**Pooja Sukhdeve**  
MS in Computer Science – Boston University  

---
## 📄 License

This project is for educational purposes as part of the Build Fellowship program.
