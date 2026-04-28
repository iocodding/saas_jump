<script setup lang="ts">
const { data: navigation } = await useAsyncData('docs-nav', () =>
  queryCollectionNavigation('docs')
)
</script>

<template>
  <div>
    <AppHeader />
    <UPage class="max-w-6xl mx-auto px-6">
      <template #left>
        <UPageAside class="px-4 py-6">
          <UContentNavigation :navigation="navigation ?? []" />
        </UPageAside>
      </template>
      <slot />
    </UPage>
    <AppFooter />
  </div>
</template>
