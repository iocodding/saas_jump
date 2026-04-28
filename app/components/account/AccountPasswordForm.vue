<script setup lang="ts">
const { updatePassword } = useAuth()
const toast = useAppToast()

const form = reactive({ password: '', confirm: '' })
const loading = ref(false)

const onSubmit = async () => {
  if (form.password !== form.confirm) {
    toast.error('Passwords do not match')
    return
  }
  loading.value = true
  const { error } = await updatePassword(form.password)
  loading.value = false
  if (error) {
    toast.error('Failed to update password', error.message)
  }
  else {
    toast.success('Password updated')
    form.password = ''
    form.confirm = ''
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-base font-semibold">Change password</h2>
    </template>
    <div class="space-y-4">
      <UFormField label="New password" class="w-full">
        <UInput v-model="form.password" type="password" placeholder="Min 8 characters" size="lg" class="w-full" />
      </UFormField>
      <UFormField label="Confirm password" class="w-full">
        <UInput v-model="form.confirm" type="password" placeholder="Repeat new password" size="lg" class="w-full" />
      </UFormField>
    </div>
    <template #footer>
      <UButton :loading="loading" :disabled="!form.password || form.password !== form.confirm" @click="onSubmit">
        Update password
      </UButton>
    </template>
  </UCard>
</template>
