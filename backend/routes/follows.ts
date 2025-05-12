import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// Follow a user
// POST /api/follows
// Body: { followerId: number, followedId: number }
router.post('/', async (req: Request, res: Response) => {
  const { followerId, followedId } = req.body;

  if (!followerId || !followedId || followerId === followedId) {
    return res.status(400).json({ error: 'Invalid follower or followed user ID' });
  }

  try {
    const existing = await db
      .selectFrom('follows')
      .select(['follower_id'])
      .where('follower_id', '=', followerId)
      .where('followed_id', '=', followedId)
      .executeTakeFirst();

    if (existing) {
      return res.status(409).json({ error: 'Already following this user' });
    }

    await db
      .insertInto('follows')
      .values({ follower_id: followerId, followed_id: followedId })
      .execute();

    res.status(201).json({ message: 'Followed successfully' });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ error: 'Could not follow user' });
  }
});


// Unfollow a user
// DELETE /api/follows
// Body: { followerId: number, followedId: number }
router.delete('/', async (req: Request, res: Response) => {
  const { followerId, followedId } = req.body;

  try {
    await db.deleteFrom('follows')
      .where('follower_id', '=', followerId)
      .where('followed_id', '=', followedId)
      .execute();
    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error('Unfollow error:', error);
    res.status(500).json({ error: 'Could not unfollow user' });
  }
});

// Get users followed by a specific user
// GET /api/follows/:userId/following
// Params: userId
// Returns: Array of users followed by the user
// Example response: [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }]
router.get('/:userId/following', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const following = await db
      .selectFrom('follows')
      .innerJoin('users', 'users.id', 'follows.followed_id')
      .select(['users.id', 'users.username'])
      .where('follows.follower_id', '=', userId)
      .execute();

    res.status(200).json(following);
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: 'Could not fetch following list' });
  }
});

// Get followers of a specific user
// GET /api/follows/:userId/followers
// Params: userId
// Returns: Array of users following the user
// Example response: [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }]
router.get('/:userId/followers', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const followers = await db
      .selectFrom('follows')
      .innerJoin('users', 'users.id', 'follows.follower_id')
      .select(['users.id', 'users.username'])
      .where('follows.followed_id', '=', userId)
      .execute();

    res.status(200).json(followers);
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ error: 'Could not fetch followers list' });
  }
});

export default router;
