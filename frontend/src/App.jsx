import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post/:id" element={<PostDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
