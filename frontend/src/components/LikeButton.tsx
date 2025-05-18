import { useState } from 'react';

const LikeButton = ({ postId, initialLikes }: { postId: number; initialLikes: number }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);

  // Get the logged-in user from localStorage
  const loggedInUser = localStorage.getItem('username');

  const handleLike = async () => {
    if (!loggedInUser) {
      return;
    }

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
      className={`flex items-center gap-2 ${
        loggedInUser ? 'text-pink-600 hover:text-pink-500' : 'text-gray-400 cursor-not-allowed'
      } transition`}
      disabled={isLiking || !loggedInUser}
    >
      ❤️ {likes}
    </button>
  );
};

export default LikeButton;
