<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:open': [boolean]
  confirm: []
  cancel: []
}>()
</script>

<template>
  <UModal
    :open="open"
    :title="title"
    :description="description"
    @update:open="emit('update:open', $event)"
  >
    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton color="neutral" variant="ghost" :disabled="loading" @click="emit('cancel')">
          Cancel
        </UButton>
        <UButton color="error" :loading="loading" @click="emit('confirm')">
          {{ confirmLabel ?? 'Confirm' }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
