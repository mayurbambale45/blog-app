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
    "https://blog-app07.netlify.app", 
    "http://localhost:5173",          
    "http://localhost:3000"          
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


const pool = require('./models/db');
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));