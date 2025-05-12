import { useState } from 'react';

const LikeButton = ({ postId, initialLikes }: { postId: number; initialLikes: number }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return; // Prevent multiple clicks
    setIsLiking(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to like the post');
      }

      setLikes((prev) => prev + 1);
    } catch (err) {
      console.error('Error liking post:', err);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 text-pink-600 hover:text-pink-500 transition"
      disabled={isLiking}
    >
      ❤️ {likes}
    </button>
  );
};

export default LikeButton;
