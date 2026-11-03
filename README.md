# CampusX

**A full-stack marketplace and dorm discovery platform for university students.**

CampusX lets students buy and sell items, discover nearby dorms, communicate through private messaging, save marketplace listings, and report inappropriate listings in one platform.

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

### Marketplace

- Create, edit, and delete marketplace listings
- Upload up to five images per listing
- Search listings by title or description
- Filter listings by category
- Paginated marketplace results
- View seller information and listing details
- Save marketplace listings for later

### Dorm discovery

- Create, edit, and delete dorm listings
- Browse student accommodation listings
- Search dorms by title or description
- Filter by university, city, gender type, room type, and maximum price
- Sort dorms by newest, lowest price, or highest price
- View facilities and distance from the selected university

### Messaging and community

- Private conversations between users
- Conversation history
- In-app notifications with read/unread state
- Report inappropriate marketplace listings
- Admin review and moderation workflows

### Accounts and security

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- JWT stored in an HttpOnly authentication cookie
- Secure cookie enabled automatically in production
- `SameSite=Lax` cookie policy
- User and Admin roles
- Protected application routes and API endpoints
- Server-side ownership checks for listings and dorms
- Server-side role checks for administrative operations
- Request validation with Zod
- Generic login errors to reduce user-enumeration risk
- Authenticated UploadThing image uploads

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Next.js Route Handlers / API routes running on Node.js |
| Database | PostgreSQL |
| ORM | Prisma 6 with Prisma Migrations |
| Authentication | JWT (`jsonwebtoken`), HttpOnly cookies, `bcryptjs` |
| Validation | Zod |
| Forms and data | React Hook Form, SWR, Axios |
| File uploads | UploadThing |
| Tooling | ESLint, Prettier |
| Deployment | Vercel |

---

## Architecture

CampusX uses a single Next.js application for both the frontend and backend API.

```text
Browser
   │
   ▼
Next.js App Router
   │
   ├── UI / React pages
   │
   └── API Route Handlers
           │
           ├── Authentication / Authorization
           ├── Zod Validation
           └── Prisma ORM
                   │
                   ▼
              PostgreSQL
```

This keeps the frontend and backend in one deployable application while still separating UI, API, validation, authentication, and persistence responsibilities.

---

## Key design decisions

### Single Next.js codebase

The user interface and API routes live in the same Next.js application, allowing CampusX to be deployed as one application on Vercel without a separately hosted backend.

### Server-side authorization

Authorization is not based only on hidden UI controls.

Protected API routes resolve the authenticated user on the server and verify permissions before performing protected operations.

For example:

- A listing can be edited or deleted by its owner or an Admin.
- A dorm can be edited or deleted by its owner or an Admin.
- Administrative API routes enforce administrator access separately from the frontend.

This protects against IDOR-style authorization failures where a user attempts to modify another user's resource directly through the API.

### HttpOnly JWT authentication

After successful login, the backend signs a JWT and stores it in an authentication cookie configured with:

- `HttpOnly`
- `SameSite=Lax`
- `Secure` in production
- An explicit maximum age

The token is therefore not stored in browser `localStorage` and is not directly accessible to client-side JavaScript.

### Input validation

Zod schemas validate incoming data before it is used by protected application logic or persisted to the database.

### Relational database design

PostgreSQL and Prisma model the relationships between:

- Users
- Marketplace listings
- Dorm listings
- Conversations
- Conversation participants
- Messages
- Saved listings
- Notifications
- Reports

Foreign-key relationships and cascading deletes are used where appropriate.

### Database constraints and indexes

The Prisma schema includes unique constraints and indexes for frequently used relationships and query fields.

Examples include:

- Unique user email addresses
- Unique user/conversation membership
- Unique saved listing per user
- Listing indexes on `userId`, `category`, and `createdAt`
- Dorm indexes on `userId`, `university`, `city`, `gender`, and `createdAt`
- Message indexes on conversation and creation time
- Notification and report indexes

### Image uploads

UploadThing handles image storage.

The upload route requires an authenticated user before accepting marketplace images. The application stores uploaded image URLs rather than binary image data in PostgreSQL.

---

## Project structure

```text
Campusx/
├── README.md
└── frontend/
    ├── prisma/
    │   ├── migrations/
    │   └── schema.prisma
    │
    ├── public/
    ├── scripts/
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/
    │   │   ├── (platform)/
    │   │   └── api/
    │   └── lib/
    │
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    └── tsconfig.json
```

---

## Authentication flow

```text
Registration
     │
     ▼
Password hashed with bcrypt
     │
     ▼
User stored in PostgreSQL
     │
     ▼
Login credentials validated
     │
     ▼
JWT signed by server
     │
     ▼
JWT stored in HttpOnly cookie
     │
     ▼
Cookie sent with authenticated requests
     │
     ▼
Server verifies current user
     │
     ▼
Role / ownership authorization
     │
     ▼
Protected operation
```

