import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { db } from './db';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import followRoutes from './routes/follows';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/follows', followRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
