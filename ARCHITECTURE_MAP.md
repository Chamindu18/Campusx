# CampusX - Architecture Dependency Graph

## Data Models & Relationships

```
USER (core identity)
├── id: String (CUID)
├── name: String
├── email: String @unique
├── password: String (bcrypt)
├── role: Role enum (USER | ADMIN)
├── university: String?
├── bio: String?
├── avatar: String?
├── createdAt: DateTime
├── updatedAt: DateTime
└── relations:
    ├── listings: Listing[] (1→N, onDelete: Cascade)
    ├── dorms: Dorm[] (1→N, onDelete: Cascade)
    ├── messages: Message[] (1→N, onDelete: Cascade)
    ├── savedListings: SavedListing[] (1→N, onDelete: Cascade)
    ├── notifications: Notification[] (1→N, onDelete: Cascade)
    ├── reports: Report[] (1→N, onDelete: Cascade)
    └── conversations: ConversationParticipant[] (1→N, onDelete: Cascade)

LISTING (marketplace item)
├── id: String (CUID)
├── title: String
├── description: String
├── category: String
├── price: Float
├── condition: String ✅ (REQUIRED - was missing)
├── location: String ✅ (REQUIRED - was missing)
├── imageUrls: String[]
├── createdAt: DateTime
├── updatedAt: DateTime
├── userId: String (foreign key)
└── relations:
    ├── user: User (N→1)
    ├── savedBy: SavedListing[] (1→N)
    └── reports: Report[] (1→N)

DORM (accommodation)
├── id: String (CUID)
├── title: String
├── description: String
├── university: String
├── city: String
├── gender: String (Boys | Girls | Mixed)
├── roomType: String (Private | Shared)
├── price: Float
├── facilities: String[]
├── imageUrls: String[]
├── contactNumber: String
├── distanceFromUniversity: String
├── createdAt: DateTime
├── updatedAt: DateTime
├── userId: String (foreign key)
└── relations:
    └── user: User (N→1)

CONVERSATION (group chat)
├── id: String (CUID)
├── title: String?
├── isPrivate: Boolean @default(true)
├── createdAt: DateTime
├── updatedAt: DateTime
└── relations:
    ├── messages: Message[] (1→N)
    └── participants: ConversationParticipant[] (1→N)

CONVERSATION_PARTICIPANT (membership)
├── id: String (CUID)
├── userId: String (foreign key)
├── conversationId: String (foreign key)
├── createdAt: DateTime
├── unique: [userId, conversationId]
└── relations:
    ├── user: User (N→1)
    └── conversation: Conversation (N→1)

MESSAGE (chat message)
├── id: String (CUID)
├── content: String
├── createdAt: DateTime
├── userId: String (foreign key)
├── conversationId: String (foreign key)
└── relations:
    ├── user: User (N→1)
    └── conversation: Conversation (N→1)

SAVED_LISTING (user's saved items)
├── id: String (CUID)
├── userId: String (foreign key)
├── listingId: String (foreign key)
├── unique: [userId, listingId]
└── relations:
    ├── user: User (N→1)
    └── listing: Listing (N→1)

NOTIFICATION (user notification)
├── id: String (CUID)
├── title: String
├── message: String
├── isRead: Boolean @default(false)
├── link: String?
├── createdAt: DateTime
├── userId: String (foreign key)
└── relations:
    └── user: User (N→1)

REPORT (content report)
├── id: String (CUID)
├── reason: String
├── description: String?
├── status: ReportStatus enum (PENDING | RESOLVED | REMOVED)
├── createdAt: DateTime
├── reporterId: String (foreign key)
├── listingId: String (foreign key)
└── relations:
    ├── reporter: User (N→1)
    └── listing: Listing (N→1)
```

---

## Feature-to-File Mapping

