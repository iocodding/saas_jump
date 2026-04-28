<template>
  <div class="min-h-screen flex bg-gray-50 dark:bg-gray-950">
    <DashboardSidebar />
    <div class="flex-1 flex flex-col min-w-0">
      <DashboardTopNav />
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
