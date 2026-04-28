<script setup lang="ts">
defineProps<{
  placeholder?: string
}>()

const model = defineModel<string>({ default: '' })

const wrapper = ref<HTMLElement | null>(null)
const focusEditor = () => {
  wrapper.value?.querySelector<HTMLElement>('.tiptap')?.focus()
}

const toolbarItems = [
  [
    { kind: 'undo' as const, icon: 'i-lucide-undo' },
    { kind: 'redo' as const, icon: 'i-lucide-redo' },
  ],
  [
    { kind: 'heading' as const, level: 1 as const, icon: 'i-lucide-heading-1' },
    { kind: 'heading' as const, level: 2 as const, icon: 'i-lucide-heading-2' },
    { kind: 'heading' as const, level: 3 as const, icon: 'i-lucide-heading-3' },
  ],
  [
    { kind: 'mark' as const, mark: 'bold' as const, icon: 'i-lucide-bold' },
    { kind: 'mark' as const, mark: 'italic' as const, icon: 'i-lucide-italic' },
    { kind: 'mark' as const, mark: 'underline' as const, icon: 'i-lucide-underline' },
    { kind: 'mark' as const, mark: 'strike' as const, icon: 'i-lucide-strikethrough' },
    { kind: 'mark' as const, mark: 'code' as const, icon: 'i-lucide-code' },
  ],
  [
    { kind: 'bulletList' as const, icon: 'i-lucide-list' },
    { kind: 'orderedList' as const, icon: 'i-lucide-list-ordered' },
    { kind: 'blockquote' as const, icon: 'i-lucide-quote' },
  ],
  [
    { kind: 'link' as const, icon: 'i-lucide-link' },
  ],
]
</script>

<template>
  <div
    ref="wrapper"
    class="w-full border border-(--ui-border) rounded-lg overflow-hidden cursor-text"
    @click="focusEditor"
  >
    <UEditor
      v-model="model"
      content-type="html"
      :placeholder="placeholder"
      class="w-full min-h-48 [&_.tiptap]:px-3 [&_.tiptap]:py-2 [&_.tiptap]:min-h-36 [&_.tiptap]:outline-none [&_.tiptap_p]:my-0 [&_.tiptap_p]:leading-6"
    >
      <template #default="{ editor }">
        <UEditorToolbar :editor="editor" :items="toolbarItems" />
      </template>
    </UEditor>
  </div>
</template>
