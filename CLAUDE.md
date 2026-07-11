# PropertiPilihan — Indonesia Property Platform

## Project Overview
- **Type**: Next.js 15 full-stack application (public site + admin dashboard)
- **Purpose**: Sell/rent properties in Indonesia — public visitor page + internal CMS
- **Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui v4, Supabase, NextAuth.js
- **Repo**: `Therealratoshen/Homeless`

## Architecture
- **Public site**: `/` (home), `/properti` (list + filter), `/properti/[slug]` (detail)
- **Admin**: `/admin` (dashboard), `/admin/properti` (list), `/admin/properti/baru` (create), `/admin/properti/[id]/edit` (edit)
- **Auth**: NextAuth.js with credentials provider against `admin_users` Supabase table
- **Data**: Supabase (PostgreSQL + Auth + Storage)
- **Images**: Supabase Storage bucket `property-images`
- **Token model**: Single app, role-based admin (Architecture A from initial spec)

## Key Files
- `src/lib/supabase/client.ts` — browser Supabase client
- `src/lib/supabase/server.ts` — server Supabase client + admin client
- `src/lib/auth.ts` — NextAuth configuration
- `src/types/database.ts` — TypeScript types for Supabase tables
- `src/middleware.ts` — protects `/admin/*` routes
- `supabase/migrations/001_initial.sql` — DB schema (run in Supabase SQL Editor)
- `src/app/api/admin/seed/route.ts` — seeds admin + 6 sample properties

## Setup Steps (for deployment)
1. Create Supabase project → copy URL + keys → add to Vercel env vars
2. Run `supabase/migrations/001_initial.sql` in Supabase SQL Editor
3. Run seed: `curl -X POST 'https://your-domain.com/api/admin/seed?secret=seed-properti-2024'`
4. Deploy to Vercel with env vars

## Environment Variables (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

## Admin Login
- URL: `/admin/login`
- Default: `admin@propertipilihan.com` / `admin123` (seeded via `/api/admin/seed`)

## Note on TypeScript
Supabase v2 TypeScript generics don't fully work with the custom `Database` type in this project. Type casts (`as any`) are used in API routes and server components where needed. This is a known limitation — the app works correctly at runtime.

## Tech Notes
- Tailwind v4 is used (not v3) — CSS uses `@import "tailwindcss"` + `@theme` directive
- shadcn/ui v4 uses `@base-ui/react` instead of `@radix-ui/react` — uses `render` prop instead of `asChild`
- All images use `fill` + `sizes` for Next.js Image optimization
- ISR revalidation: home page 60s, listings 30s, detail 30s
