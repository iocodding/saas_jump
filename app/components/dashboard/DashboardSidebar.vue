<script setup lang="ts">
import type { NavItem } from '~/types'

const route = useRoute()

const navItems: NavItem[] = [
  { label: 'Projects', icon: 'i-lucide-folder', to: '/dashboard/projects' },
]
</script>

<template>
  <aside class="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4 space-y-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="route.path.startsWith(item.to)
          ? 'bg-primary/10 text-primary'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'"
      >
        <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
        {{ item.label }}
        <UBadge v-if="item.badge" :label="String(item.badge)" size="sm" class="ml-auto" />
      </NuxtLink>
    </nav>

    <!-- Account link at bottom -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-800">
      <NuxtLink
        to="/dashboard/account"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <UIcon name="i-lucide-settings" class="w-5 h-5 shrink-0" />
        Account
      </NuxtLink>
    </div>
  </aside>
</template>
