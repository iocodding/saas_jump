<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('docs').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({ title: page.value.title, meta: [{ name: 'description', content: page.value.description }] })
</script>

<template>
  <UPageBody>
    <ContentRenderer v-if="page" :value="page" class="prose dark:prose-invert max-w-none" />
  </UPageBody>
</template>
