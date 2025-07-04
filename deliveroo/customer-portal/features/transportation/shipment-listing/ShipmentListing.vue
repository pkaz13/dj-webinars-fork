<template>
  <div>
    <!-- Header Section -->
    <div class="mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Shipments
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Monitor and manage your active shipments across Europe
        </p>
      </div>
    </div>

    <!-- Filters -->
    <ShipmentFilters
      :filters="filters"
      @update:filters="updateFilters"
      @clear-filters="clearFilters"
    />

    <!-- Data Table -->
    <ShipmentDataTable :filters="filters" />
  </div>
</template>

<script setup lang="ts">
import ShipmentFilters from './ShipmentFilters.vue'
import ShipmentDataTable from './ShipmentDataTable.vue'
import type { ShipmentFilters as ShipmentFiltersType } from './shipment-filters'

// Filter state management
const filters = reactive<ShipmentFiltersType>({
  status: '',
  serviceType: '',
  dateFrom: ''
})

// Handle filter updates from the filters component
const updateFilters = (newFilters: ShipmentFiltersType) => {
  filters.status = newFilters.status
  filters.serviceType = newFilters.serviceType
  filters.dateFrom = newFilters.dateFrom
}

// Handle clear filters event
const clearFilters = () => {
  filters.status = ''
  filters.serviceType = ''
  filters.dateFrom = ''
}
</script> 