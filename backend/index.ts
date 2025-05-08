import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { db } from './db';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Get all posts
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

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
