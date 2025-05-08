#!/bin/bash

echo "📦 Installing backend dependencies..."
cd backend || exit
npm install

echo "🛠 Creating database..."
npx ts-node createDatabase.ts || exit 1

echo "🧱 Creating tables..."
npx ts-node createTables.ts || exit 1

echo "🌱 Seeding database..."
npx ts-node data/seed.ts || exit 1

cd ../frontend || exit
echo "📦 Installing frontend dependencies..."
npm install

echo -e "\033[1;32m✅ Setup complete! Run the app with:\033[0m"
echo " - npm run dev (in backend)"
echo " - npm start (in frontend)"
