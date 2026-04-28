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

const isEdit = computed(() => !!props.project)
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
          <RichTextEditor
            v-model="form.description"
            placeholder="What is this project about?"
          />
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
