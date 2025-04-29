import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await API.get('/posts');
      setPosts(res.data);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      <Link to="/create">Create New Post</Link>
      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>By {post.username} | {new Date(post.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
