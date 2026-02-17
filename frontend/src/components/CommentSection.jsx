import { useEffect, useState } from 'react';
import API from '../api/api';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await API.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to load comments");
      }
    }
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await API.post(`/comments/${postId}`, { content });
      setContent('');
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      alert("Failed to post comment. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Discussion ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What are your thoughts?"
            required
            rows="3"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute bottom-3 right-3 px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="flex space-x-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {comment.username ? comment.username[0].toUpperCase() : 'U'}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{comment.username}</h4>
                  <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">No comments yet. Be the first to start the conversation!</p>
        )}
      </div>
    </div>
  );
}