### Authentication Feature
```
signup flow:
  PAGE: src/app/(auth)/signup/page.tsx
  LAYOUT: src/app/(auth)/layout.tsx
  COMPONENT: (uses react-hook-form + listingSchema)
  API: src/app/api/auth/signup/route.ts
    ├── Validates with signupSchema
    ├── Hashes password with bcrypt
    ├── Creates User in DB
    ├── Generates JWT token
    └── Sets HttpOnly cookie
  VALIDATION: src/lib/validations/auth.ts (signupSchema)
  UTILITY: src/lib/auth.ts (createToken, setAuthCookie)

login flow:
  PAGE: src/app/(auth)/login/page.tsx
  LAYOUT: src/app/(auth)/layout.tsx
  COMPONENT: (uses react-hook-form)
  API: src/app/api/auth/login/route.ts
    ├── Validates with loginSchema
    ├── Finds user by email
    ├── Compares password with bcrypt
    ├── Generates JWT token
    └── Sets HttpOnly cookie
  VALIDATION: src/lib/validations/auth.ts (loginSchema)

logout flow:
  API: src/app/api/auth/logout/route.ts
    └── Clears auth cookie

middleware protection:
  FILE: src/middleware.ts
    ├── Verifies JWT in edge runtime
    ├── Protects routes: /dashboard, /marketplace, /admin, etc.
    ├── Uses verifyEdgeToken() from auth-edge.ts
    └── Redirects to /login if no token

current user retrieval:
  API: src/app/api/current-user/route.ts
    ├── Calls getCurrentUser() from lib/current-user.ts
    ├── Verifies JWT cookie
    └── Returns user object
  UTILITY: src/lib/current-user.ts
    ├── Reads JWT from cookies
    ├── Verifies with verifyToken()
    └── Fetches full user from DB
  HOOK: src/hooks/use-current-user.ts
    ├── Calls GET /api/current-user
    └── Caches with SWR
```

### Marketplace Feature
```
browse listings:
  PAGE: src/app/(platform)/marketplace/page.tsx
  COMPONENT: MarketplaceCard, MarketplaceCardSkeleton
  HOOK: useListings() from src/hooks/use-listings.ts
    └── GET /api/listings?search=X&category=Y&page=Z
  API: src/app/api/listings/route.ts
    ├── Filters by search, category
    ├── Paginates results
    └── Returns with user info
  VALIDATION: Category filtering with MARKETPLACE_CATEGORIES

view single listing:
  PAGE: src/app/(platform)/marketplace/[id]/page.tsx
  API: src/app/api/listings/[id]/route.ts
    ├── GET: Fetch single listing
    └── Delete: Only owner or admin

create listing:
  PAGE: src/app/(platform)/create-listing/page.tsx
  COMPONENT: ImageUpload, Input, Label, FormError
  FORM: react-hook-form + zod resolver
  VALIDATION: src/lib/validations/listing.ts (listingSchema)
    ├── title (3-120 chars)
    ├── category (required)
    ├── price (positive, max 1M)
    ├── description (20+ chars)
    ├── condition ✅ (REQUIRED - must add)
    ├── location ✅ (REQUIRED - must add)
    └── imageUrls (max 10, valid URLs)
  API: src/app/api/listings/route.ts POST
    ├── ❌ CURRENTLY MISSING condition, location fields
    ├── Validates with listingSchema
    ├── Creates Listing in DB
    └── Returns created listing
  UPLOAD: Uses UploadThing for images
    └── src/app/api/uploadthing/[...slug]/route.ts

edit listing:
  PAGE: src/app/(platform)/marketplace/edit/[id]/page.tsx
  ❌ FILE MISSING - NOT IMPLEMENTED
  API: src/app/api/listings/[id]/route.ts PATCH
    ├── Checks ownership or admin
    └── Updates listing

save listing:
  API: src/app/api/saved-listings/route.ts (implied)
  HOOK: useSavedListings() from src/hooks/use-saved-listings.ts
    └── GET /api/saved-listings
  PAGE: src/app/(platform)/saved/page.tsx
    └── Shows user's saved items
```

