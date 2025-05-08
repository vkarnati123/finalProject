export interface Post {
  id: number;
  caption: string;
  image: string;
  likes: number;
  created_at: string;
  username: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
}
