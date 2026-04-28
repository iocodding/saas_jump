<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} {{ config.public.appName }}. All rights reserved.
      </p>
    </template>
    <template #right>
      <div class="flex items-center gap-4 text-sm text-muted">
        <NuxtLink to="/privacy" class="hover:text-default transition-colors">Privacy</NuxtLink>
        <NuxtLink to="/terms" class="hover:text-default transition-colors">Terms</NuxtLink>
      </div>
    </template>
  </UFooter>
</template>
