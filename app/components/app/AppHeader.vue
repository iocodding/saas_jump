<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex items-center">
        <AppLogo />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
      <template v-if="user">
        <UButton to="/dashboard/projects" size="sm">Dashboard</UButton>
      </template>
      <template v-else>
        <UButton to="/auth/login" color="neutral" variant="ghost" size="sm">Log in</UButton>
        <UButton to="/auth/signup" size="sm">Get started</UButton>
      </template>
    </template>
  </UHeader>
</template>
