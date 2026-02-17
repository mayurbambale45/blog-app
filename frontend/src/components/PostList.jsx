import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample posts for demonstration if DB is empty
  const samplePosts = [
    {
      id: 'sample-1',
      title: 'The Future of Web Development',
      content: 'Web development is constantly evolving. From static HTML pages to complex single-page applications, the journey has been incredible. In this post, we explore what the next decade might hold for developers...',
      username: 'DemoUser',
      created_at: new Date().toISOString(),
      isSample: true
    },
    {
      id: 'sample-2',
      title: 'Mastering Tailwind CSS',
      content: 'Tailwind CSS has revolutionized the way we style web applications. Its utility-first approach allows for rapid prototyping and consistent design systems. Learn how to build beautiful interfaces in record time.',
      username: 'CSS_Ninja',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      isSample: true
    },
    {
      id: 'sample-3',
      title: 'Travel Diaries: Kyoto',
      content: 'Kyoto is a city where tradition meets modernity. From the Fushimi Inari Shrine to the bamboo groves of Arashiyama, every corner tells a story. Join me on this visual journey through Japan\'s cultural capital.',
      username: 'Traveler',
      created_at: new Date(Date.now() - 172800000).toISOString(),
      isSample: true
    }
  ];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await API.get('/posts');
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Use real posts if available, otherwise show samples
  const displayPosts = posts.length > 0 ? posts : samplePosts;
  const isShowingSamples = posts.length === 0;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl overflow-hidden relative shadow-sm border border-indigo-100">
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 font-serif">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">BlogFlow</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Discover stories, thinking, and expertise from writers on any topic.
            {isShowingSamples && <span className="block mt-2 font-medium text-indigo-500 text-sm">(Showing sample content below)</span>}
          </p>
          <Link to="/create" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Start Writing
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post, index) => {
          // Generate a deterministic random color for the placeholder based on index or title length
          const colors = ['bg-red-100 ring-red-50', 'bg-blue-100 ring-blue-50', 'bg-green-100 ring-green-50', 'bg-yellow-100 ring-yellow-50', 'bg-purple-100 ring-purple-50', 'bg-pink-100 ring-pink-50'];
          const colorClass = colors[(post.id.toString().length + index) % colors.length];

          const LinkWrapper = post.isSample ? 'div' : Link;
          const linkProps = post.isSample ? { className: "block h-full cursor-default" } : { to: `/post/${post.id}`, className: "group block h-full" };

          return (
            <LinkWrapper key={post.id} {...linkProps}>
              <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                <div className={`h-48 ${colorClass} w-full flex items-center justify-center text-gray-400 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 pattern-dots"></div>
                  <svg className="w-16 h-16 opacity-40 text-gray-500 transform group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {post.isSample && <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Sample</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{post.username || 'Author'}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors font-serif leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-1 text-sm leading-relaxed">
                    {post.content}
                  </p>
                  {!post.isSample && (
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-indigo-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                      Read full story &rarr;
                    </div>
                  )}
                </div>
              </article>
            </LinkWrapper>
          );
        })}
      </div>

      {isShowingSamples && (
        <div className="text-center mt-12 mb-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold text-indigo-900">This is how your blog will look!</h3>
          <p className="text-indigo-700 mt-2">The posts above are samples. Create your own to replace them.</p>
        </div>
      )}
    </div>
  );
}
