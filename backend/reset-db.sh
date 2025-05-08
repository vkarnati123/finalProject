#!/bin/bash

DB_NAME="vibespace"
DB_USER="postgres"

echo "🔄 Resetting database: $DB_NAME..."

# 1. Run truncate as the postgres Linux user
echo "⛔ Truncating tables as postgres user..."
sudo -u postgres psql -d $DB_NAME -c "TRUNCATE users, posts, comments RESTART IDENTITY CASCADE;" || exit 1

# 2. Run seed as the current (normal) user
echo "🌱 Reseeding database as $USER..."
npx ts-node data/seed.ts || exit 1

echo "✅ Database reset and reseeded."
