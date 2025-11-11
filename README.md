# Linkflow

A modern, TypeScript-first Next.js (App Router) template for a link-in-bio product with Prisma (Postgres), Firebase Authentication, Stripe, TailwindCSS, and basic link click analytics.

## Tech Stack
- Next.js App Router, TypeScript
- TailwindCSS
- Prisma ORM (Postgres)
- Firebase Authentication
- Stripe SDK
- Framer Motion, react-icons
- zod, clsx

## Prerequisites
- Node.js 18+
- Postgres database
- Firebase project (for authentication)
- Stripe account (secret key + optional webhook secret)

## Getting Started

### 1) Install dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2) Environment variables
Create `.env.local` and fill in values:

```
DATABASE_URL="postgresql://user:password@localhost:5432/linkflow"
```

Firebase Configuration (get from [Firebase Console](https://console.firebase.google.com/)):
- Go to Project Settings > General > Your apps > Web app config
- Copy the config values

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

Firebase Admin SDK (for server-side auth):
- Go to Project Settings > Service Accounts > Generate new private key
- Copy the entire JSON and stringify it (or use individual fields)

```
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"..."}'
```

### 3) Prisma setup and database migration
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4) Run the dev server
```bash
npm run dev
```

Open `http://localhost:3000`.

## Project Scripts
- `dev` - Start Next.js dev server
- `build` - Build for production
- `start` - Start production server
- `prisma:generate` - Generate Prisma Client
- `prisma:migrate` - Run `prisma migrate dev`
- `prisma:studio` - Open Prisma Studio

## Routes
- `/` - Marketing landing page
- `/dashboard` - Protected page (requires Firebase authentication)
- `/login` - Email/password and Google OAuth login
- `/[username]` - Public profile page
- `/api/links` - GET (list, public), POST (create, requires auth)
- `/api/links/[id]` - PATCH (update, requires auth), DELETE (delete, requires auth)
- `/api/links/[id]/click` - Records click and redirects to target URL
- `/api/auth/session` - Manages authentication session cookies

## Notes
- Auth: Uses Firebase Authentication with email/password and Google OAuth. Auth tokens are stored in HTTP-only cookies for server-side verification.
- Analytics: Clicks are stored in `ClickAnalytics`. Enhance with geo/IP parsing if desired.

## License
MIT
