# BlogFlow - Full Stack Blog Application

A modern, responsive, and feature-rich blogging platform built with the MySQL, Express, React, and Node.js (PERN-style) stack.

## 🚀 Recent Updates
- **New UI**: Completely revamped interface using **Tailwind CSS** for a premium, clean look.
- **Responsive Design**: Mobile-first layout optimized for all devices.
- **Enhanced UX**: Loading states, hero sections, and seamless navigation.
- **Create/Edit**: Distraction-free writing experience.

## Unpacking the Stack
This application is built using a robust full-stack architecture:

- **Frontend**: 
  - **React (Vite)**: For a fast, interactive user interface.
  - **Tailwind CSS**: For utility-first, custom design without the bloat.
  - **React Router**: For seamless single-page application navigation.
  - **Axios**: For handling HTTP requests.

- **Backend**:
  - **Node.js**: The runtime environment.
  - **Express**: The web framework for handling API routes (`/api/auth`, `/api/posts`, `/api/comments`).
  - **MySQL**: Relational database for structured data storage (Users, Posts, Comments).
  - **JWT**: JSON Web Tokens for secure authentication.

## ✨ Features
1.  **User Authentication**: Secure Login and Registration (JWT-based).
2.  **Blog Management**: Create, Read, Update, and Delete blog posts.
3.  **Comments**: Interactive comment section on each post.
4.  **Modern Dashboard**: View all posts in a responsive grid layout.

## 🛠️ How to Run

### Prerequisites
- Node.js installed
- MySQL Server running

### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
*Ensure your `.env` file is configured with correct DB credentials.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to explore the app!

## 📝 Sample Data
If you are running this for the first time:
1. Register a new account.
2. Click "Write Post" to create your first story!
3. The app is designed to look great even with just one post.
