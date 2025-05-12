import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UploadVibe from '@/components/UploadVibe';
import LikeButton from '@/components/LikeButton';

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
  bio?: string;
  avatar?: string;
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  
  const currentUser = localStorage.getItem('username') ?? '';
  
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
    {/* Navbar */}
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
    
    {/* Profile Header */}
    <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12">
    <div className="container mx-auto px-6 text-center">
    <img
    src={user.avatar || "https://source.unsplash.com/100x100/?face"}
    alt="Avatar"
    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
    />
    <h2 className="text-3xl font-bold">{user.username}</h2>
    <p className="text-white/90 mt-1">@{user.username}</p>
    <p className="mt-4 max-w-xl mx-auto text-white/80">
    {user.bio || "Just vibing through life. Music lover, sunset chaser, and always down to talk deep stuff. 🌇🎧✨"}
    
    <div>{currentUser === user.username && (
      <button
      onClick={() => navigate(`/edit`)}
      className="bg-white text-pink-500 px-4 py-2 rounded-full shadow-md hover:bg-pink-100 transition mt-4"
      >Edit Profile!
      </button>
    )}</div>
    
    
    </p>
    </div>
    </section>
    
    {/* Stats */}
    <section className="bg-white py-8 border-b">
    <div className="container mx-auto px-6 flex justify-center gap-10 text-center">
    <div>
    <p className="text-2xl font-bold text-pink-500">{posts.length}</p>
    <p className="text-gray-600">Posts</p>
    </div>
    <div>
    <p className="text-2xl font-bold text-pink-500">1.2k</p>
    <p className="text-gray-600">Followers</p>
    </div>
    <div>
    <p className="text-2xl font-bold text-pink-500">138</p>
    <p className="text-gray-600">Following</p>
    </div>
    </div>
    </section>
    
    {/* Upload + Posts */}
    <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-6">
    <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Vibes</h3>
    {username === currentUser && <UploadVibe />}
    <div className="grid md:grid-cols-3 gap-8 mt-8">
    {posts.map(post => (
      <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
      <img src={post.image} className="rounded-md mb-4" alt="Post" />
      <h4 className="text-lg font-bold text-pink-600">"{post.caption}"</h4>
      <p className="text-sm text-gray-600 mt-2">{post.likes} likes</p>
      <LikeButton postId={post.id} initialLikes={post.likes} />
      </div>
    ))}
    </div>
    </div>
    </section>
    
    {/* Footer */}
    <footer className="bg-gray-900 text-white py-6 mt-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
    <p>© 2025 VibeSpace. All rights reserved.</p>
    <div className="space-x-4">
    <a href="#" className="hover:underline">About</a>
    <a href="#" className="hover:underline">Privacy</a>
    <a href="#" className="hover:underline">Contact</a>
    </div>
    </div>
    </footer>
    </>
  );
};

export default Profile;
