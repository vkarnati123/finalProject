import { db } from './db';
import { sql } from 'kysely';

async function createTables() {
  try {
    await db.schema
      .createTable('users')
      .ifNotExists()
      .addColumn('id', 'serial', col => col.primaryKey())
      .addColumn('username', 'varchar', col => col.notNull().unique())
      .addColumn('email', 'varchar', col => col.notNull().unique())
      .addColumn('password', 'varchar', col => col.notNull())
      .execute();

      await db.schema
      .createTable('posts')
      .ifNotExists()
      .addColumn('id', 'serial', col => col.primaryKey())
      .addColumn('user_id', 'integer', col => col.references('users.id').onDelete('cascade'))
      .addColumn('caption', 'varchar', col => col.notNull())
      .addColumn('image', 'varchar')
      .addColumn('likes', 'integer', col => col.defaultTo(0))
      .addColumn('created_at', 'timestamp', col => col.defaultTo(sql`now()`))
      .execute();
    
    await db.schema
      .createTable('comments')
      .ifNotExists()
      .addColumn('id', 'serial', col => col.primaryKey())
      .addColumn('post_id', 'integer', col => col.references('posts.id').onDelete('cascade'))
      .addColumn('user_id', 'integer', col => col.references('users.id').onDelete('cascade'))
      .addColumn('content', 'varchar', col => col.notNull())
      .addColumn('created_at', 'timestamp', col => col.defaultTo(sql`now()`))
      .execute();

    await db.schema
      .createTable('follows')
      .ifNotExists()
      .addColumn('follower_id', 'integer', col => col.notNull().references('users.id').onDelete('cascade'))
      .addColumn('followed_id', 'integer', col => col.notNull().references('users.id').onDelete('cascade'))
      .addPrimaryKeyConstraint('pk_follows', ['follower_id', 'followed_id'])
      .execute();

    console.log('✅ Tables created successfully');
  } catch (err) {
    console.error('❌ Error creating tables:', err);
  } finally {
    await db.destroy();
  }
}

createTables();
