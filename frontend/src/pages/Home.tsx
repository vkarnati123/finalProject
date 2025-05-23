import React from 'react';
import { Link } from 'react-router-dom';
import PostCard from '@/components/PostCard';

interface Post {
  id: number;
  caption: string;
  image: string;
  likes: number;
  username: string;
}

const Home: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username') ?? '';

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
            <Link to="#" className="text-gray-600 hover:text-pink-500 transition">
              Explore
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to={`/profile/${username}`}
                  className="text-gray-600 hover:text-pink-500 transition"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                  className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-400 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-4 leading-tight">Your Vibe. Your Space.</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Post, connect, react, and discover what's trending. VibeSpace is where real ones hang
            out.
          </p>
          <Link
            to="/signup"
            className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            aria-label="Create your profile"
          >
            Create Your Profile
          </Link>
        </div>
      </section>

      {/* Posts Feed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-800">🔥 Trending on VibeSpace</h3>
            <p className="text-gray-500 mt-2">Scroll-worthy posts from people just like you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={{
                    ...post,
                    username: post.username || 'Unknown', // Provide a fallback for missing username
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No posts available yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Community Highlight */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 text-center">
        <h3 className="text-3xl font-semibold mb-4">Over 100,000 vibes shared</h3>
        <p className="max-w-lg mx-auto mb-6">
          From daily moods to deep thoughts, VibeSpace is the go-to platform for sharing what
          matters — and discovering what moves others.
        </p>
        <Link
          to="#"
          className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Start Vibing
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <p>© 2025 VibeSpace. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="#" className="hover:underline">
              Terms
            </Link>
            <Link to="#" className="hover:underline">
              Privacy
            </Link>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
