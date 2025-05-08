import { Router } from 'express';
import { db } from '../db';

const router = Router();

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
