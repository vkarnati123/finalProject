import { db } from '../db';

async function seed() {
  console.log('🌱 Seeding users...');

  // Insert users
  await db.insertInto('users').values([
    { id: 1, username: 'luna_vee', email: 'luna@example.com', password: 'hashedpass1' },
    { id: 2, username: 'devonloop', email: 'devon@example.com', password: 'hashedpass2' },
    { id: 3, username: 'sky_chaser', email: 'sky@example.com', password: 'hashedpass3' },
  ]).execute();

  // Retrieve inserted users
  const users = await db.selectFrom('users').select(['id', 'username']).execute();
  const userMap = Object.fromEntries(users.map(user => [user.username, user.id]));

  // Validate required users exist
  if (!userMap['luna_vee'] || !userMap['devonloop'] || !userMap['sky_chaser']) {
    throw new Error('❌ One or more required users are missing.');
  }

  console.log('📝 Seeding posts...');

  // Insert posts
  await db.insertInto('posts').values([
    {
      id: 1,
      user_id: userMap['luna_vee']!,
      caption: 'Weekend party was lit 🔥💃',
      image: 'https://source.unsplash.com/400x250/?party',
      likes: 2400,
      created_at: new Date(),
    },
    {
      id: 2,
      user_id: userMap['devonloop']!,
      caption: 'My cat thinks he’s royalty 😼',
      image: 'https://source.unsplash.com/400x250/?cat',
      likes: 1100,
      created_at: new Date(),
    },
    {
      id: 3,
      user_id: userMap['sky_chaser']!,
      caption: 'Sunset thoughts 🌇 #nofilter',
      image: 'https://source.unsplash.com/400x250/?sunset',
      likes: 3200,
      created_at: new Date(),
    }
  ]).execute();

  console.log('✅ Seed complete');
}

// Run the script
seed().catch(err => {
  console.error('❌ Seeding failed:', err);
});
