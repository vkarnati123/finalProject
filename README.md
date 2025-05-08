# VibeSpace

A modern full-stack social web app built with:

* ⚛️ React + Vite + Tailwind CSS (Frontend)
* 🧠 Express + PostgreSQL + Kysely ORM (Backend)
* 🍜 Cookie-based authentication (no JWT)
* 🔐 TypeScript all the way

---

## 🔧 Project Structure

```
main/
├── backend/
│   ├── db.ts             # Kysely DB connection
│   ├── index.ts          # Express entry point
│   ├── routes/           # Auth + user routes
│   ├── data/             # Seed scripts
│   └── reset-db.sh       # Truncate + seed helper
├── frontend/
│   ├── src/
│   └── vite.config.ts
```

---

## 🧪 Prerequisites

* Node.js `>=18`
* PostgreSQL running locally (defaults to `vibespace` DB)
* `.env` in `/backend`:

```env
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vibespace
```

---

## 🚀 Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/main.git
cd main
```

### 2. Initialize the backend

```bash
cd backend
npm install
npm run create-db
npm run create-tables
npm run seed
```

OR run it all:

```bash
./setup.sh         # or ./reset-db.sh to reset
```

### 3. Start the backend

```bash
npm run dev
```

### 4. Initialize the frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 Usage

* Visit `http://localhost:5173`
* Sign up and explore trending vibes!
* View your profile at `/profile/:username`

---

## 📦 Scripts

### Backend

| Script          | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start Express with ts-node |
| `npm run build` | Compile to JS in `/dist`   |
| `npm start`     | Run compiled backend       |
| `npm run seed`  | Seed DB with dummy data    |
| `./reset-db.sh` | Truncate + reseed DB       |

---

## 🔒 Auth

* **Cookies** used for session (not localStorage)
* **Secure** defaults with CORS + cookie-parser
* See `/api/auth/signup`, `/login`, `/logout`

---

## ✅ TODOs

* [ ] Add profile image uploads
* [ ] Add comments & likes logic
* [ ] Improve error boundaries in frontend
* [ ] Deploy to Fly.io / Render / Vercel

---

## 📄 License

