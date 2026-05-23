# CampusX 🎓

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-success?style=flat-square)]()

> **A modern full-stack student marketplace and dorm discovery platform for university students in Sri Lanka.** Connect, buy, sell, and discover the perfect dorm or items within your campus community.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Folder Structure](#folder-structure)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🎯 Overview

**CampusX** is a comprehensive marketplace platform designed specifically for university students in Sri Lanka. It bridges the gap between students looking to buy, sell, and share resources within their campus communities. Whether you're searching for affordable dorm accommodations, buying secondhand textbooks, or connecting with fellow students, CampusX makes campus commerce seamless and secure.

### Key Highlights

- **Zero Registration Required** – Browse publicly without creating an account
- **Secure Messaging** – Private conversations between buyers and sellers
- **Smart Search** – Intelligent homepage search and filtering
- **Dorm Discovery** – Find and review boarding houses near universities
- **Community-Driven** – Reputation and notification systems
- **Mobile-First** – Fully responsive design optimized for all devices

---

## ✨ Features

### 🛒 Marketplace
- Browse thousands of student-to-student listings
- Advanced filtering and search capabilities
- Real-time availability updates
- Item categorization and smart recommendations
- Detailed product listings with multiple images

### 🏠 Dorm System
- Discover dorms and boarding houses near universities
- Comprehensive dorm profiles with reviews
- Location-based browsing
- Dorm amenities and facility information
- Room availability tracking

### 👤 User Management
- Secure JWT-based authentication
- User profile management
- Seller ratings and reviews
- Saved listings and dorms collection
- Purchase and selling history

### 💬 Communication
- Real-time private messaging system
- Conversation history
- Message notifications
- Direct contact with buyers/sellers

### 📊 Dashboard
- Seller analytics and statistics
- Listing performance metrics
- Active conversations overview
- Profile management hub

### 🔔 Smart Features
- Notification system for messages and activity
- Reporting system for spam/abuse
- Skeleton loading for better UX
- Mobile-friendly filter drawer
- Responsive design across all devices

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend Framework** | Next.js 14 (App Router) | Full-stack React framework with file-based routing |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Data Fetching** | SWR | React hook for data fetching and caching |
| **Backend** | Next.js API Routes | Serverless API endpoints |
| **Database** | PostgreSQL (Neon) | Reliable relational database |
| **ORM** | Prisma | Type-safe database client |
| **Authentication** | JWT (JSON Web Tokens) | Secure token-based auth |
| **Middleware** | Next.js Middleware | Route protection and request interception |
| **File Upload** | UploadThing | Serverless file upload service |
| **Deployment** | Vercel | Serverless hosting platform |

---

## 🏗️ Architecture

### Frontend Architecture
```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages (login, signup)
│   ├── (platform)/        # Protected platform routes
│   └── api/               # Backend API routes
├── components/            # Reusable React components
│   ├── layout/            # Layout components (Navbar, Sidebar, etc.)
│   ├── sections/          # Page-specific component sections
│   └── ui/                # Shared UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and helpers
├── constants/             # App-wide constants and config
└── prisma/               # Database schema and migrations
```

### Database Architecture
- **Multi-Table Schema** with relationships for users, listings, dorms, messages, and notifications
- **Optimized Queries** with Prisma for efficient data fetching
- **Migration History** for version control of database changes
- **Type-Safe** Prisma Client for frontend and backend

### Authentication Flow
1. User submits credentials (login/register)
2. Backend validates and generates JWT token
3. Token stored in secure HTTP-only cookie
4. Middleware verifies token on protected routes
5. User data included in request context

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) – [Download](https://nodejs.org/)
- **npm** or **yarn** – Node package manager
- **Git** – Version control
- **PostgreSQL** account (or Neon) – [Neon Console](https://console.neon.tech/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/campusx.git
   cd campusx/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   See [Environment Variables](#environment-variables) section to fill in your credentials.

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run Database Migrations**
   ```bash
   npx prisma migrate deploy
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

---

## 🔐 Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# JWT Authentication
JWT_SECRET="your-secure-random-string-min-32-characters"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# UploadThing (File Upload)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# OAuth Providers (Optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string from Neon | `postgresql://user:pass@host/db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | Any random 32+ character string |
| `NEXT_PUBLIC_APP_URL` | Public URL of the application | `http://localhost:3000` |
| `UPLOADTHING_SECRET` | API secret from UploadThing | Provided by UploadThing dashboard |
| `UPLOADTHING_APP_ID` | App ID from UploadThing | Provided by UploadThing dashboard |

> ⚠️ **Security Note:** Never commit `.env.local` to version control. Use `.env.example` for documenting required variables.

---

## 🗄️ Database Setup

### Initial Setup

The database schema is managed through Prisma migrations. To set up your database:

1. **Create a PostgreSQL Database**
   - Sign up for [Neon](https://console.neon.tech/) (Free tier available)
   - Create a new project and copy the connection string

2. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed Database (Optional)**
   ```bash
   node scripts/create-admin.js
   ```

### Key Tables

- **Users** – Student profiles and authentication
- **Listings** – Marketplace items for sale
- **Dorms** – Boarding house information
- **Messages** – Private conversations
- **Conversations** – Message threads
- **Notifications** – User alerts and updates
- **Reports** – Content moderation and abuse reporting
- **SavedListings** – User bookmarks for listings
- **SavedDorms** – User bookmarks for dorms

### Making Schema Changes

1. Update `prisma/schema.prisma`
2. Create a migration:
   ```bash
   npx prisma migrate dev --name descriptive_name
   ```
3. Commit the migration file

---

## 💻 Running Locally

### Development Mode

```bash
npm run dev
```

Starts the Next.js development server with hot-reload enabled.

**Access the application:**
- Frontend: `http://localhost:3000`
- API Routes: `http://localhost:3000/api/*`
- Prisma Studio: Run `npx prisma studio` (Database UI)

### Building for Production

```bash
npm run build
npm run start
```

Compiles TypeScript and optimizes the application for production.

### Linting and Type Checking

```bash
# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

---

## 📁 Folder Structure

```
frontend/
├── prisma/
│   ├── schema.prisma              # Database schema definition
│   └── migrations/                # Database migration history
├── public/                        # Static assets
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── (auth)/               # Public auth pages
│   │   │   ├── login/            # Login page
│   │   │   └── signup/           # Signup page
│   │   ├── (platform)/           # Protected routes
│   │   │   ├── admin/            # Admin dashboard
│   │   │   ├── create-dorm/      # Dorm creation
│   │   │   ├── create-listing/   # Listing creation
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── dorms/            # Dorm browsing
│   │   │   ├── marketplace/      # Marketplace
│   │   │   ├── messages/         # Messaging
│   │   │   ├── notifications/    # Notifications
│   │   │   ├── profile/          # User profile
│   │   │   ├── saved/            # Saved items
│   │   │   ├── settings/         # User settings
│   │   │   └── users/            # User directory
│   │   ├── api/                  # Backend API routes
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   ├── conversations/    # Messaging API
│   │   │   ├── dorms/            # Dorm endpoints
│   │   │   ├── listings/         # Listing endpoints
│   │   │   ├── messages/         # Message endpoints
│   │   │   ├── notifications/    # Notification endpoints
│   │   │   ├── profile/          # Profile endpoints
│   │   │   ├── reports/          # Reporting API
│   │   │   └── users/            # User endpoints
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/               # Reusable components
│   │   ├── layout/               # Layout components
│   │   ├── sections/             # Page sections
│   │   └── ui/                   # UI components
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-current-user.ts   # Current user hook
│   │   ├── use-listings.ts       # Listings hook
│   │   ├── use-messages.ts       # Messages hook
│   │   ├── use-notifications.ts  # Notifications hook
│   │   └── use-profile.ts        # Profile hook
│   ├── lib/                      # Utility functions
│   │   ├── auth.ts               # Auth utilities
│   │   ├── auth-edge.ts          # Edge middleware auth
│   │   ├── prisma.ts             # Prisma client
│   │   └── utils.ts              # Helper functions
│   ├── constants/                # App constants
│   │   ├── navigation.ts         # Routes
│   │   ├── theme.ts              # Theme constants
│   │   └── mock-*.ts             # Mock data
│   └── middleware.ts             # Next.js middleware
├── scripts/
│   └── create-admin.js           # Admin user seeding
├── .env.example                  # Example env variables
├── .eslintrc.json               # ESLint config
├── eslint.config.mjs            # ESLint rules
├── next.config.js               # Next.js config
├── postcss.config.js            # PostCSS config
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
└── README.md                    # This file
```

---

## 🔌 API Overview

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/current-user` | Get authenticated user |

### Marketplace Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | Get all listings |
| POST | `/api/listings` | Create listing |
| GET | `/api/listings/:id` | Get listing details |
| PUT | `/api/listings/:id` | Update listing |
| DELETE | `/api/listings/:id` | Delete listing |
| GET | `/api/my-listings` | User's listings |
| POST | `/api/saved-listings` | Save listing |
| GET | `/api/saved-listings` | Get saved listings |

### Dorm Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dorms` | Get all dorms |
| POST | `/api/dorms` | Create dorm |
| GET | `/api/dorms/:id` | Get dorm details |
| PUT | `/api/dorms/:id` | Update dorm |
| DELETE | `/api/dorms/:id` | Delete dorm |
| GET | `/api/my-dorms` | User's dorms |

### Messaging Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/conversations` | Get user conversations |
| POST | `/api/conversations` | Create conversation |
| GET | `/api/messages/:conversationId` | Get messages |
| POST | `/api/messages` | Send message |

### Notification Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Get notifications |
| POST | `/api/notifications/:id/read` | Mark as read |
| DELETE | `/api/notifications/:id` | Delete notification |

---

## 🌍 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as the root directory

3. **Set Environment Variables**
   - In Vercel project settings, add all variables from `.env.local`
   - Ensure `DATABASE_URL` points to your production database

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Production Checklist

- [ ] Database backed up and secured
- [ ] All environment variables set correctly
- [ ] JWT_SECRET is strong and unique
- [ ] HTTPS enabled
- [ ] Prisma migrations run successfully
- [ ] Error logging configured
- [ ] Email notifications set up
- [ ] CDN configured for static assets

---

## 🔮 Future Improvements

### Phase 2 - Enhanced Features
- [ ] Advanced search with filters and sorting
- [ ] User ratings and review system
- [ ] Wishlist and comparison features
- [ ] Analytics dashboard for sellers
- [ ] Email notifications
- [ ] SMS alerts for messages
- [ ] Seller verification badges
- [ ] Dispute resolution system

### Phase 3 - Monetization & Growth
- [ ] Premium listing features
- [ ] Featured listings
- [ ] Commission on transactions
- [ ] Advertising platform
- [ ] University partnerships
- [ ] Referral programs
- [ ] Mobile apps (iOS/Android)
- [ ] Payment gateway integration

### Technical Improvements
- [ ] Real-time notifications (WebSockets)
- [ ] Image optimization and CDN
- [ ] Advanced caching strategies
- [ ] API rate limiting
- [ ] Comprehensive error handling
- [ ] Automated testing (Jest, Playwright)
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] Admin panel enhancements

---

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/campusx.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Test your changes locally

4. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Wait for code review and feedback

### Code Standards

- Use TypeScript for type safety
- Follow ESLint rules (`npm run lint`)
- Write meaningful variable and function names
- Add comments for complex logic
- Test before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

You're free to use, modify, and distribute this project for personal or commercial purposes.

---

## 👨‍💻 Author

**Chamindu**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com
- Portfolio: [your-website.com](https://your-website.com)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Neon PostgreSQL](https://neon.tech/)
- [Vercel Deployment](https://vercel.com/)

---

<div align="center">

### Made with ❤️ by [Chamindu](https://github.com/yourusername)

If you found this project helpful, please consider giving it a ⭐!

[Report Bug](https://github.com/yourusername/campusx/issues) · [Request Feature](https://github.com/yourusername/campusx/issues)

</div>
