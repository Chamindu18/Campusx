# CampusX

**A full-stack marketplace and dorm discovery platform for university students.**
Buy and sell items, find dorms, and message other students in one place.

[![Live Demo](https://img.shields.io/badge/Live_Demo-campusx--three.vercel.app-000000?style=flat-square&logo=vercel)](https://campusx-three.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2d3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)

> Solo project · 2026 · Deployed on Vercel

---

## Features

**Marketplace**
- Post, edit and delete listings with image uploads
- Search and filter by category, price and condition
- Seller profiles and detail pages

**Dorm discovery**
- Browse dorms and filter by university, city, gender type and room type
- Facilities (WiFi, laundry, kitchen, etc.) and distance from the university

**Community**
- Save listings and dorms to a personal saved list
- Private messaging with conversation history
- In-app notifications with read/unread status
- Report inappropriate listings or users, reviewed by admins

**Accounts and security**
- Registration and login with JWT authentication
- Passwords hashed with bcrypt
- Role-based access (User / Admin)
- Protected routes and API endpoints
- Ownership checks so users can only edit their own content
- Request validation with Zod

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Next.js API routes (Node.js) |
| Database | PostgreSQL with Prisma ORM and Prisma Migrations |
| Auth | JWT (`jsonwebtoken`), `bcryptjs` |
| Forms and data | React Hook Form, Zod, SWR, Axios |
| Uploads | UploadThing |
| Tooling | ESLint, Prettier |

---

## Key design decisions

- **One Next.js codebase for UI and API.** Pages and API routes live in the same app, so there is one deployment on Vercel and no separate backend to host.
- **Relational data model with Prisma.** Users, listings, dorms, conversations, messages, saved listings, notifications and reports are separate models linked by relations, so the database enforces integrity (for example, a message always belongs to a conversation).
- **Zod for validation.** The same approach validates forms on the client and input on the API, so bad data is rejected at the boundary.
- **Authorization checked on the server.** Role and ownership checks run in the API routes, not just in the UI, so hiding a button is never the only protection.
- **UploadThing for images.** Image files go to a CDN and only their URLs are stored in the database.

<!-- VERIFY BEFORE PUBLISHING (delete this comment after checking):
1. Where is the JWT stored: HttpOnly cookie or localStorage? If HttpOnly cookie, add "stored in an HttpOnly cookie" to the Accounts and security list above.
2. Do list endpoints (listings, dorms) use pagination? If yes, add "Paginated listing endpoints" under Marketplace.
3. Does schema.prisma contain @@index or @unique constraints? If yes, add "Indexed queries on frequently filtered fields" to the data-model decision.
4. Do authorization/ownership checks really run in the API routes? Confirm in app/api/listings/[id]/route.ts (or similar).
-->

---

## Getting started

### Prerequisites
- Node.js 18+ and npm
- A PostgreSQL database
- An [UploadThing](https://uploadthing.com) account for image uploads

### Setup

```bash
git clone https://github.com/Chamindu18/Campusx.git
cd Campusx/frontend
npm install
cp .env.example .env.local     # then fill in the values below
npx prisma migrate deploy
npm run dev
```

The app runs at `http://localhost:3000`.

<!-- VERIFY: .env.example exists in frontend/. If not, create it with the variable names below (no real values) or remove the cp line. Also check whether "npm run seed" exists in package.json before documenting it. -->

### Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign tokens (generate with `openssl rand -hex 32`) |
| `NEXT_PUBLIC_UPLOADTHING_APP_ID` | UploadThing app ID |
| `UPLOADTHING_SECRET` | UploadThing secret key |
| `NEXT_PUBLIC_APP_URL` | Base URL of the app, e.g. `http://localhost:3000` |

Never commit `.env.local`.

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Create and apply a migration |
| `npx prisma studio` | Browse the database in a GUI |

<!-- VERIFY: these scripts match "scripts" in frontend/package.json. The old README listed lint:fix and "npx prisma seed" (not a valid command; the real one is "npx prisma db seed"). -->

---

## API overview

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/current-user` |
| Listings | `GET, POST /api/listings` · `GET, PATCH, DELETE /api/listings/[id]` · `GET /api/my-listings` |
| Dorms | `GET, POST /api/dorms` · `GET, PATCH, DELETE /api/dorms/[id]` · `GET /api/my-dorms` |
| Messaging | `GET, POST /api/conversations` · `GET, POST /api/messages` |
| Saved | `GET, POST /api/saved-listings` · `DELETE /api/saved-listings/[id]` |
| Users | `GET, PATCH /api/profile` · `GET /api/users` · `GET /api/users/[id]` |
| Notifications | `GET /api/notifications` · `PATCH /api/notifications/[id]` |
| Reports | `POST, GET /api/reports` · `PATCH /api/reports/[id]` (admin) |
| Uploads | `POST /api/uploadthing` |

---

## Roadmap

Things I know are missing and plan to add:

- WebSocket-based live messaging (messages are currently fetched, not pushed)
- Email verification and password reset
- Rate limiting on sensitive endpoints and CSRF protection
- Two-factor authentication
- Ratings and reviews, user blocking, message attachments
- Caching and further query optimisation

---

## Author

**Chamindu Hansana** · CS undergraduate, NSBM Green University
[LinkedIn](https://www.linkedin.com/in/chamindu-hansana-a0b39a362/) · [Portfolio](https://chamindu18.github.io/Chamindu-Portfolio/) · chamindu553@gmail.com

Released under the [MIT License](LICENSE).
