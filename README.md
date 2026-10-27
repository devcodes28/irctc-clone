# 🚆 IRCTC Clone - Full-Stack Railway Reservation System

A modern, responsive full-stack IRCTC (Indian Railway Catering and Tourism Corporation) clone built with a decoupled MERN stack architecture, Tailwind CSS, and Vite. Designed to simulate seamless train searches, user authentication, profile management, e-wallet transactions, and real-time booking flows.

---

## 🛠️ Tech Stack

### **Frontend**
* **HTML5 & Modern JavaScript (ES6+)**
* **Tailwind CSS** (for responsive, utility-first UI design)
* **Vite** (for lightning-fast development and asset bundling)

### **Backend**
* **Node.js & Express.js** (RESTful API architecture)
* **MongoDB & Mongoose** (Database persistence and schema modeling)
* **CORS & Dotenv** (Security and environment configuration)

---

## 📁 Project Structure

The project is organized into clean client and server subdirectories:

```text
irctc-clone/
│
├── backend/               # Express server, database models, and API routes
│   ├── models/            # Mongoose schemas (User, Booking, Train, etc.)
│   ├── routes/            # API endpoints (userRoutes.js, auth, trains)
│   ├── server.js          # Main entry point for the backend server
│   └── package.json
│
├── frontend/              # Client-side web application
│   ├── assets/            # Stylesheets, custom CSS, and images
│   ├── js/                # Client logic, database simulation scripts, and animations
│   ├── pages/             # HTML views (dashboard, profile, train search, bookings, etc.)
│   └── package.json
│
└── .gitignore             # Global git ignore rules (securing .env and node_modules)