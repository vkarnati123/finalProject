export interface Post {
    id: number;
    user: string; // username
    image: string;
    title: string;
    stats: UserStats;
  }
  
  export interface UserStats {
    posts: number;
    followers: string;
    following: number;
  }
  
  export interface UserProfile {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    stats: UserStats;
  }
  