import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UploadVibe from '@/components/UploadVibe';

interface Post {
  id: number;
  caption: string;
  image: string;
  likes: number;
  created_at: string;
  username?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = localStorage.getItem('username') ?? '';

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!username) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/users/${username}`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setError('User not found'));

    fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
      .then(res => res.json())
      .then(allPosts => {
        const userPosts = allPosts.filter((p: Post) => p.username === username);
        setPosts(userPosts);
      });
  }, [username]);

  if (error) return <p className="text-center text-gray-600 mt-20">{error}</p>;
  if (!user) return <p className="text-center text-gray-600 mt-20">Loading profile...</p>;

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/home" className="text-3xl font-extrabold text-pink-500 tracking-tight">VibeSpace</Link>
          <nav className="space-x-4 text-sm md:text-base">
            <Link to="/home" className="text-gray-600 hover:text-pink-500 transition">Feed</Link>
            <Link to={`/profile/${currentUser}`} className="text-gray-600 hover:text-pink-500 transition">My Profile</Link>
            <button
              onClick={() => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                navigate('/login');
              }}
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-400 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">@{user.username}'s Vibes</h3>
          <UploadVibe />
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
                <img src={post.image} className="rounded-md mb-4" alt="Post" />
                <h4 className="text-lg font-bold text-pink-600">"{post.caption}"</h4>
                <p className="text-sm text-gray-600 mt-2">{post.likes} likes</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
