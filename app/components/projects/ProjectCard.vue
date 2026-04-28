<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{ open: [Project]; delete: [Project] }>()

const plainDescription = computed(() => {
  if (!props.project.description) return 'No description.'
  return props.project.description.replace(/<[^>]*>/g, '').trim() || 'No description.'
})

const items = computed(() => [[
  {
    label: 'Delete',
    icon: 'i-lucide-trash-2',
    color: 'error' as const,
    onSelect: () => emit('delete', props.project),
  },
]])
</script>

<template>
  <UCard
    class="h-full cursor-pointer transition-shadow hover:shadow-md"
    @click="emit('open', project)"
  >
    <template #header>
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold truncate hover:text-primary transition-colors">
          {{ project.title }}
        </h3>
        <UDropdownMenu :items="items" @click.stop>
          <UButton
            icon="i-lucide-ellipsis"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="More options"
            @click.stop
          />
        </UDropdownMenu>
      </div>
    </template>
    <p class="text-sm text-muted line-clamp-2 min-h-[2.5rem]">
      {{ plainDescription }}
    </p>
  </UCard>
</template>
