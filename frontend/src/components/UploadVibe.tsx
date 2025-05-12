import { useState } from 'react';

const UploadVibe = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const username = localStorage.getItem('username') ?? '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, image, username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post vibe');
      }

      setCaption('');
      setImage('');
      setMessage('✅ Vibe posted!');
      window.location.reload();
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h3 className="text-xl font-bold mb-4 text-pink-500">Post a Vibe 🎉</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-400 transition"
        >
          Share Vibe
        </button>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default UploadVibe;
