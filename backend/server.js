const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Good practice to load this at the very top

const app = express();

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// --- UPDATED CORS CONFIGURATION ---
const corsOptions = {
  origin: [
    "https://blog-app07.netlify.app", // Your deployed Frontend (Netlify)
    "http://localhost:5173",          // Your local development (Vite)
    "http://localhost:3000"           // Common local alternative (just in case)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // Allow cookies/headers if needed
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Database Connection Check (Optional but recommended for debugging)
const pool = require('./db'); // Assuming your db.js exports the pool
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

const PORT = process.env.PORT || 10000; // Render usually uses port 10000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));