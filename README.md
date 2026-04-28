# SaaS Jump

A production-ready Nuxt 4 boilerplate for launching SaaS products fast. Includes authentication, a dashboard shell, user account management, and a full Projects CRUD feature that demonstrates the core data patterns you'll use in every feature you build.

Clone it, wire up your Supabase project, and ship.

---

## What's included

### Auth
- Email + password signup and login
- Email confirmation flow (PKCE)
- Forgot password / reset password via email link
- Route middleware: protected routes redirect to login, logged-in users redirect away from auth pages
- Auto-created user profile on signup via Supabase DB trigger

### Dashboard
- Sidebar navigation with active state
- Top bar showing current page title and user email
- User dropdown menu with sign-out
- Light/dark mode toggle

### Account settings
- Update display name and avatar URL
- Change password
- Delete account (via service-role server API route)

### Projects (example CRUD feature)
- Create, edit, and delete projects
- Rich text description editor (TipTap via Nuxt UI)
- Optimistic UI updates — changes appear instantly before the server responds
- Realtime sync — changes in one browser tab appear in all other open tabs automatically
- Confirmation dialog before delete

### Landing page
- Hero, features, and pricing sections
- Prerendered at build time for fast load

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Nuxt 4 |
| UI components | Nuxt UI v4 (Radix Vue + Tailwind v4) |
| Rich text editor | TipTap (via `UEditor` / `UEditorToolbar`) |
| Database / Auth | Supabase (`@nuxtjs/supabase`) |
| Server data fetching | TanStack Query v5 |
| UI state | Nuxt `useState` (no Pinia) |
| TypeScript | Strict mode |
| Deploy | Vercel |

---

## Project structure

```
app/
├── components/
│   ├── app/          # AppLogo, AppHeader, AppFooter
│   ├── landing/      # LandingHero, LandingFeatures, LandingPricing
│   ├── dashboard/    # DashboardSidebar, DashboardTopNav, DashboardUserMenu
│   ├── projects/     # ProjectCard, ProjectDrawer, ProjectDeleteDialog
│   ├── account/      # AccountProfileForm, AccountPasswordForm, AccountDangerZone
│   └── ui/           # AlertBanner, ConfirmModal
├── composables/
│   ├── useAuth.ts              # signup, login, logout, password reset
│   ├── useProfile.ts           # profile read/update via TanStack Query
│   ├── useProjectsLoader.ts    # list query + Realtime subscription
│   ├── useProjectActions.ts    # create/update/delete mutations with optimistic updates
│   └── useAppToast.ts          # success/error/info toast helpers
├── layouts/
│   ├── default.vue    # Landing layout
│   ├── auth.vue       # Centered card layout
│   └── dashboard.vue  # Sidebar + top nav layout
├── middleware/
│   ├── auth.ts        # Redirect unauthenticated → /auth/login
│   └── guest.ts       # Redirect authenticated → /dashboard
└── pages/
    ├── index.vue
    ├── auth/          # login, signup, confirm, forgot-password, reset-password
    └── dashboard/
        ├── account.vue
        └── projects/
            └── index.vue

server/api/
├── profile/           # GET and PATCH profile
└── account/           # DELETE account (service role)

supabase/
└── migrations/
    └── 20240101000000_init.sql   # profiles + projects tables, RLS, triggers
```

---

## Getting started

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a new project, and copy your project URL and anon key.

### 2. Run the database migration

In the Supabase SQL editor, paste and run the contents of `supabase/migrations/20240101000000_init.sql`.

This creates:
- `profiles` table (auto-populated on signup)
- `projects` table with RLS and Realtime enabled
- All row-level security policies
- `updated_at` and `created_at` protection triggers

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configure Supabase Auth redirect URLs

In Supabase → Auth → URL Configuration:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: add `http://localhost:3000/auth/confirm` and `http://localhost:3000/auth/reset-password`

### 5. Install and run

```bash
pnpm install
pnpm dev
```

---

## Deploying to Vercel

1. Push to GitHub and import the repo in Vercel
2. Set these environment variables in the Vercel dashboard:
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `NUXT_PUBLIC_APP_URL` (your production URL)
3. Add your production domain to Supabase Auth redirect URLs

---

## Customising

- **App name**: change `appName` in `nuxt.config.ts` → `runtimeConfig.public`
- **Logo**: replace `public/logo.svg`
- **Colors / theme**: edit `assets/css/main.css`
- **Nav items**: edit the `navItems` array in `app/components/dashboard/DashboardSidebar.vue`
- **Adding a new feature**: follow the Projects pattern — composable for data fetching + mutations, page for layout, components for UI
