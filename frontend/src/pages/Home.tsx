import React from 'react';

const Home = () => {
  return (
    <>
    
    {/* <!-- Navbar --> */}
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/home" className="text-3xl font-extrabold text-pink-500 tracking-tight">VibeSpace</a>
        <nav className="space-x-4 text-sm md:text-base">
          <a href="#" className="text-gray-600 hover:text-pink-500 transition">Feed</a>
          <a href="#" className="text-gray-600 hover:text-pink-500 transition">Explore</a>
          <a href="/login" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-400 transition">Login</a>
        </nav>
      </div>
    </header>
  
    {/* <!-- Hero Section --> */}
    <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-4 leading-tight">Your Vibe. Your Space.</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">Post, connect, react, and discover what's trending. VibeSpace is where real ones hang out.</p>
        <a href="/signup" className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">Create Your Profile</a>
      </div>
    </section>
  
    {/* <!-- Featured Posts Feed --> */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-gray-800">🔥 Trending on VibeSpace</h3>
          <p className="text-gray-500 mt-2">Scroll-worthy posts from people just like you</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
            <img src="https://source.unsplash.com/400x250/?party" className="rounded-md mb-4" alt="Post Image" />
            <h4 className="text-lg font-bold text-pink-600">"Weekend party was lit 🔥💃"</h4>
            <p className="text-sm text-gray-600 mt-2">by @luna_vee • 2.4k likes</p>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
            <img src="https://source.unsplash.com/400x250/?cat" className="rounded-md mb-4" alt="Post Image" />
            <h4 className="text-lg font-bold text-pink-600">"My cat thinks he’s royalty 😼"</h4>
            <p className="text-sm text-gray-600 mt-2">by @devonloop • 1.1k likes</p>
          </div>
          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
            <img src="https://source.unsplash.com/400x250/?sunset" className="rounded-md mb-4" alt="Post Image" />
            <h4 className="text-lg font-bold text-pink-600">"Sunset thoughts 🌇 #nofilter"</h4>
            <p className="text-sm text-gray-600 mt-2">by @sky_chaser • 3.2k likes</p>
          </div>
        </div>
      </div>
    </section>
  
    {/* <!-- Community Highlight --> */}
    <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 text-center">
      <h3 className="text-3xl font-semibold mb-4">Over 100,000 vibes shared</h3>
      <p className="max-w-lg mx-auto mb-6">From daily moods to deep thoughts, VibeSpace is the go-to platform for sharing what matters — and discovering what moves others.</p>
      <a href="#" className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">Start Vibing</a>
    </section>
  
    {/* <!-- Footer --> */}
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
        <p>© 2025 VibeSpace. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Home;