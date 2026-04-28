<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: 'dashboard' })

// Dashboard root redirects to projects
await navigateTo('/dashboard/projects', { replace: true })
</script>

<template>
  <div />
</template>
