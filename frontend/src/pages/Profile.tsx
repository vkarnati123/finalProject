import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import posts from '../data/posts';
import users from '../data/Users';
import { Post, UserProfile } from '../data/types';

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  // Simulated authentication state (replace with actual logic)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [isLoggedIn, navigate]);

  const user: UserProfile | undefined = users[username ?? ''];
  const userPosts: Post[] = posts.filter(post => post.user === username);

  if (!user) {
    return <p className="text-center text-gray-600 mt-20">User not found.</p>;
  }

  return (
    <>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Vibes</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {userPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
                <img src={post.image} className="rounded-md mb-4" alt="Post" />
                <h4 className="text-lg font-bold text-pink-600">{post.title}</h4>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Posts:</strong> {post.stats.posts} | <strong>Followers:</strong> {post.stats.followers} | <strong>Following:</strong> {post.stats.following}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
