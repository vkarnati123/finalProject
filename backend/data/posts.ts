import { db } from '../db';

async function seed() {
  try {
    const users = await db.selectFrom('users').select(['id', 'username']).execute();

    const userMap = Object.fromEntries(users.map(user => [user.username, user.id]));

    await db.insertInto('posts').values([
      {
        id: 1,
        user_id: userMap["luna_vee"]!, // Non-null assertion
        caption: "Weekend party was lit 🔥💃",
        image: "https://picsum.photos/400/250?random=1",
        likes: 2400,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      },
      {
        id: 2,
        user_id: userMap["devonloop"]!, // Non-null assertion
        caption: "My cat thinks he’s royalty 😼",
        image: "https://picsum.photos/400/250?random=2",
        likes: 1100,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      },
      {
        id: 3,
        user_id: userMap["sky_chaser"]!, // Non-null assertion
        caption: "Sunset thoughts 🌇 #nofilter",
        image: "https://picsum.photos/400/250?random=3",
        likes: 3200,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
      }
    ]).execute();
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}

