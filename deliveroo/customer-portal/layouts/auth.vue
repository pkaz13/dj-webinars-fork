<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <AppLogo class="h-12 w-auto" />
        </NuxtLink>
      </div>
    </div>
    
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <slot />
      </div>
    </div>
    
    <div class="mt-8 text-center">
      <ThemeToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
// Explicit imports for components
import AppLogo from '~/components/layout/AppLogo.vue'
import ThemeToggle from '~/components/ui-library/ThemeToggle.vue'
</script>