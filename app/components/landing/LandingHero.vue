<script setup lang="ts">
const config = useRuntimeConfig()

const cloneCommand = 'git clone git@github.com:iocodding/saas_jump.git'
const copied = ref(false)

const copy = async () => {
  await navigator.clipboard.writeText(cloneCommand)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="flex flex-col items-center text-center gap-4 py-24 px-6">
    <div class="flex items-center gap-2 text-sm font-medium text-primary">
      <UIcon name="i-simple-icons-github" class="w-4 h-4" />
      <span>100% Open Source</span>
    </div>

    <h1 class="text-5xl sm:text-6xl font-extrabold tracking-tight text-highlighted max-w-3xl">
      Build your next SaaS with {{ config.public.appName }}
    </h1>

    <p class="text-lg text-muted max-w-xl">
      A production-ready boilerplate built on Nuxt, Supabase, and Nuxt UI.
      Authentication, database, and a full dashboard — ready from day one.
    </p>

    <div class="flex flex-col items-center gap-3 mt-2">
      <button
        class="flex items-center gap-3 bg-muted hover:bg-(--ui-border) transition-colors border border-(--ui-border) rounded-xl px-5 py-3 font-mono text-sm group cursor-pointer"
        @click="copy"
      >
        <UIcon name="i-lucide-terminal" class="w-4 h-4 text-muted shrink-0" />
        <span>{{ cloneCommand }}</span>
        <UIcon
          :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          :class="copied ? 'text-primary' : 'text-muted group-hover:text-default'"
          class="w-4 h-4 shrink-0 transition-colors"
        />
      </button>
      <UButton
        to="https://github.com/iocodding/saas_jump"
        target="_blank"
        color="neutral"
        variant="outline"
        leading-icon="i-simple-icons-github"
        size="lg"
      >
        View on GitHub
      </UButton>
    </div>
  </div>
</template>
