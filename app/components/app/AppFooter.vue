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
      <NuxtLink to="/docs/getting-started/introduction" class="text-sm text-muted hover:text-default transition-colors">
        Documentation
      </NuxtLink>
    </template>
  </UFooter>
</template>
