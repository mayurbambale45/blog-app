import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api/api';
import CommentSection from './CommentSection';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    }
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure to delete?')) {
      await API.delete(`/posts/${id}`);
      alert('Deleted!');
      navigate('/');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
      <Link to={`/edit/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>

      <CommentSection postId={id} />
    </div>
  );
}