### Dorm Management Feature
```
browse dorms:
  PAGE: src/app/(platform)/dorms/page.tsx
  COMPONENT: DormCard, DormCardSkeleton
  HOOK: Fetches dorms with filters
    └── GET /api/dorms?university=X&city=Y&gender=Z&roomType=W
  API: src/app/api/dorms/route.ts
    ├── Filters by university, city, gender, roomType
    └── Returns paginated dorms
  CONSTANTS: Universities defined in create-dorm page

view single dorm:
  PAGE: src/app/(platform)/dorms/[id]/page.tsx
  API: src/app/api/dorms/[id]/route.ts
    ├── GET: Fetch single dorm with owner info
    └── Delete: Only owner or admin

create dorm:
  PAGE: src/app/(platform)/create-dorm/page.tsx
  FORM: react-hook-form + zod
  VALIDATION: src/lib/validations/dorm.ts (dormSchema)
    ├── title (5+ chars)
    ├── description (20+ chars)
    ├── university, city (required)
    ├── gender, roomType (required)
    ├── price (positive)
    ├── facilities (checkbox array)
    ├── imageUrls (max 10)
    ├── contactNumber (10+ digits)
    └── distanceFromUniversity (required)
  API: src/app/api/dorms/route.ts POST
    ├── Validates with dormSchema
    ├── Creates Dorm in DB
    └── Returns created dorm
  UPLOAD: UploadThing for images

edit dorm:
  PAGE: src/app/(platform)/dorms/edit/[id]/page.tsx
  ❌ FILE MISSING - NOT IMPLEMENTED
  API: src/app/api/dorms/[id]/route.ts PATCH
    ├── Checks ownership or admin
    └── Updates dorm
```

### Messaging Feature
```
conversations:
  PAGE: src/app/(platform)/messages/page.tsx
  HOOK: useMessages() from src/hooks/use-messages.ts
    └── GET /api/messages?conversationId=X
  API: src/app/api/messages/route.ts
    ├── GET: Fetch messages for conversation
    └── POST: Send new message
  COMPONENT: ChatBubble, MessageSkeleton

conversations list:
  API: src/app/api/conversations/route.ts
    └── List user's conversations
```

### Admin Feature
```
dashboard:
  PAGE: src/app/(platform)/admin/page.tsx
  COMPONENT: AdminGuard (checks /api/me ❌ WRONG - should be /api/current-user)
  API: src/app/api/admin/stats/route.ts
    ├── Counts users, listings, dorms, reports
    └── Returns aggregated stats

reports management:
  Dashboard shows reports
  API: src/app/api/reports/route.ts
    └── POST: Create report for listing

user management:
  PAGE: src/app/(platform)/admin/users/page.tsx
  API: ❌ /api/users route handler missing
    └── Should list all users

listing moderation:
  PAGE: src/app/(platform)/admin/listings/page.tsx
  API: src/app/api/admin/listings/route.ts
    ├── GET: All listings
    └── PATCH: Modify listing

dorm moderation:
  PAGE: src/app/(platform)/admin/dorms/page.tsx
  API: src/app/api/admin/dorms/route.ts
    ├── GET: All dorms
    └── PATCH: Modify dorm

analytics:
  PAGE: src/app/(platform)/admin/analytics/page.tsx
  API: ❌ No analytics API
    └── Should provide detailed metrics

logs:
  PAGE: src/app/(platform)/admin/logs/page.tsx
  API: ❌ No logs API
    └── Should provide system logs

system:
  PAGE: src/app/(platform)/admin/system/page.tsx
  API: ❌ No system API
    └── Should provide system health
```

### User Profile Feature
```
view profile:
  PAGE: src/app/(platform)/profile/page.tsx
  API: src/app/api/profile/route.ts GET
    └── Returns current user's profile

edit profile:
  FORM: In profile page
  API: src/app/api/profile/route.ts PATCH
    ├── Validates partial update
    ├── Updates: name, university, bio
    └── Returns updated profile

public user view:
  PAGE: src/app/(platform)/users/[id]/page.tsx
  API: src/app/api/users/[id]/route.ts
    ├── Gets public user info
    ├── Shows user's listings (6 most recent)
    └── Shows user's dorms (6 most recent)
```

### Notifications Feature
```
get notifications:
  HOOK: useNotifications() (implied)
  API: src/app/api/notifications/route.ts GET
    └── Returns user's notifications

mark as read:
  API: src/app/api/notifications/[id]/route.ts PATCH
    └── Sets isRead: true

mark all as read:
  API: src/app/api/notifications/read-all/route.ts POST
    └── Marks all user notifications as read

notification bell:
  COMPONENT: src/components/ui/NotificationBell.tsx
    └── Shows unread count
```

---

