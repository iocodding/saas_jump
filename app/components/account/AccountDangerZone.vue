<script setup lang="ts">
const supabase = useSupabaseClient()
const toast = useAppToast()
const deleteOpen = ref(false)
const loading = ref(false)

const onDeleteAccount = async () => {
  loading.value = true
  const { error } = await supabase.rpc('delete_user')
  loading.value = false
  if (error) {
    toast.error('Failed to delete account', error.message)
  }
  else {
    await supabase.auth.signOut()
    await navigateTo('/')
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-base font-semibold text-error">Danger zone</h2>
    </template>
    <div class="space-y-2">
      <p class="text-sm text-muted">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>
      <UButton color="error" variant="soft" @click="deleteOpen = true">
        Delete account
      </UButton>
    </div>

    <ConfirmModal
      :open="deleteOpen"
      title="Delete account"
      description="This will permanently delete your account and all data. This cannot be undone."
      confirm-label="Yes, delete my account"
      :loading="loading"
      @update:open="deleteOpen = $event"
      @confirm="onDeleteAccount"
      @cancel="deleteOpen = false"
    />
  </UCard>
</template>
