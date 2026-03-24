💰 Wallet Wizard

A full-stack personal finance management application that helps users track expenses, manage categories, and visualize spending patterns.

🚀 Live Demo

🔗 https://wallet-wizard-ten.vercel.app/

📌 Features
🔐 User Authentication (Register/Login)
💸 Add, Edit, and Delete Transactions
🗂️ Category Management
📊 Dashboard with Spending Overview
📈 Visual Analytics (Charts & Trends)
☁️ Real-time database integration using Supabase
🏗️ Tech Stack
Frontend
Next.js (React Framework)
TypeScript
Tailwind CSS (or your styling system)
Backend / Database
Supabase (PostgreSQL + Auth + APIs)
Deployment
Vercel (Frontend Hosting)
📂 Project Structure
wallet-wizard/
│
├── client/                # Next.js frontend
│   ├── components/        # UI components
│   ├── pages/             # Routes
│   ├── lib/               # Supabase config
│   └── styles/
│
├── server/ (optional)     # Express backend (not used in final deployment)
│
├── .env.local             # Environment variables
└── README.md
⚙️ Environment Variables

Create a .env.local file inside the client folder:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

👉 These values can be found in your Supabase project settings.

🛠️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/wallet-wizard.git
cd wallet-wizard/client
2. Install dependencies
npm install
3. Run the development server
npm run dev

App will run on:

http://localhost:3000
🚀 Deployment
Frontend (Vercel)
Import project from GitHub
Set root directory: client
Add environment variables
Click Deploy
🧠 Architecture Decision

Instead of using a traditional Express backend, this project uses:

👉 Supabase as Backend-as-a-Service (BaaS)

Benefits:

No need for separate backend deployment
Built-in authentication
Real-time database
Scalable and secure
🧪 Testing Checklist
 User can register and login
 Transactions can be added
 Categories can be created
 Data persists in database
 Dashboard updates correctly
📸 Screenshots

(Optional: Add screenshots here for portfolio impact)

🌟 Future Improvements
✏️ Edit/Delete transactions
📊 Advanced analytics & charts
🌙 Dark mode
📱 Mobile responsiveness improvements
🔔 Notifications
👩‍💻 Author

Pooja Sukhdeve
Master’s in Computer Science – Boston University

⭐ Acknowledgements
Supabase for backend services
Vercel for deployment
Next.js for frontend framework
