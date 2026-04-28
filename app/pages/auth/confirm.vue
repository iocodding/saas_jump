<script setup lang="ts">
definePageMeta({ layout: 'auth' })

const supabase = useSupabaseClient()
const route = useRoute()
const status = ref<'loading' | 'success' | 'error'>('loading')

onMounted(async () => {
  const code = route.query.code as string | undefined
  if (!code) {
    status.value = 'error'
    return
  }
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  status.value = error ? 'error' : 'success'
  if (!error) {
    await navigateTo('/dashboard/projects')
  }
})
</script>

<template>
  <div class="space-y-4 text-center py-4">
    <template v-if="status === 'loading'">
      <UIcon name="i-lucide-loader-circle" class="w-8 h-8 mx-auto animate-spin text-primary" />
      <p class="text-muted text-sm">Confirming your email…</p>
    </template>
    <template v-else-if="status === 'success'">
      <UIcon name="i-lucide-check-circle" class="w-8 h-8 mx-auto text-success" />
      <p>Email confirmed! Redirecting…</p>
    </template>
    <template v-else>
      <UIcon name="i-lucide-x-circle" class="w-8 h-8 mx-auto text-error" />
      <p class="font-medium">Confirmation failed</p>
      <p class="text-muted text-sm">The link may have expired.</p>
      <UButton to="/auth/signup" variant="soft">Try again</UButton>
    </template>
  </div>
</template>
