import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import UploadVibe from '@/components/UploadVibe';
import LikeButton from '@/components/LikeButton';
import { c } from 'vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf';

const EditProfile = () => {
  const [formData, setFormData] = useState({ email: '', bio: '', avatar: '', username: '' });
  const [activeModal, setActiveModal] = useState<'avatar' | 'username' | 'bio' | 'delete' | null>(null);
  const [message, setMessage] = useState('');
  const currentUser = localStorage.getItem('username') ?? '';
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${currentUser}`)
        .then(res => res.json())
        .then(data =>
          setFormData({
            email: data.email || '',
            bio: data.bio || 'hiiiiiiiiiiiiiiiiiii',
            avatar: data.avatar || '',
            username: data.username || '',
          })
        );
      }
    }, [currentUser]);
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSave = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${currentUser}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMessage(data.message || 'Update failed');
    setActiveModal(null);
  };

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

      {/* Edit Profile Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6 text-center">Edit Your Profile</h3>

          <div className="flex flex-col items-center space-y-4">
            {/* Avatar */}
            <div
              onClick={() => setActiveModal('avatar')}
              className="relative group cursor-pointer"
            >
              <img
                src={formData.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold text-sm transition-opacity">
                Edit
              </div>
                <button
                  onClick={() => setActiveModal('avatar')}
                  className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 group-hover:bg-gray-200 transition"
                  aria-label="Edit avatar"
                >
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-800 group-hover:text-gray-800 transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
                  </svg>
                </button>
            </div>

            {/* Username */}
            <h3
              onClick={() => setActiveModal('username')}
              className="text-2xl font-bold cursor-pointer hover:underline transition"
            >
              {formData.username || currentUser} 
            </h3>
            

            {/* Bio */}
            <p
              onClick={() => setActiveModal('bio')}
              className="text-center cursor-pointer max-w-md hover:underline transition"
            >
                {formData.bio || 'Write something about yourself...'}
            </p>
          </div>
            <div className="flex justify-center mt-6">
              <button
              onClick={async () => {
                const confirmDelete = window.confirm('Are you sure you want to delete your account?');
                if (confirmDelete) {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${currentUser}`, {
                  method: 'DELETE',
                });
                if (res.ok) {
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('username');
                  navigate('/signup');
                } else {
                  setMessage('Failed to delete account. Please try again.');
                }
                }
              }}
              className="bg-white text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white border border-red-500 transition"
              >
              Delete Account
              </button>
            </div>

          {/* Feedback */}
          {message && <p className="text-center text-sm mt-4">{message}</p>}

          {/* Modals */}
          {activeModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold mb-4 capitalize">Edit {activeModal}</h3>
                {activeModal === 'avatar' && (
                  <input
                    name="avatar"
                    type="text"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="Avatar URL"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                  />
                )}
                {activeModal === 'username' && (
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-md mb-4"
                  />
                )}
                {activeModal === 'bio' && (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Write something about yourself..."
                    className="w-full px-4 py-2 border rounded-md mb-4 resize-none"
                  />
                )}

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Recent Vibes */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Vibes</h3>
          
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

export default EditProfile;
