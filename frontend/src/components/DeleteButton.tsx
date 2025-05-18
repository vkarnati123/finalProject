import React from 'react';

interface DeleteButtonProps {
  postId: number;
  onDelete: (postId: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId, onDelete }) => {
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete post');
        onDelete(postId); // Call the onDelete callback to update the parent state
      })
      .catch((err) => console.error('Error deleting post:', err));
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition"
      aria-label="Delete post"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7L5 7M10 11v6m4-6v6m1-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2M4 7h16l-1 12a2 2 0 01-2 2H7a2 2 0 01-2-2L4 7z"
        />
      </svg>
    </button>
  );
};

export default DeleteButton;