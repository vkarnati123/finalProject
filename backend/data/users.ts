// scripts/users.ts
import { db } from '../db';
import bcrypt from 'bcrypt';

async function seedUsers() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await db.insertInto('users').values([
    {
      id: 1,
      username: 'luna_vee',
      email: 'luna@example.com',
      password: hashedPassword
    },
    {
      id: 2,
      username: 'devonloop',
      email: 'devon@example.com',
      password: hashedPassword
    },
    {
      id: 3,
      username: 'sky_chaser',
      email: 'sky@example.com',
      password: hashedPassword
    }
  ]).execute();

  console.log('Users seeded');
}

seedUsers();
