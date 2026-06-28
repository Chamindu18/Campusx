# CampusX

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern full-stack student marketplace and dorm discovery platform designed for university students. Connect with peers, discover accommodation options, buy and sell items, and explore campus community essentials—all in one place.

🌍 **Live Demo**: [campusx-cth6ek3ao-chamindu553-3258s-projects.vercel.app](https://campusx-cth6ek3ao-chamindu553-3258s-projects.vercel.app)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Overview](#api-overview)
- [Scripts](#scripts)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features

### Authentication & User Management
- User registration and login with JWT-based authentication
- Secure password encryption with bcryptjs
- User profiles with avatar, bio, and university affiliation
- Role-based access (User/Admin)
- Protected routes and API endpoints

### Marketplace
- Browse and search marketplace listings by category
- Post new items for sale with image uploads
- Edit and manage your own listings
- Filter listings by condition (new, like-new, used, damaged)
- View detailed listing information and seller profiles
- Save favorite listings for later

### Dorm Management
- Discover and browse available dorms
- Filter dorms by university, city, gender type, and room type
- View facility details (WiFi, Laundry, Kitchen, etc.)
- Check distance from university
- Search dorms by location and amenities
- Save dorm listings

### Search & Filtering
- Advanced search with category-based filtering
- Marketplace filtering by price, condition, and category
- Dorm filtering by gender type, room type, university, and city
- Real-time search results
- Responsive search interface

### Saved Listings
- Save marketplace listings and dorms for later reference
- View all saved items in dedicated saved listings page
- Quick unsave functionality
- Persistent saved collections

### User Profiles
- Customizable user profiles with avatar upload
- University information and biography
- Display user listings and dorms
- User review and reputation system potential
- Settings page for profile management

### Real-Time Messaging
- Send and receive private messages between users
- Conversation history with timestamps
- Create and manage conversations
- View all active conversations
- Real-time message notifications

### Notifications System
- In-app notifications for important events
- Read/unread notification status
- Notification preferences
- Toast notifications for user feedback
- Link-based notification navigation

### Reporting & Safety
- Report inappropriate listings
- Report user conduct
- Admin review of reports
- Safety guidelines and enforcement

### Dashboard
- User dashboard with key metrics
- Quick access to your listings and dorms
- Recent activity overview
- Admin dashboard for management

### Responsive UI
- Mobile-first design approach
- Fully responsive layout across all devices
- Touch-optimized interface
- Smooth animations and transitions
- Dark mode support ready


## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **UI Library:** React 19
- **Styling:** Tailwind CSS 3
- **Animation:** Framer Motion 12
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js with Next.js API Routes
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** Zod

### Database
- **Database:** PostgreSQL
- **ORM:** Prisma 6
- **Migrations:** Prisma Migrations

### Form & State Management
- **Forms:** React Hook Form 7
- **Form Validation:** Zod
- **State Fetching:** SWR 2
- **HTTP Client:** Axios

### File & Asset Handling
- **File Upload:** UploadThing
- **Image CDN:** UploadThing CDN (utfs.io)
- **Toast Notifications:** React Hot Toast

### Development Tools
- **Linting:** ESLint 9
- **Code Formatting:** Prettier
- **Build Tool:** Next.js Build System
- **Package Manager:** npm


```

## Installation

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 12+ database
- UploadThing account (for file uploads)

### Steps

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/campusx.git
cd campusx/frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your actual values
nano .env.local
```

4. **Set up the database:**

```bash
# Create database tables
npx prisma migrate deploy

# Optional: Seed the database with initial data
npm run seed
```

5. **Start the development server:**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| `DATABASE_URL` | string | PostgreSQL connection string | `postgresql://user:password@localhost:5432/campusx` |
| `JWT_SECRET` | string | Secret key for JWT token signing (generate with `openssl rand -hex 32`) | `a1b2c3d4e5f6...` |
| `NEXT_PUBLIC_UPLOADTHING_APP_ID` | string | UploadThing app ID (public) | `f1x2a3m4p5l6` |
| `UPLOADTHING_SECRET` | string | UploadThing secret key | `sk_live_...` |
| `NEXT_PUBLIC_APP_URL` | string | Application URL | `http://localhost:3000` |
| `NODE_ENV` | string | Environment (development/production) | `development` |

**Note:** Never commit `.env.local` to version control. Use `.env.example` to document required variables.

## Usage

### Register a New Account

1. Navigate to the signup page (`/auth/signup`)
2. Enter your email, password, and name
3. Select your university
4. Click "Sign Up"
5. You'll be redirected to your dashboard

### Login

1. Go to the login page (`/auth/login`)
2. Enter your email and password
3. Click "Login"
4. Access your personalized dashboard

### Create a Marketplace Listing

1. From the dashboard, click "Create Listing" or navigate to `/create-listing`
2. Fill in listing details:
   - Title
   - Description
   - Category (Books, Electronics, Clothing, etc.)
   - Price
   - Condition (New, Like-new, Used, Damaged)
   - Location
3. Upload images (up to multiple images supported)
4. Click "Publish"
5. Your listing will appear in the marketplace

### Browse Marketplace Listings

1. Go to Marketplace (`/marketplace`)
2. Use filters:
   - Search by title or description
   - Filter by category
   - Filter by price range
   - Sort by newest or most relevant
3. Click on a listing to view details
4. View seller profile and contact information
5. Send a message to the seller

### Create a Dorm Listing

1. Navigate to "Create Dorm" (`/create-dorm`)
2. Fill in dorm details:
   - Title
   - Description
   - University
   - City
   - Gender type (Boys/Girls/Mixed)
   - Room type (Private/Shared)
   - Price per month
   - Facilities (WiFi, Laundry, Kitchen, etc.)
   - Contact number
   - Distance from university
3. Upload photos
4. Click "Publish"

### Discover Dorms

1. Go to Dorms page (`/dorms`)
2. Apply filters:
   - Filter by university
   - Filter by city
   - Filter by gender type
   - Filter by room type
   - Sort by price or newest
3. View dorm details including location, facilities, and contact info
4. Save dorm for later

### Save Listings

1. While viewing a listing (marketplace or dorm), click the "Save" button
2. Access all saved items from Saved Listings (`/saved`)
3. Manage your saved collection
4. Click "Unsave" to remove items

### Send Messages

1. Go to Messages (`/messages`)
2. Start a new conversation with another user
3. Type your message in the chat interface
4. Messages are stored in conversation history
5. Real-time message notifications

### Manage Notifications

1. Click the notifications icon in the navbar
2. View all in-app notifications
3. Click a notification to navigate to related item
4. Mark notifications as read

### Update Your Profile

1. Go to Settings (`/settings`)
2. Update profile information:
   - Name
   - Bio
   - University
   - Avatar
3. Click "Save Changes"
4. Visit your public profile at `/profile`

## API Overview

### Authentication Endpoints

```
POST   /api/auth/signup       - Register new user
POST   /api/auth/login        - Login user
POST   /api/auth/logout       - Logout user
GET    /api/current-user      - Get authenticated user info
```

### Marketplace Endpoints

```
GET    /api/listings          - List all listings (with filters)
POST   /api/listings          - Create new listing
GET    /api/listings/[id]     - Get listing details
PATCH  /api/listings/[id]     - Update listing
DELETE /api/listings/[id]     - Delete listing
GET    /api/my-listings       - Get user's listings
```

### Dorm Endpoints

```
GET    /api/dorms             - List all dorms (with filters)
POST   /api/dorms             - Create new dorm listing
GET    /api/dorms/[id]        - Get dorm details
PATCH  /api/dorms/[id]        - Update dorm
DELETE /api/dorms/[id]        - Delete dorm
GET    /api/my-dorms          - Get user's dorms
```

### Messaging Endpoints

```
GET    /api/conversations     - List user conversations
POST   /api/conversations     - Create conversation
GET    /api/messages          - List messages in conversation
POST   /api/messages          - Send new message
```

### Saved Listings Endpoints

```
GET    /api/saved-listings    - List saved items
POST   /api/saved-listings    - Save a listing
DELETE /api/saved-listings/[id] - Unsave a listing
```

### User Endpoints

```
GET    /api/profile           - Get user profile
PATCH  /api/profile           - Update profile
GET    /api/users/[id]        - Get user info
GET    /api/users             - List users (search/discovery)
```

### Notifications Endpoints

```
GET    /api/notifications     - List notifications
PATCH  /api/notifications/[id] - Mark as read
```

### Reporting Endpoints

```
POST   /api/reports           - Submit a report
GET    /api/reports           - List reports (admin)
PATCH  /api/reports/[id]      - Update report status (admin)
```

### Upload Endpoints

```
POST   /api/uploadthing       - Upload files via UploadThing
```

## Scripts

Available npm scripts:

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint checks
npm run lint:fix         # Fix ESLint issues automatically

# Database
npx prisma migrate dev  # Create and apply migrations
npx prisma studio      # Open Prisma Studio (database GUI)
npx prisma seed        # Seed database with initial data
```

## Future Improvements

### Planned Features

- **Real-time Messaging**: WebSocket integration for instant messaging updates
- **Email Notifications**: Email alerts for important events (new message, listing saved, etc.)
- **Analytics Dashboard**: Track listing views, messages, and engagement metrics
- **Advanced Admin Panel**: Full admin capabilities for managing users, listings, and reports
- **User Ratings & Reviews**: Rate buyers/sellers and leave reviews
- **User Blocking**: Block users to prevent unwanted contact
- **Two-Factor Authentication (2FA)**: Enhanced account security
- **Messaging Attachments**: Share images and files in conversations
- **Search Optimization**: Elasticsearch integration for advanced search
- **Payment Integration**: In-app payment processing for transactions

### Performance Optimizations

- Image optimization and lazy loading
- Implement Redis caching for frequently accessed data
- Database query optimization and indexing
- CDN integration for static assets
- API response caching strategies

### Security Enhancements

- Rate limiting on sensitive endpoints
- Email verification for new accounts
- Password reset functionality
- CSRF protection
- Input sanitization across all forms
- Audit logging for admin actions

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository** and create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** with clear, descriptive commits:
   ```bash
   git commit -m "Add: description of your changes"
   ```

3. **Follow code style:**
   - Use TypeScript for all new code
   - Follow existing naming conventions
   - Keep functions small and focused
   - Add comments for complex logic

4. **Test your changes:**
   - Verify the build succeeds: `npm run build`
   - Run linter: `npm run lint`
   - Test manually in development

5. **Push to your fork** and create a Pull Request:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Describe your changes** in the PR with:
   - What changed and why
   - How to test the changes
   - Any breaking changes

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the campus community**
