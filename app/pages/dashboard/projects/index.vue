<script setup lang="ts">
import type { Project } from "~/types";

definePageMeta({ middleware: "auth", layout: "dashboard", title: "Projects" });

const { data: projects, loading } = useProjectsLoader();
const { create, update, remove, creating, updating, deleting } =
  useProjectActions();

const drawerOpen = useState("project-drawer-open", () => false);
const editingProject = useState<Project | null>("editing-project", () => null);
const deleteTarget = useState<Project | null>("delete-target", () => null);
const deleteDialogOpen = useState("delete-dialog-open", () => false);

const openCreateDrawer = () => {
  editingProject.value = null;
  drawerOpen.value = true;
};

const openEditDrawer = (project: Project) => {
  editingProject.value = project;
  drawerOpen.value = true;
};

const openDeleteDialog = (project: Project) => {
  deleteTarget.value = project;
  deleteDialogOpen.value = true;
};

const handleDrawerSubmit = async (payload: {
  title: string;
  description: string;
}) => {
  if (editingProject.value) {
    await update(editingProject.value.id, payload);
  } else {
    await create(payload);
  }
  drawerOpen.value = false;
};

const handleDelete = async () => {
  if (!deleteTarget.value) return;
  await remove(deleteTarget.value.id);
  deleteDialogOpen.value = false;
  deleteTarget.value = null;
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold">Projects</h2>
      <UButton icon="i-lucide-plus" @click="openCreateDrawer">New project</UButton>
    </div>

    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <USkeleton v-for="n in 3" :key="n" class="h-32 rounded-xl" />
    </div>

    <div
      v-else-if="projects?.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @open="openEditDrawer"
        @delete="openDeleteDialog"
      />
    </div>

    <div v-else class="text-center py-20 text-muted">
      <UIcon
        name="i-lucide-folder-open"
        class="w-12 h-12 mx-auto mb-4 opacity-40"
      />
      <p class="font-medium">No projects yet</p>
      <p class="text-sm mt-1">Create your first project to get started.</p>
      <UButton class="mt-4" @click="openCreateDrawer">Create project</UButton>
    </div>

    <ProjectDrawer
      v-model:open="drawerOpen"
      :project="editingProject"
      :loading="creating || updating"
      @submit="handleDrawerSubmit"
    />

    <ProjectDeleteDialog
      v-model:open="deleteDialogOpen"
      :project="deleteTarget"
      :loading="deleting"
      @confirm="handleDelete"
      @cancel="
        deleteDialogOpen = false;
        deleteTarget = null;
      "
    />
  </div>
</template>
