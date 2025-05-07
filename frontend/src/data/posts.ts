import { Post } from './types';



const posts: Post[] = [
  {
    id: 1,
    user: 'luna_vee',
    image: "https://source.unsplash.com/400x250/?beach",
    title: '"Beach therapy 🌊🧘‍♀️"',
    stats: {
      posts: 10,
      followers: "1.2k",
      following: 150
    }
  },
  {
    id: 2,
    user: 'luna_vee',
    image: "https://source.unsplash.com/400x250/?coffee",
    title: '"This espresso has me wired ☕⚡"',
    stats: {
      posts: 10,
      followers: "1.2k",
      following: 150
    }
  },
  {
    id: 3,
    user: 'sky_chaser',
    image: "https://source.unsplash.com/400x250/?sky",
    title: '"Skies speak in color ☁️🌈"',
    stats: {
      posts: 25,
      followers: "3.5k",
      following: 300
    }
  }
];

export default posts;
