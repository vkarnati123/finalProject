import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

type Post = {
  id: number;
  username: string;
  image: string;
  caption: string;
  likes: number;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
      <img src={post.image} className="rounded-md mb-4" alt="Post" />
      <h4 className="text-lg font-bold text-pink-600">"{post.caption}"</h4>
      <p className="text-sm text-gray-600 mt-2">by @{post.username}</p>
      <div className="mt-4">
        <LikeButton postId={post.id} initialLikes={post.likes} />
      </div>
    </div>
  );
}

// Second function that includes DeleteButton
export function PostCardWithDelete({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: (postId: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5">
      <img src={post.image} className="rounded-md mb-4" alt="Post" />
      <h4 className="text-lg font-bold text-pink-600">"{post.caption}"</h4>
      <p className="text-sm text-gray-600 mt-2">by @{post.username}</p>
      <div className="mt-4 flex items-center justify-between">
        <LikeButton postId={post.id} initialLikes={post.likes} />
        <DeleteButton postId={post.id} onDelete={onDelete} />
      </div>
    </div>
  );
}
