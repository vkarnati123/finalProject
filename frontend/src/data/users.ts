import { UserProfile } from './types';

const users: Record<string, UserProfile> = {
  luna_vee: {
    name: "Luna Vee",
    username: "luna_vee",
    avatar: "https://source.unsplash.com/100x100/?face",
    bio: "Just vibing through life. Music lover, sunset chaser, and always down to talk deep stuff. 🌇🎧✨",
    stats: {
      posts: 47,
      followers: "1.2k",
      following: 138
    }
  },
  sky_chaser: {
    name: "Sky Chaser",
    username: "sky_chaser",
    avatar: "https://source.unsplash.com/100x100/?sky,face",
    bio: "Dreaming above the clouds ☁️ Always on the lookout for the next sunset.",
    stats: {
      posts: 23,
      followers: "892",
      following: 210
    }
  }
};

export default users;
