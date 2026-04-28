<script setup lang="ts">
import type { Project } from '~/types'

defineProps<{
  project: Project | null
  loading?: boolean
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const open = defineModel<boolean>('open')
</script>

<template>
  <ConfirmModal
    :open="!!open"
    title="Delete project"
    :description="`Are you sure you want to delete &quot;${project?.title}&quot;? This cannot be undone.`"
    confirm-label="Delete project"
    :loading="loading"
    @update:open="open = $event"
    @confirm="emit('confirm')"
    @cancel="emit('cancel')"
  />
</template>
