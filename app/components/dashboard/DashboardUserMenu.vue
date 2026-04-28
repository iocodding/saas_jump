<script setup lang="ts">
const user = useSupabaseUser()
const { logout } = useAuth()

const items = computed(() => [[
  {
    label: user.value?.email ?? 'Account',
    slot: 'account',
    disabled: true,
  },
], [
  {
    label: 'Account settings',
    icon: 'i-lucide-settings',
    to: '/dashboard/account',
  },
], [
  {
    label: 'Sign out',
    icon: 'i-lucide-log-out',
    onSelect: logout,
  },
]])
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton color="neutral" variant="ghost" class="gap-2">
      <UAvatar :alt="user?.email ?? 'User'" size="xs" />
      <span class="hidden sm:block text-sm max-w-[160px] truncate">{{ user?.email }}</span>
      <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-muted" />
    </UButton>
  </UDropdownMenu>
</template>
