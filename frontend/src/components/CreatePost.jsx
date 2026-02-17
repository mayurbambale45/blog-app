import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/posts', { title, content });
      navigate('/');
    } catch (error) {
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Write a New Story</h2>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>

        <div className="group relative">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full text-5xl font-extrabold text-gray-900 placeholder-gray-300 border-none focus:ring-0 px-0 py-4 bg-transparent"
            autoFocus
          />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100 group-focus-within:bg-gray-300 transition-colors"></div>
        </div>

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Tell your story..."
          required
          className="w-full h-[60vh] text-xl text-gray-700 placeholder-gray-300 border-none focus:ring-0 px-0 py-4 bg-transparent resize-y font-serif leading-relaxed"
        />
      </form>
    </div>
  );
}
