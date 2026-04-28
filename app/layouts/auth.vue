<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
    <div class="w-full max-w-md space-y-6">
      <div class="flex justify-center">
        <NuxtLink to="/">
          <AppLogo class="h-8 w-auto" />
        </NuxtLink>
      </div>
      <UCard>
        <slot />
      </UCard>
    </div>
  </div>
</template>
