import { Router, Request, Response } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/users - Fetch all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await db
      .selectFrom('users')
      .select(['id', 'username', 'email'])
      .orderBy('username', 'asc')
      .execute();

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await db
      .selectFrom('users')
      .select(['id', 'username', 'email'])
      .where('username', '=', username)
      .executeTakeFirst();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
