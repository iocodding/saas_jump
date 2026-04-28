<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })

const { login, loading, error } = useAuth()
const toast = useAppToast()

const form = reactive({ email: '', password: '' })

const onSubmit = async () => {
  const ok = await login(form.email, form.password)
  if (ok) {
    await navigateTo('/dashboard/projects')
  }
  else if (error.value) {
    toast.error('Login failed', error.value)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="text-muted text-sm mt-1">Sign in to your account</p>
    </div>

    <AlertBanner v-if="error" type="error" :message="error" />

    <div class="space-y-4">
      <UFormField label="Email" class="w-full">
        <UInput v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" size="lg" class="w-full" />
      </UFormField>
      <UFormField label="Password" class="w-full">
        <UInput v-model="form.password" type="password" placeholder="••••••••" autocomplete="current-password" size="lg" class="w-full" />
      </UFormField>
    </div>

    <div class="flex items-center justify-end">
      <NuxtLink to="/auth/forgot-password" class="text-sm text-primary hover:underline">
        Forgot password?
      </NuxtLink>
    </div>

    <UButton block :loading="loading" @click="onSubmit">Sign in</UButton>

    <p class="text-center text-sm text-muted">
      Don't have an account?
      <NuxtLink to="/auth/signup" class="text-primary hover:underline">Sign up</NuxtLink>
    </p>
  </div>
</template>
