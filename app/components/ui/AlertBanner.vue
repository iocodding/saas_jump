<script setup lang="ts">
defineProps<{
  type?: 'success' | 'error' | 'info' | 'warning'
  message: string
}>()

const iconMap = {
  success: 'i-lucide-check-circle',
  error: 'i-lucide-x-circle',
  info: 'i-lucide-info',
  warning: 'i-lucide-triangle-alert',
}
</script>

<template>
  <UAlert
    :color="type ?? 'info'"
    :icon="iconMap[type ?? 'info']"
    :description="message"
  />
</template>