## File Import Dependency Chain (Key Paths)

```
Entry Point:
  src/app/layout.tsx (root)
    ├── src/app/globals.css
    ├── react-hot-toast (Toaster)
    └── src/app/(auth)/layout.tsx
        ├── src/components/layout/AuthLayoutShell.tsx
        ├── src/lib/current-user.ts
        └── src/lib/auth.ts (getLandingPathForRole)
    └── src/app/(platform)/layout.tsx
        ├── src/components/layout/Sidebar.tsx
        ├── src/components/layout/Topbar.tsx
        ├── src/components/ui/AnimatedBackground.tsx
        └── usePathname() from next/navigation

Auth Flow:
  src/middleware.ts
    ├── src/lib/auth-shared.ts
    ├── src/lib/auth-edge.ts
    └── Protects: /dashboard, /admin, /marketplace, etc.

API Flows:
  src/app/api/auth/signup/route.ts
    ├── src/lib/prisma.ts (PrismaClient)
    ├── src/lib/auth.ts (createToken, setAuthCookie)
    ├── src/lib/validations/auth.ts (signupSchema)
    └── bcryptjs

  src/app/api/listings/route.ts
    ├── src/lib/prisma.ts
    ├── src/lib/current-user.ts (getCurrentUser)
    ├── src/lib/validations/listing.ts ✅ (MUST ADD condition, location)
    └── Returns paginated listings

Component Chains:
  Marketplace Page
    ├── src/hooks/use-listings.ts
    │   └── GET /api/listings
    ├── src/components/ui/MarketplaceCard.tsx
    │   ├── src/components/ui/Card.tsx
    │   └── lucide-react icons
    └── src/constants/listing-categories.ts
```

---

## Middleware & Edge Runtime

```
Request Flow with Middleware:
  1. Browser sends request to /dashboard
  2. middleware.ts intercepts in Edge runtime
  3. Reads AUTH_COOKIE_NAME ("campusx_token")
  4. Calls verifyEdgeToken() from auth-edge.ts
     ├── Decodes JWT header, payload
     ├── Verifies HMAC signature with crypto.subtle
     ├── Checks expiration
     └── Returns TokenPayload or null
  5. If no token or invalid:
     ├── Redirects to /login?next=/dashboard
  6. If token valid:
     ├── Next.js continues request
  7. Page loads and may call getCurrentUser() again
     ├── This time in Node.js runtime
     ├── Uses server-side verifyToken() with jsonwebtoken library
```

---

## Security Boundaries

```
PUBLIC ROUTES:
  / (homepage)
  /login
  /signup

PROTECTED ROUTES (require auth):
  /dashboard
  /marketplace
  /dorms
  /create-listing
  /create-dorm
  /messages
  /profile
  /notifications
  /saved
  /settings
  /users/*

ADMIN-ONLY ROUTES:
  /admin
  /admin/users
  /admin/listings
  /admin/dorms
  /admin/analytics
  /admin/logs
  /admin/system
  /admin/settings
```

---

## Known Missing Implementations

```
❌ CRITICAL:
  - Listing validation missing condition, location fields
  - AdminGuard calls /api/me (doesn't exist)
  - Dashboard references user.fullName (doesn't exist)

❌ HIGH PRIORITY:
  - /marketplace/edit/[id] page not implemented
  - /dorms/edit/[id] page not implemented
  - /auctions route referenced but not created
  - /api/users handler missing
  - /api/me endpoint missing

⚠️ MEDIUM PRIORITY:
  - Email verification flow not implemented
  - Password reset not implemented
  - Rate limiting not implemented
  - Audit logging not implemented
  - Report resolution API missing
  - Analytics API missing
  - Logs API missing
  - System info API missing

🧪 TESTING:
  - No unit tests
  - No integration tests
  - No E2E tests
```

---

## Environment Variables Required

```
DATABASE_URL=postgresql://user:pass@host:port/campusx
JWT_SECRET=<strong-random-string>
NEXT_PUBLIC_UPLOADTHING_APP_ID=<from-uploadthing>
UPLOADTHING_SECRET=<from-uploadthing>
NEXT_PUBLIC_APP_URL=<deployment-url>
```

---

Generated: May 27, 2026
