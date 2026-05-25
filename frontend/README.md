# CampusX

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern full-stack student marketplace and dorm discovery platform designed for university students. Connect with peers, discover accommodation options, buy and sell items, and explore campus community essentials—all in one place.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
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
