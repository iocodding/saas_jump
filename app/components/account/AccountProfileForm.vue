<script setup lang="ts">
const { profileQuery, updateMutation } = useProfile()
const toast = useAppToast()

const form = reactive({
  display_name: '',
  avatar_url: '',
})

watch(() => profileQuery.data.value, (profile) => {
  if (profile) {
    form.display_name = profile.display_name ?? ''
    form.avatar_url = profile.avatar_url ?? ''
  }
}, { immediate: true })

const onSubmit = async () => {
  await updateMutation.mutateAsync(form)
  toast.success('Profile updated')
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-base font-semibold">Profile</h2>
    </template>
    <div class="space-y-4">
      <UFormField label="Display name" class="w-full">
        <UInput v-model="form.display_name" placeholder="Your name" size="lg" class="w-full" />
      </UFormField>
      <UFormField label="Avatar URL" class="w-full">
        <UInput v-model="form.avatar_url" placeholder="https://..." size="lg" class="w-full" />
      </UFormField>
    </div>
    <template #footer>
      <UButton :loading="updateMutation.isPending.value" @click="onSubmit">
        Save changes
      </UButton>
    </template>
  </UCard>
</template>
