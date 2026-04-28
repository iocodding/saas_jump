<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })

const { sendPasswordResetEmail } = useAuth()
const toast = useAppToast()

const email = ref('')
const loading = ref(false)
const sent = ref(false)

const onSubmit = async () => {
  loading.value = true
  const { error } = await sendPasswordResetEmail(email.value)
  loading.value = false
  if (error) {
    toast.error('Failed to send reset email', error.message)
  }
  else {
    sent.value = true
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Reset password</h1>
      <p class="text-muted text-sm mt-1">We'll send you a link to reset your password</p>
    </div>

    <AlertBanner v-if="sent" type="success" message="Check your email for the reset link." />

    <template v-if="!sent">
      <UFormField label="Email" class="w-full">
        <UInput v-model="email" type="email" placeholder="you@example.com" autocomplete="email" size="lg" class="w-full" />
      </UFormField>
      <UButton block :loading="loading" :disabled="!email" @click="onSubmit">Send reset link</UButton>
    </template>

    <p class="text-center text-sm text-muted">
      <NuxtLink to="/auth/login" class="text-primary hover:underline">Back to login</NuxtLink>
    </p>
  </div>
</template>
