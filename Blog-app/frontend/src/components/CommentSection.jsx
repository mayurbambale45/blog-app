import { useEffect, useState } from 'react';
import API from '../api/api';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    }
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post(`/comments/${postId}`, { content });
    setContent('');
    const res = await API.get(`/comments/${postId}`);
    setComments(res.data);
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write a comment" required />
        <button type="submit">Comment</button>
      </form>

      {comments.map(comment => (
        <div key={comment.id}>
          <p><strong>{comment.username}</strong>: {comment.content}</p>
          <small>{new Date(comment.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
