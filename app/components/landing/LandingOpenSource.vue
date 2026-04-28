<script setup lang="ts">
const cloneCommand = 'git clone https://github.com/your-org/saas-jump.git'
const copied = ref(false)

const copy = async () => {
  await navigator.clipboard.writeText(cloneCommand)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <UPageSection>
    <div class="flex flex-col items-center gap-6 text-center">
      <div class="flex items-center gap-2 text-sm font-medium text-primary">
        <UIcon name="i-simple-icons-github" class="w-4 h-4" />
        <span>100% Open Source</span>
      </div>

      <h2 class="text-3xl font-bold tracking-tight">
        Free to use, yours to own
      </h2>

      <p class="text-muted max-w-lg">
        SaaS Jump is fully open source. Clone it, customise it, and ship your product — no license fees, no lock-in.
      </p>

      <button
        class="flex items-center gap-3 bg-muted hover:bg-(--ui-border) transition-colors border border-(--ui-border) rounded-xl px-5 py-3 font-mono text-sm group cursor-pointer"
        @click="copy"
      >
        <UIcon name="i-lucide-terminal" class="w-4 h-4 text-muted shrink-0" />
        <span class="text-left">{{ cloneCommand }}</span>
        <UIcon
          :name="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          :class="copied ? 'text-primary' : 'text-muted group-hover:text-default'"
          class="w-4 h-4 shrink-0 transition-colors"
        />
      </button>

      <p v-if="copied" class="text-xs text-primary">
        Copied to clipboard!
      </p>

      <UButton
        to="https://github.com/your-org/saas-jump"
        target="_blank"
        color="neutral"
        variant="outline"
        leading-icon="i-simple-icons-github"
      >
        View on GitHub
      </UButton>
    </div>
  </UPageSection>
</template>
