<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })

const { signup, loading, error } = useAuth()
const toast = useAppToast()

const form = reactive({ name: '', email: '', password: '' })

const onSubmit = async () => {
  const ok = await signup(form.email, form.password, form.name)
  if (!ok && error.value) {
    toast.error('Signup failed', error.value)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold">Create your account</h1>
      <p class="text-muted text-sm mt-1">Get started for free</p>
    </div>

    <AlertBanner v-if="error" type="error" :message="error" />

    <div class="space-y-4">
      <UFormField label="Name" class="w-full">
        <UInput v-model="form.name" placeholder="Your name" autocomplete="name" size="lg" class="w-full" />
      </UFormField>
      <UFormField label="Email" class="w-full">
        <UInput v-model="form.email" type="email" placeholder="you@example.com" autocomplete="email" size="lg" class="w-full" />
      </UFormField>
      <UFormField label="Password" class="w-full">
        <UInput v-model="form.password" type="password" placeholder="Min 8 characters" autocomplete="new-password" size="lg" class="w-full" />
      </UFormField>
    </div>

    <UButton block :loading="loading" @click="onSubmit">Create account</UButton>

    <p class="text-center text-sm text-muted">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-primary hover:underline">Sign in</NuxtLink>
    </p>
  </div>
</template>
