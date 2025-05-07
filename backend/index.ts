import express from 'express';
import cors from 'cors';
import { db } from './db';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/posts', async (_req, res) => {
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
        'users.username'
      ])
      .orderBy('posts.created_at', 'desc')
      .execute();

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
