<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <UPageHero
    :title="`Build your next SaaS with ${config.public.appName}`"
    description="A production-ready boilerplate built on Nuxt, Supabase, and Nuxt UI. Authentication, database, and a full dashboard — ready from day one."
    :links="[
      { label: 'Get started', to: '/auth/signup', trailingIcon: 'i-lucide-arrow-right', size: 'xl' },
      { label: 'Log in', to: '/auth/login', size: 'xl', color: 'neutral', variant: 'subtle' },
    ]"
  />
</template>
