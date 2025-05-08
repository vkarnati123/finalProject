// scripts/seed.ts
import { db } from '../db';

async function seed() {
  const users = await db.selectFrom('users').select(['id', 'username']).execute();

  const userMap = Object.fromEntries(users.map(user => [user.username, user.id]));




  await db.insertInto('posts').values([
    {
      id: 1,
      user_id: userMap["luna_vee"], // ✅ correct key name
      caption: "Weekend party was lit 🔥💃",
      image: "https://source.unsplash.com/400x250/?party",
      likes: 2400,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    },
    {
      id:2,
      user_id: userMap["devonloop"],
      caption: "My cat thinks he’s royalty 😼",
      image: "https://source.unsplash.com/400x250/?cat",
      likes: 1100,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    },
    {
      id: 3,
      user_id: userMap["sky_chaser"],
      caption: "Sunset thoughts 🌇 #nofilter",
      image: "https://source.unsplash.com/400x250/?sunset",
      likes: 3200,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    }
  ]).execute();
}  