# Forum SaaS Web Application

This is a SaaS-style forum web application where users can register, log in, and create posts and comments. Users can interact with each other and manage their own content. Built with a TypeScript stack: Express (backend), PostgreSQL (database), and Next.js (frontend).

## Features

- 🔐 User signup, login, logout (session-based auth)
- 📝 Create, read, update, and delete (CRUD) posts and comments
- 👤 Profile management
- 💬 View and interact with forum discussions
- 💅 Styled with Tailwind CSS

## Tech Stack

- **Frontend:** React, CSS
- **Backend:** Express.js (TypeScript)
- **Database:** PostgreSQL (via Prisma or Sequelize ORM)
- **Auth:** Sessions with cookie-based authentication (via Express Session or JWT)

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 13
- Yarn or npm

### Setup

#### Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
