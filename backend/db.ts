import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

interface Post {
  id?: number;
  user_id: number;
  caption: string;
  image?: string;
  likes?: number;
  created_at?: Date;
}

interface Comment {
  id?: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at?: Date;
}

interface Database {
  users: User;
  posts: Post;
  comments: Comment;
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});
