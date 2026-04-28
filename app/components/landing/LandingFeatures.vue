<template>
  <UPageSection
    id="features"
    title="Everything you need to ship"
    description="Start with a solid foundation so you can focus on what makes your product unique."
    :features="[
      {
        icon: 'i-lucide-shield-check',
        title: 'Authentication',
        description: 'Email/password auth with Supabase. Email confirmation, password reset, and account management all wired up.',
      },
      {
        icon: 'i-lucide-database',
        title: 'Database & RLS',
        description: 'Supabase Postgres with row-level security policies. Your users\' data stays isolated and secure by default.',
      },
      {
        icon: 'i-lucide-zap',
        title: 'Optimistic Updates',
        description: 'TanStack Query powers instant UI feedback with rollback on failure — no waiting for server round-trips.',
      },
      {
        icon: 'i-lucide-wifi',
        title: 'Realtime Sync',
        description: 'Supabase Realtime keeps all open tabs in sync. Change a record in one tab, see it instantly in another.',
      },
      {
        icon: 'i-lucide-layout-dashboard',
        title: 'Dashboard Shell',
        description: 'Sidebar navigation, top bar with user menu, and a responsive layout ready to drop your features into.',
      },
      {
        icon: 'i-lucide-rocket',
        title: 'Vercel-Ready',
        description: 'Deploy in minutes. Nitro Vercel preset configured out of the box, with edge-ready server routes.',
      },
    ]"
  />
</template>
