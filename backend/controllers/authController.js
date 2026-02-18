const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hash], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
    if (err) throw err;
    if (result.rows.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = result.rows[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};
