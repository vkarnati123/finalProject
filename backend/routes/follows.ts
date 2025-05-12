import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// Follow a user
// POST /api/follows
// Body: { followerUsername: string, followedUsername: string }
router.post('/', async (req: Request, res: Response) => {
  const { followerUsername, followedUsername } = req.body;

  if (!followerUsername || !followedUsername || followerUsername === followedUsername) {
    return res.status(400).json({ error: 'Invalid follower or followed username' });
  }

  try {
    const [follower, followed] = await Promise.all([
      db.selectFrom('users').select(['id']).where('username', '=', followerUsername).executeTakeFirst(),
      db.selectFrom('users').select(['id']).where('username', '=', followedUsername).executeTakeFirst(),
    ]);

    if (!follower || !followed) {
      return res.status(404).json({ error: 'One or both users not found' });
    }

    const existing = await db
      .selectFrom('follows')
      .select(['follower_id'])
      .where('follower_id', '=', follower.id)
      .where('followed_id', '=', followed.id)
      .executeTakeFirst();

    if (existing) {
      return res.status(409).json({ error: 'Already following this user' });
    }

    await db.insertInto('follows').values({ follower_id: follower.id, followed_id: followed.id }).execute();
    res.status(201).json({ message: 'Followed successfully' });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ error: 'Could not follow user' });
  }
});

// Unfollow a user
// DELETE /api/follows
// Body: { followerUsername: string, followedUsername: string }
router.delete('/', async (req: Request, res: Response) => {
  const { followerUsername, followedUsername } = req.body;

  try {
    const [follower, followed] = await Promise.all([
      db.selectFrom('users').select(['id']).where('username', '=', followerUsername).executeTakeFirst(),
      db.selectFrom('users').select(['id']).where('username', '=', followedUsername).executeTakeFirst(),
    ]);

    if (!follower || !followed) {
      return res.status(404).json({ error: 'One or both users not found' });
    }

    await db.deleteFrom('follows')
      .where('follower_id', '=', follower.id)
      .where('followed_id', '=', followed.id)
      .execute();

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    console.error('Unfollow error:', error);
    res.status(500).json({ error: 'Could not unfollow user' });
  }
});

// Get users followed by a specific user
// GET /api/follows/:username/following
// Returns: Array of users followed by the user
// Example response: [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }]
router.get('/:username/following', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await db.selectFrom('users').select(['id']).where('username', '=', username).executeTakeFirst();
    if (!user) return res.status(404).json({ error: 'User not found' });

    const following = await db
      .selectFrom('follows')
      .innerJoin('users', 'users.id', 'follows.followed_id')
      .select(['users.id', 'users.username'])
      .where('follows.follower_id', '=', user.id)
      .execute();

    res.status(200).json(following);
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: 'Could not fetch following list' });
  }
});

// Get followers of a specific user
// GET /api/follows/:username/followers
// Returns: Array of users following the user
// Example response: [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }]
router.get('/:username/followers', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await db.selectFrom('users').select(['id']).where('username', '=', username).executeTakeFirst();
    if (!user) return res.status(404).json({ error: 'User not found' });

    const followers = await db
      .selectFrom('follows')
      .innerJoin('users', 'users.id', 'follows.follower_id')
      .select(['users.id', 'users.username'])
      .where('follows.followed_id', '=', user.id)
      .execute();

    res.status(200).json(followers);
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ error: 'Could not fetch followers list' });
  }
});

// Get follower/following stats for a user
// GET /api/follows/:username/stats
// Returns: { followers: number, following: number }
// Example response: { followers: 10, following: 5 }
router.get('/:username/stats', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await db.selectFrom('users').select(['id']).where('username', '=', username).executeTakeFirst();
    if (!user) return res.status(404).json({ error: 'User not found' });

    const [followers, following] = await Promise.all([
      db.selectFrom('follows').select(['follower_id']).where('followed_id', '=', user.id).execute(),
      db.selectFrom('follows').select(['followed_id']).where('follower_id', '=', user.id).execute(),
    ]);

    res.status(200).json({ followers: followers.length, following: following.length });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Could not fetch stats' });
  }
});

export default router;
