import { useState } from 'react';

const LikeButton = ({ postId, initialLikes }: { postId: number; initialLikes: number }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}/like`, { method: 'POST' });
    setLikes(prev => prev + 1);
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-2 text-pink-600">
      ❤️ {likes}
    </button>
  );
};

export default LikeButton;