---

## Marketplace authorization flow

For protected update and delete operations:

```text
Request
   │
   ▼
Resolve authenticated user
   │
   ├── No user ─────────────► 401 Unauthorized
   │
   ▼
Load requested resource
   │
   ├── Missing resource ────► 404 Not Found
   │
   ▼
Check ownership or Admin role
   │
   ├── Not permitted ───────► 403 Forbidden
   │
   ▼
Validate request data
   │
   ▼
Perform database operation
```

---

## Database model highlights

### User

Stores account details and role information and owns related marketplace listings, dorms, messages, saved listings, notifications, reports, and conversation memberships.

### Listing

Represents marketplace items.

Important indexed fields include:

- `userId`
- `category`
- `createdAt`

### Dorm

Represents student accommodation listings.

Important indexed fields include:

- `userId`
- `university`
- `city`
- `gender`
- `createdAt`

### Conversation and Message

Private conversations use a participant table that prevents the same user from being added to the same conversation more than once.

Messages are associated with both a user and a conversation.

### SavedListing

Uses a compound unique constraint on:

```text
userId + listingId
```

This prevents the same user from saving the same marketplace listing multiple times.

### Report

Represents reports against marketplace listings and tracks their moderation status.

---

## API overview

| Area | Endpoints |
|---|---|
| Authentication | `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout` |
| Current user | `GET /api/current-user` |
| Listings | `GET, POST /api/listings` · `GET, PATCH, DELETE /api/listings/[id]` |
| User listings | `GET /api/my-listings` |
| Dorms | `GET, POST /api/dorms` · `GET, PATCH, DELETE /api/dorms/[id]` |
| User dorms | `GET /api/my-dorms` |
| Messaging | Conversation and message API routes |
| Saved listings | Saved-listing API routes |
| Profile / users | Profile and user API routes |
| Notifications | Notification API routes |
| Reports | Reporting and moderation API routes |
| Uploads | UploadThing API route |
| Administration | Admin-specific users, listings, dorms, logs, statistics, and system routes |

---

## Getting started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL database
- UploadThing account / credentials

### 1. Clone the repository

```bash
git clone https://github.com/Chamindu18/Campusx.git
cd Campusx/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```text
.env.local
```

At minimum, the application requires configuration for:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-strong-random-secret"
```

UploadThing also requires the credentials expected by the installed UploadThing SDK.

Do not commit real credentials or secrets.

The repository's `.gitignore` excludes `.env*` files.

### 4. Prepare the database

For local development:

```bash
npx prisma generate
npx prisma migrate dev
```

For an already prepared production database, Prisma migrations can be applied with:

```bash
npx prisma migrate deploy
```

### 5. Run the application

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Available scripts

The current `package.json` defines:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run the configured lint command |

Useful Prisma commands include:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma studio
```

---

## Security considerations

The current implementation includes several important protections:

- Password hashing using bcrypt
- JWT verification on the server
- HttpOnly authentication cookies
- `Secure` cookies in production
- `SameSite=Lax`
- Backend ownership checks
- Backend Admin-role checks
- Zod request validation
- Generic invalid-credential responses
- Authenticated image-upload middleware
- Database uniqueness constraints

### Planned security improvements

The following are not currently presented as completed features:

- Rate limiting for sensitive endpoints
- Dedicated CSRF-token protection for state-changing requests
- Email verification
- Password-reset workflow
- Two-factor authentication
- Additional abuse-prevention and monitoring controls

---

## Current limitations and future improvements

Potential future improvements include:

- Real-time WebSocket-based messaging
- Email verification and password reset
- Rate limiting and stronger CSRF defenses
- Two-factor authentication
- Ratings and reviews
- User blocking
- Message attachments
- Additional caching
- Further database/query optimization
- Pagination for dorm discovery as the dataset grows

---

## Solo project ownership

CampusX is a **solo project**, so the architecture, database design, authentication flow, API implementation, frontend integration, security controls, deployment, and project documentation were developed as part of the same individual project.

The project demonstrates work across:

- Full-stack application development
- Authentication and authorization
- Relational database design
- API design
- Input validation
- Security-focused backend checks
- Responsive frontend development
- Cloud deployment

---

## Author

**Chamindu Hansana**  
Computer Science Undergraduate · NSBM Green University

- GitHub: [@Chamindu18](https://github.com/Chamindu18)
- LinkedIn: [Chamindu Hansana](https://www.linkedin.com/in/chamindu-hansana-a0b39a362/)
- Portfolio: [chamindu18.github.io/Chamindu-Portfolio](https://chamindu18.github.io/Chamindu-Portfolio/)
