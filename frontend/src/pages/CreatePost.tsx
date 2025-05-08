import { useState } from 'react';

const CreatePost = () => {
  const [formData, setFormData] = useState({ caption: '', image: '' });
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, user_id: userId }),
    });
    const data = await res.json();
    setMessage(data.message || 'Post failed');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea name="caption" value={formData.caption} onChange={handleChange} placeholder="What's the vibe?" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded">Post</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default CreatePost;