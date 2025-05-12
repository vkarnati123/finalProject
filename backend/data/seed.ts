import { db } from '../db';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    console.log('🌱 Clearing existing data...');
    await db.deleteFrom('posts').execute();
    await db.deleteFrom('follows').execute();
    await db.deleteFrom('users').execute();

    console.log('🌱 Seeding users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    await db.insertInto('users').values([
      { id: 1, username: 'luna_vee', email: 'luna@example.com', password: hashedPassword },
      { id: 2, username: 'devonloop', email: 'devon@example.com', password: hashedPassword },
      { id: 3, username: 'sky_chaser', email: 'sky@example.com', password: hashedPassword },
    ]).execute();

    const users = await db.selectFrom('users').select(['id', 'username']).execute();
    const userMap = Object.fromEntries(users.map(user => [user.username, user.id]));

    const lunaId = userMap['luna_vee'];
    const devonId = userMap['devonloop'];
    const skyId = userMap['sky_chaser'];

    if (!lunaId || !devonId || !skyId) {
      throw new Error('❌ One or more required users are missing.');
    }

    console.log('📝 Seeding posts...');
    await db.insertInto('posts').values([
      {
        user_id: lunaId,
        caption: 'Weekend party was lit 🔥💃',
        image: 'https://picsum.photos/400/250?random=1',
        likes: 2400,
        created_at: new Date(),
      },
      {
        user_id: devonId,
        caption: 'My cat thinks he’s royalty 😼',
        image: 'https://picsum.photos/400/250?random=2',
        likes: 1100,
        created_at: new Date(),
      },
      {
        user_id: skyId,
        caption: 'Sunset thoughts 🌇 #nofilter',
        image: 'https://picsum.photos/400/250?random=3',
        likes: 3200,
        created_at: new Date(),
      }
    ]).execute();

    console.log('🔁 Seeding follow relationships...');
    await db.insertInto('follows').values([
      { follower_id: lunaId, followed_id: devonId },
      { follower_id: lunaId, followed_id: skyId },
      { follower_id: devonId, followed_id: skyId },
    ]).execute();

    console.log('✅ Seed complete');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await db.destroy();
  }
}

seed();
