<template>
  <div class="flex items-center space-x-2">
    <div class="relative">
      <div class="w-8 h-8 bg-success-600 rounded-lg flex items-center justify-center">
        <TruckIcon class="w-5 h-5 text-white" />
      </div>
      <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"></div>
    </div>
    <span class="text-xl font-bold text-gray-900 dark:text-white">
      Deliveroo
    </span>
  </div>
</template>

<script setup lang="ts">
import { TruckIcon } from '@heroicons/vue/24/solid'
</script>