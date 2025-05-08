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
        <p className="text-sm text-gray-600 mt-2">by @{post.username} • {post.likes} likes</p>
      </div>
    );
  }
  