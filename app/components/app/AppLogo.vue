<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <div class="flex items-center gap-2">
    <img src="/logo.svg" alt="SaaS Jump logo" width="20" height="21" aria-hidden="true" />
    <span class="text-sm font-bold text-primary">{{ config.public.appName }}</span>
  </div>
</template>
