import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../db';

const router = Router();

// Signup route
router.post('/signup', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await db
      .selectFrom('users')
      .select(['id'])
      .where('email', '=', email)
      .executeTakeFirst();

    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insertInto('users').values({
      username,
      email,
      password: hashedPassword,
    }).execute();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await db
      .selectFrom('users')
      .select(['username', 'email', 'password'])
      .where('email', '=', email)
      .executeTakeFirst();

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.cookie('username', user.username, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    res.status(200).json({
      message: 'Login successful',
      username: user.username,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('username');
  res.status(200).json({ message: 'Logged out successfully' });
});

export default router;
