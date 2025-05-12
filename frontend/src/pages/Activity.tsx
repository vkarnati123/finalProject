import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    caption: string;
    image: string;
    likes: number;
    created_at: string;
    username?: string;
}

interface User {
    id: number;
    username: string;
    avatar?: string;
}

const Activity = () => {
    const loggedInUser = localStorage.getItem('username') ?? '';
    const username = loggedInUser;
    const [activeTab, setActiveTab] = useState<'posts' | 'followers' | 'following' | 'suggested'>('posts');
    const [posts, setPosts] = useState<Post[]>([]);
    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!username) return;

        // Fetch posts
        fetch(`${import.meta.env.VITE_API_URL}/api/posts`)
            .then((res) => res.json())
            .then((allPosts) => {
                const userPosts = allPosts.filter((p: Post) => p.username === username);
                setPosts(userPosts);
            });

        // Fetch followers
        fetch(`${import.meta.env.VITE_API_URL}/api/follows/${username}/followers`)
            .then((res) => res.json())
            .then((data) => setFollowers(data || []));

        // Fetch following
        fetch(`${import.meta.env.VITE_API_URL}/api/follows/${username}/following`)
            .then((res) => res.json())
            .then((data) => setFollowing(data || []));

        // Fetch all users
        fetch(`${import.meta.env.VITE_API_URL}/api/users`)
            .then((res) => res.json())
            .then((users) => {
                setAllUsers(users);
            });

    }, [username]);

    // Recalculate suggested users whenever allUsers or following updates
    useEffect(() => {
        const suggestions = allUsers.filter(
            (user) =>
                user.username !== username &&
                !following.some((f) => f.username === user.username)
        );
        setSuggestedUsers(suggestions);
    }, [allUsers, following, username]);

    const handleUnfollow = (userToUnfollow: string) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/follows`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followerUsername: loggedInUser,
                followedUsername: userToUnfollow,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to unfollow user');
                setFollowing((prevFollowing) =>
                    prevFollowing.filter((f) => f.username !== userToUnfollow)
                );
            })
            .catch((err) => console.error('Error unfollowing user:', err));
    };

    const handleFollow = (userToFollow: User) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/follows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followerUsername: loggedInUser,
                followedUsername: userToFollow.username,
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to follow user');
                setFollowing((prevFollowing) => [...prevFollowing, userToFollow]);
            })
            .catch((err) => console.error('Error following user:', err));
    };

    const renderUserGrid = (users: User[], showUnfollow = false) => (
        <div className="grid md:grid-cols-4 gap-6 mt-8">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                    <Link to={`/profile/${user.username}`} className="flex flex-col items-center">
                        <img
                            src={user.avatar || 'https://source.unsplash.com/100x100/?face'}
                            className="w-20 h-20 rounded-full mb-3"
                            alt="Avatar"
                        />
                        <p className="text-pink-600 font-semibold">@{user.username}</p>
                    </Link>
                    {activeTab === 'suggested' && (
              <button
                onClick={() => handleFollow(user)}
                className="mt-4 text-sm text-green-600 border border-green-600 px-4 py-1 rounded hover:bg-green-50 transition"
              >
                Follow
              </button>
            )}
                    {showUnfollow && (
                        <button
                            onClick={() => handleUnfollow(user.username)}
                            className="mt-4 text-sm text-red-500 border border-red-500 px-4 py-1 rounded hover:bg-red-50 transition"
                        >
                            Unfollow
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    const renderTabContent = () => {
        if (activeTab === 'posts') {
            return (
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                            <img src={post.image} alt="Post" className="rounded-md mb-3" />
                            <h4 className="text-pink-600 font-semibold">"{post.caption}"</h4>
                            <p className="text-sm text-gray-600">{post.likes} likes</p>
                        </div>
                    ))}
                </div>
            );
        }

        if (activeTab === 'followers') {
            return renderUserGrid(followers);
        }

        if (activeTab === 'following') {
            return renderUserGrid(following, true);
        }

        if (activeTab === 'suggested') {
            return renderUserGrid(suggestedUsers);
        }

        return null;
    };

    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/home" className="text-3xl font-extrabold text-pink-500">VibeSpace</Link>
                    <nav className="space-x-4 text-sm md:text-base">
                        <Link to="/home" className="text-gray-600 hover:text-pink-500 transition">Feed</Link>
                        <Link to={`/profile/${username}`} className="text-gray-600 hover:text-pink-500 transition">Back to Profile</Link>
                    </nav>
                </div>
            </header>

            {/* Page Title */}
            <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12 text-center">
                <h2 className="text-3xl font-bold">Activity of @{username}</h2>
                <p className="mt-2 text-white/80">Check out posts, followers, and who they follow</p>
            </section>

            {/* Tabs */}
            <section className="container mx-auto px-6 py-10">
                <div className="flex justify-center gap-6 mb-6">
                    {['posts', 'followers', 'following', 'suggested'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            className={`px-4 py-2 rounded-full font-semibold transition ${
                                activeTab === tab ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {renderTabContent()}
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

export default Activity;
