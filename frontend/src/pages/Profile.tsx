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
  const [followers, setFollowers] = useState(0); // State for followers
  const [following, setFollowing] = useState(0); // State for following
  const [error, setError] = useState('');
  
  const loggedInUser = localStorage.getItem('username') ?? '';
  
  useEffect(() => {
    if (!username) return;
    
    // Fetch user data
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${username}`)
    .then((res) => {
      if (!res.ok) throw new Error('User not found');
      return res.json();
    })
    .then((data) => setUser(data))
    .catch(() => setError('User not found'));
    
    // Fetch user posts
    fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
    .then((res) => res.json())
    .then((allPosts) => {
      const userPosts = allPosts.filter((p: Post) => p.username === username);
      setPosts(userPosts);
    });
    
    // Fetch followers and following stats
    fetch(`${import.meta.env.VITE_API_URL}/api/follows/${username}/stats`)
    .then((res) => res.json())
    .then((data) => {
      setFollowers(data.followers || 0); // Update followers
      setFollowing(data.following || 0); // Update following
    })
    .catch((err) => console.error('Error fetching stats:', err));
    
    
  }, [username]);
  
  if (error) return <p className="text-center text-gray-600 mt-20">{error}</p>;
  if (!user) return <p className="text-center text-gray-600 mt-20">Loading profile...</p>;
  
  return (
    <>
    {/* Navbar */}
    <header className="bg-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    <Link to="/home" className="text-3xl font-extrabold text-pink-500 tracking-tight">
    VibeSpace
    </Link>
    <nav className="space-x-4 text-sm md:text-base">
    <Link to="/home" className="text-gray-600 hover:text-pink-500 transition">
    Feed
    </Link>
    <Link to={`/profile/${loggedInUser}`} className="text-gray-600 hover:text-pink-500 transition">
    My Profile
    </Link>
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
    src={user.avatar || 'https://source.unsplash.com/100x100/?face'}
    alt="Avatar"
    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md"
    />
    <h2 className="text-3xl font-bold">{user.username}</h2>
    <p className="text-white/90 mt-1">@{user.username}</p>
    <p className="mt-4 max-w-xl mx-auto text-white/80">
    {user.bio || 'Just vibing through life. Music lover, sunset chaser, and always down to talk deep stuff. 🌇🎧✨'}
    </p>
    {loggedInUser === user.username && (
      <button
      onClick={() => navigate(`/edit`)}
      className="bg-white text-pink-500 px-4 py-2 rounded-full shadow-md hover:bg-pink-100 transition mt-4"
      >
      Edit Profile!
      </button>
    )}
    </div>
    </section>
    
    {/* Stats */}
    <section className="bg-white py-8 border-b">
    <div className="container mx-auto px-6 flex justify-center gap-10 text-center">
    <div
      onClick={() => navigate(`/activity`)}
      className="cursor-pointer hover:bg-gray-100 p-2 rounded transition"
    >
    <p className="text-2xl font-bold text-pink-500">{posts.length}</p>
    <p className="text-gray-600">Posts</p>
    </div>
    <div
      onClick={() => navigate(`/activity`)}
      className="cursor-pointer hover:bg-gray-100 p-2 rounded transition"
    >
    <p className="text-2xl font-bold text-pink-500">{followers}</p>
    <p className="text-gray-600">Followers</p>
    </div>
    <div
      onClick={() => navigate(`/activity`)}
      className="cursor-pointer hover:bg-gray-100 p-2 rounded transition"
    >
    <p className="text-2xl font-bold text-pink-500">{following}</p>
    <p className="text-gray-600">Following</p>
    </div>
    </div>
    </section>
    
    {/* Upload + Posts */}
    <section className="py-12 bg-gray-50">
    <div className="container mx-auto px-6">
    <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Vibes</h3>
    <div className="grid md:grid-cols-3 gap-8 mt-8">
    {posts.map((post) => (
      <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
      <img src={post.image} className="rounded-md mb-4" alt="Post" />
      <p className="text-lg text-pink-500 mt-2 italic font-semibold leading-relaxed">"{post.caption}"</p>
      
      <div className="flex justify-between items-center mt-4 space-x-3">
  <LikeButton postId={post.id} initialLikes={post.likes} />

  <div className="ml-auto flex items-center space-x-3">
    {/* Edit Button */}
    <button
      onClick={() => navigate(`/edit-post/${post.id}`)}
      className="text-gray-400 hover:text-gray-600 transition"
      aria-label="Edit post"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4h2a2 2 0 012 2v2m4 10v2a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2m7.414-1.414a2 2 0 012.828 0l1.172 1.172a2 2 0 010 2.828l-9 9L7 17l1.414-2.414 9-9z" />
      </svg>
    </button>

    {/* Delete Button */}
    <button
      onClick={() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post.id}`, {
          method: 'DELETE',
        })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to delete post');
          setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
        })
        .catch((err) => console.error('Error deleting post:', err));
      }}
      className="text-red-500 hover:text-red-700 transition"
      aria-label="Delete post"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7L5 7M10 11v6m4-6v6m1-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2M4 7h16l-1 12a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7z"/>
      </svg>
    </button>
  </div>
</div>

      </div>
    ))}
    </div>
    </div>
    {username === loggedInUser && <UploadVibe />}
    </section>
    
    {/* Footer */}
    <footer className="bg-gray-900 text-white py-6 mt-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
    <p>© 2025 VibeSpace. All rights reserved.</p>
    <div className="space-x-4">
    <a href="#" className="hover:underline">
    About
    </a>
    <a href="#" className="hover:underline">
    Privacy
    </a>
    <a href="#" className="hover:underline">
    Contact
    </a>
    </div>
    </div>
    </footer>
    </>
  );
};

export default Profile;
