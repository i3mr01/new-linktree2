# Linkflow

A modern, TypeScript-first Next.js (App Router) template for a link-in-bio product with Prisma (Postgres), Supabase Auth, Stripe, TailwindCSS, and basic link click analytics.

## Tech Stack
- Next.js App Router, TypeScript
- TailwindCSS
- Prisma ORM (Postgres)
- Supabase (Auth + client)
- Stripe SDK
- Framer Motion, react-icons
- zod, clsx

## Prerequisites
- Node.js 18+
- Postgres database
- Supabase project (URL + keys)
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
Create `.env.local` and fill in values as per `.env.example`.

DATABASE_URL="postgresql://postgres.hkugpeethudjasncoplt:sdEXVWUxvj0GDp1n@aws-1-eu-north-1.pooler.supabase.com:6543/postgres"


Supabase keys (do not expose service role to the browser):
```
NEXT_PUBLIC_SUPABASE_URL=...            # public, used by browser client
NEXT_PUBLIC_SUPABASE_ANON_KEY=...       # public anon key, browser client
SUPABASE_SERVICE_ROLE_KEY=...           # server-only, SSR server client
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
- `/dashboard` - Protected page (requires Supabase auth)
- `/login` - Email magic link + optional OAuth login
- `/[username]` - Public profile page
- `/api/links` - GET (list), POST (create)
- `/api/links/[id]` - PATCH (update), DELETE (delete)
- `/api/links/[id]/click` - Records click and redirects to target URL

## Notes
- Auth: This template expects Supabase auth cookies to be available to server components/route handlers. Wire up your auth UI next.
- Analytics: Clicks are stored in `ClickAnalytics`. Enhance with geo/IP parsing if desired.

## License
MIT
