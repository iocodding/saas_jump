<script setup lang="ts">
const route = useRoute()
const pageTitle = computed(() => (route.meta.title as string) ?? '')
</script>

<template>
  <header class="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shrink-0">
    <h1 class="text-lg font-semibold">{{ pageTitle }}</h1>
    <div class="flex items-center gap-3">
      <UColorModeButton />
      <DashboardUserMenu />
    </div>
  </header>
</template>
