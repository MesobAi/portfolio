# Nebiyou Daniel — Portfolio

Personal portfolio for **Nebiyou Daniel**, Backend Engineer & AI Developer.
Tagline: *Learn More. Build Better.*

Dark, shader-style landing page with an admin dashboard, all backed by **Neon Postgres + Drizzle ORM**.

## Stack

- **Next.js (App Router) + TypeScript** — server components for public pages
- **Tailwind CSS v4 + shadcn/ui** — UI primitives
- **Framer Motion** — scroll animations
- **Drizzle ORM + Neon** (`@neondatabase/serverless`) — the only database
- **Better Auth** — single-admin dashboard protection
- **zod + react-hook-form** — admin form validation
- **UploadThing** (`@uploadthing/react` + `/api/uploadthing`) — image uploads for projects / research / build log (multiple pictures)

## Pages

| Route | Description |
|---|---|
| `/` | Hero, About, Tech Stack, Experience, Projects, Research, Startup, Build Log preview, Education, Contact |
| `/build-log` | Full build log feed |
| `/admin` | Protected dashboard (projects, research, build log, experience CRUD + inbox) |
| `/admin/login` | Admin sign-in |

## Setup (local)

```bash
npm install

# 1. Create a free database at https://neon.tech and copy the pooled connection string
cp .env.example .env.local
# then fill in:
#   DATABASE_URL=postgresql://…@ep-…neon.tech/neondb?sslmode=require
#   BETTER_AUTH_SECRET=<long random string, e.g. openssl rand -base64 32>
#   BETTER_AUTH_URL=http://localhost:3000
#   ADMIN_EMAIL=mesobaiprojects@gmail.com
#   ADMIN_PASSWORD=<your password>
#   NEXT_PUBLIC_SITE_URL=http://localhost:3000
#   UPLOADTHING_SECRET=<your uploadthing secret>

# 2. Create the tables
npm run db:push

# 3. Seed the real content (idempotent — safe to re-run)
npm run db:seed

# 4. Run it
npm run dev        # http://localhost:3000
```

Sign in at **http://localhost:3000/admin/login** with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
The admin account is provisioned automatically from those env vars on first visit to the login page.

## Security model

- `ADMIN_EMAIL` / `ADMIN_PASSWORD` never enter the codebase — they're env vars only.
- Sign-up via the auth API is rejected for any email other than `ADMIN_EMAIL`.
- `/admin/*` is double-guarded: a soft cookie check in `middleware.ts` and an authoritative
  server-side session check in `src/app/admin/(dashboard)/layout.tsx`.
- Every admin server action re-validates the session against `ADMIN_EMAIL` before touching the DB.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import the repo (framework is auto-detected).
3. Add the environment variables on Vercel:
   - `DATABASE_URL` — Neon connection string (use the **pooled** string)
   - `BETTER_AUTH_SECRET` — a long random string (`openssl rand -base64 32`)
   - `BETTER_AUTH_URL` — your production URL, e.g. `https://your-domain.vercel.app`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` — your admin credentials
   - `NEXT_PUBLIC_SITE_URL` — e.g. `https://your-domain.vercel.app`
   - `UPLOADTHING_SECRET` — your UploadThing secret (`https://uploadthing.com`)
4. Deploy, then run the schema+seed against production once:
   ```bash
   DATABASE_URL="<neon-prod-url>" npm run db:push
   DATABASE_URL="<neon-prod-url>" npm run db:seed
   ```

## Notes

- **Media uploads**: projects, research and build log entries support a **gallery of multiple images**
  (no video) uploaded through UploadThing and rendered under the description / content. Manage them from
  the admin dashboard (`/admin`) — add / remove pictures per entry.
- **Placeholders to fill in**: Telegram handle (`src/components/landing/social-links.tsx`),
  real GitHub/live URLs (`src/db/seed.ts`), and your real admin password / secrets.
- Database contents drive every public section; empty sections gracefully show empty states.
