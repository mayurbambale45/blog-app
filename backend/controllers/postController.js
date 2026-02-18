const db = require('../models/db');

exports.getAllPosts = (req, res) => {
  db.query('SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC', (err, result) => {
    if (err) throw err;
    res.json(result.rows);
  });
};

exports.getPostById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM posts WHERE id = $1', [id], (err, result) => {
    if (err) throw err;
    res.json(result.rows[0]);
  });
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  db.query('INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3)', [title, content, userId], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Post created successfully' });
  });
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  db.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3', [title, content, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Post updated successfully' });
  });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM posts WHERE id = $1', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Post deleted successfully' });
  });
};
