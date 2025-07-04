<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex w-full items-center justify-between py-6 lg:border-none">
        <div class="flex items-center">
          <NuxtLink to="/">
            <span class="sr-only">Deliveroo Logistics</span>
            <AppLogo class="h-10 w-auto" />
          </NuxtLink>
        </div>
        
        <div class="ml-10 space-x-4 flex items-center">
          <ThemeToggle />
          
          <NuxtLink
            to="/dashboard"
            class="inline-block bg-success-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-success-700 transition-colors"
          >
            Dashboard
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
// Simplified dashboard header - no navigation items or scroll functionality needed
</script> 