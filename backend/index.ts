import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { db } from './db';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/posts', async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await db
      .selectFrom('posts')
      .innerJoin('users', 'users.id', 'posts.user_id')
      .select([
        'posts.id',
        'posts.caption',
        'posts.image',
        'posts.likes',
        'posts.created_at',
        'users.username',
      ])
      .orderBy('posts.created_at', 'desc')
      .execute();

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function handleSignup(req: Request, res: Response): void {
  const { username, email, password }: { username: string; email: string; password: string } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      db
        .insertInto('users')
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .execute()
    )
    .then(() => res.status(201).json({ message: 'User created successfully' }))
    .catch((err) => {
      console.error('Signup error:', err);
      res.status(500).json({ error: 'Signup failed' });
    });
}

app.post('/api/auth/signup', handleSignup);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
