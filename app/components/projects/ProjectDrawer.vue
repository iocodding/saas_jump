<script setup lang="ts">
import type { Project } from "~/types";

const props = defineProps<{ project: Project | null; loading?: boolean }>();
const open = defineModel<boolean>("open");
const emit = defineEmits<{
  submit: [{ title: string; description: string }];
}>();

const form = reactive({ title: "", description: "" });

const onOpenChange = (val: boolean) => {
  if (val) {
    form.title = props.project?.title ?? "";
    form.description = props.project?.description ?? "";
  }
  open.value = val;
};

const onSubmit = () => {
  emit("submit", { ...form });
};

const isEdit = computed(() => !!props.project);

const toolbarItems = [
  [
    { kind: "undo" as const, icon: "i-lucide-undo" },
    { kind: "redo" as const, icon: "i-lucide-redo" },
  ],
  [
    { kind: "heading" as const, level: 1 as const, icon: "i-lucide-heading-1" },
    { kind: "heading" as const, level: 2 as const, icon: "i-lucide-heading-2" },
    { kind: "heading" as const, level: 3 as const, icon: "i-lucide-heading-3" },
  ],
  [
    { kind: "mark" as const, mark: "bold" as const, icon: "i-lucide-bold" },
    { kind: "mark" as const, mark: "italic" as const, icon: "i-lucide-italic" },
    { kind: "mark" as const, mark: "underline" as const, icon: "i-lucide-underline" },
    { kind: "mark" as const, mark: "strike" as const, icon: "i-lucide-strikethrough" },
    { kind: "mark" as const, mark: "code" as const, icon: "i-lucide-code" },
  ],
  [
    { kind: "bulletList" as const, icon: "i-lucide-list" },
    { kind: "orderedList" as const, icon: "i-lucide-list-ordered" },
    { kind: "blockquote" as const, icon: "i-lucide-quote" },
  ],
  [
    { kind: "link" as const, icon: "i-lucide-link" },
  ],
];
</script>

<template>
  <USlideover
    :open="open"
    :title="isEdit ? 'Edit project' : 'New project'"
    :description="
      isEdit
        ? 'Update the project details.'
        : 'Add a new project to your workspace.'
    "
    :ui="{ content: 'max-w-2xl' }"
    @update:open="onOpenChange"
  >
    <template #body>
      <div class="space-y-4">
        <UFormField label="Title" required class="w-full">
          <UInput
            v-model="form.title"
            placeholder="My awesome project"
            autofocus
            size="lg"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Description" class="w-full">
          <div class="w-full border border-(--ui-border) rounded-lg overflow-hidden">
            <UEditor
              v-model="form.description"
              content-type="html"
              placeholder="What is this project about?"
              class="w-full min-h-48 [&_.tiptap]:px-3 [&_.tiptap]:py-2 [&_.tiptap]:outline-none [&_.tiptap_p]:my-0 [&_.tiptap_p]:leading-6"
            >
              <template #default="{ editor }">
                <UEditorToolbar :editor="editor" :items="toolbarItems" />
              </template>
            </UEditor>
          </div>
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton color="neutral" variant="ghost" @click="open = false">Cancel</UButton>
        <UButton
          :disabled="!form.title.trim()"
          :loading="loading"
          @click="onSubmit"
        >
          {{ isEdit ? "Save changes" : "Create project" }}
        </UButton>
      </div>
    </template>
  </USlideover>
</template>
