const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/:postId', authenticateToken, commentController.addComment);
router.get('/:postId', commentController.getComments);

module.exports = router;
