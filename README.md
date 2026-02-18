# BlogFlow - Modern Full Stack Blog Application

A premium, responsive, and feature-rich blogging platform built with the **PERN** stack (PostgreSQL, Express, React, Node.js). This application features a modern UI designed with Tailwind CSS and a robust backend API.

## 🚀 Tech Stack

### Frontend
- **React (Vite)**: Lightning-fast frontend tooling and library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid, beautiful UI development.
- **React Router DOM**: Client-side routing for a seamless single-page application (SPA) experience.
- **Axios**: Promise-based HTTP client for API requests.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated web framework for Node.js.
- **PostgreSQL**: Powerful open-source relational database system.
- **pg (node-postgres)**: PostgreSQL client for Node.js.
- **JWT (JSON Web Tokens)**: Secure method for representing claims securely between two parties.
- **Bcrypt.js**: Library for hashing passwords.
- **Dotenv**: Module for loading environment variables.
- **Nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.

## ✨ Features
1.  **Secure Authentication**: User Registration and Login using JWT and password hashing.
2.  **CRUD Operations**: Create, Read, Update, and Delete blog posts.
3.  **Comments System**: Interactive commenting on posts.
4.  **Responsive Design**: Mobile-first layout that looks great on all devices.
5.  **Rich UI/UX**: Loading states, glassmorphism effects, and smooth transitions.

## 🛠️ Project Structure

```
blog-app/
├── backend/            # Express.js Server & API
│   ├── controllers/    # Request handlers (Auth, Post, Comment)
│   ├── db/             # Database initialization scripts
│   ├── middlewares/    # Custom middlewares
│   ├── models/         # Database connection configuration
│   ├── routes/         # API Route definitions
│   └── server.js       # Entry point
│
└── frontend/           # React Application
    ├── src/
    │   ├── api/        # Axios instance configuration
    │   ├── components/ # Reusable UI components (Navbar, Login, etc.)
    │   ├── layouts/    # Page layouts
    │   └── App.jsx     # Main application component
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14+)
- **PostgreSQL** installed and running locally.

### 1. Database Setup
1.  Create a PostgreSQL database (or let the init script do it).
2.  Configure your environment variables in `backend/.env`:
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_NAME=blogapp
    JWT_SECRET=your_secret_key
    ```
3.  Initialize the database tables automatically:
    ```bash
    cd backend
    npm run db:init
    ```

### 2. Backend
Start the backend server:
```bash
cd backend
npm start
```

### 3. Frontend
Start the React development server:
```bash
cd frontend
npm install  # if not already installed
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
