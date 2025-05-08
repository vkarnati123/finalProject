import { useState, useEffect } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({ email: '', bio: '', avatar: '' });
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
        .then(res => res.json())
        .then(data => setFormData({ email: data.email, bio: data.bio || '', avatar: data.avatar || '' }));
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setMessage(data.message || 'Update failed');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
        <input name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Avatar URL" />
        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded">Update</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default EditProfile;