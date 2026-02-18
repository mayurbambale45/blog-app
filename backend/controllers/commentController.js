const db = require('../models/db');

exports.addComment = (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const { postId } = req.params;

  db.query('INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3)', [content, userId, postId], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Comment added successfully' });
  });
};

exports.getComments = (req, res) => {
  const { postId } = req.params;

  db.query('SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = $1 ORDER BY created_at DESC', [postId], (err, result) => {
    if (err) throw err;
    res.json(result.rows);
  });
};
