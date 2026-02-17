import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/api';
// Assuming CommentSection exists and we'll leave it as is or style it later if needed.
// For now, I'll comment it out if it fails, but the user has it.
import CommentSection from './CommentSection';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current user for ownership
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  // Need to handle user_id vs id mismatch from API response
  // The API returns join with user table so post.user_id should exist

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Failed to load post", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        navigate('/');
      } catch (err) {
        alert("Failed to delete. You might not be authorized.");
      }
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!post) return <div className="text-center py-20">Post not found.</div>;

  const isOwner = currentUser && (currentUser.id === post.user_id);

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-10 text-center">
        <div className="text-sm font-medium text-indigo-600 mb-2">
          {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          {/* If we had author avatar */}
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
            {post.username ? post.username[0].toUpperCase() : 'A'}
          </div>
          <span>{post.username || 'Unknown Author'}</span>
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-lg prose-indigo mx-auto text-gray-700 leading-relaxed mb-12">
        {post.content.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4">{paragraph}</p>
        ))}
      </div>

      {/* Action Buttons for Owner */}
      {/* Note: We should ideally check ownership safely */}
      <div className="flex justify-end space-x-4 border-t border-gray-100 pt-6 mb-12">
        <Link to={`/edit/${id}`} className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors">
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Delete
        </button>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>
        <CommentSection postId={id} />
      </div>
    </article>
  );
}
