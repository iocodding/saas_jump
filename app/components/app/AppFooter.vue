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
  </UFooter>
</template>
