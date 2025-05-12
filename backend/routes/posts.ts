import { Router, Request, Response } from 'express';
import { db } from '../db';
import { sql } from 'kysely';

const router = Router();

// GET /api/posts - All posts with user info
router.get('/', async (_req: Request, res: Response) => {
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

// POST /api/posts/:id/like - Increment likes
router.post('/:id/like', async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId)) return res.status(400).json({ error: 'Invalid post ID' });

  try {
    await db
      .updateTable('posts')
      .set({ likes: sql`likes + 1` })
      .where('id', '=', postId)
      .execute();

    res.status(200).json({ message: 'Post liked!' });
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ error: 'Could not like post' });
  }
});

// POST /api/posts - Create a new vibe
router.post('/', async (req: Request, res: Response) => {
  const { caption, image, username } = req.body;

  if (!caption || !image || !username) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await db
      .selectFrom('users')
      .select(['id'])
      .where('username', '=', username)
      .executeTakeFirst();

    if (!user?.id) {
      return res.status(404).json({ error: 'User not found' });
    }

    await db
      .insertInto('posts')
      .values({
        user_id: user.id,
        caption,
        image,
        created_at: new Date(),
        likes: 0,
      })
      .execute();

    res.status(201).json({ message: 'Vibe posted successfully' });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/posts/:id - Update caption or image of a post
// example request body:
// {
//   "caption": "Updated caption",
//   "image": "https://example.com/new-image.jpg"
// }
// Note: You can update either caption or image or both
router.put('/:id', async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const { caption, image } = req.body;

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  if (!caption && !image) {
    return res.status(400).json({ error: 'No update fields provided' });
  }

  try {
    const updateData: Record<string, any> = {};
    if (caption) updateData.caption = caption;
    if (image) updateData.image = image;

    const result = await db
      .updateTable('posts')
      .set(updateData)
      .where('id', '=', postId)
      .execute();

    if (result[0]?.numUpdatedRows === 0n) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Update post error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/posts/:id - Delete a post by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);

  if (isNaN(postId)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const result = await db
      .deleteFrom('posts')
      .where('id', '=', postId)
      .execute();

    if (result[0]?.numDeletedRows === 0n) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
