<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const supabase = useSupabaseClient()
const { updatePassword } = useAuth()
const route = useRoute()
const toast = useAppToast()

const ready = ref(false)
const loading = ref(false)
const form = reactive({ password: '', confirm: '' })

onMounted(async () => {
  const code = route.query.code as string | undefined
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }
  ready.value = true
})

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
    await navigateTo('/dashboard/account')
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Set new password</h1>
    </div>

    <template v-if="ready">
      <div class="space-y-4">
        <UFormField label="New password" class="w-full">
          <UInput v-model="form.password" type="password" placeholder="Min 8 characters" size="lg" class="w-full" />
        </UFormField>
        <UFormField label="Confirm password" class="w-full">
          <UInput v-model="form.confirm" type="password" placeholder="Repeat new password" size="lg" class="w-full" />
        </UFormField>
      </div>
      <UButton block :loading="loading" :disabled="!form.password || form.password !== form.confirm" @click="onSubmit">
        Update password
      </UButton>
    </template>
  </div>
</template>
