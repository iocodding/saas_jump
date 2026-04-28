<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: 'dashboard', title: 'Account settings' })
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <AccountProfileForm />
    <USeparator />
    <AccountPasswordForm />
    <USeparator />
    <AccountDangerZone />
  </div>
</template>
