<template>
  <DataTable
    title="Storage Items"
    description="Inventory items in storage"
    :data="storageItems"
    :columns="columns"
    :loading="isLoading"
    :error="isError"
    loading-text="Loading storage items..."
    error-title="Error Loading Storage Items"
    error-message="There was a problem loading storage items."
    :row-actions="rowActions"
    @retry="fetchItems"
  >
    <template #cell-cargoType="{ value }">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {{ value }}
      </span>
    </template>
    <template #cell-status="{ value }">
      <span
        :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          getStatusColor(value)
        ]"
      >
        {{ value }}
      </span>
    </template>
    <template #cell-arrivalDate="{ value }">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ formatDate(value) }}
      </span>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from '~/components/ui-library/datatable/DataTable.vue';
import type { StorageItem } from './storage-listing.model';
import { getStorageItems } from './storage-listing-api';
import { ref, onMounted, watch } from 'vue';
import { EyeIcon } from '@heroicons/vue/24/outline';
import { navigateTo } from '#app';

const props = defineProps<{ filters: { status: string; cargoType: string } }>();
const storageItems = ref<StorageItem[]>([]);
const isLoading = ref(false);
const isError = ref(false);

const fetchItems = async () => {
  isLoading.value = true;
  isError.value = false;
  try {
    storageItems.value = await getStorageItems(props.filters);
  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchItems);
watch(() => props.filters, fetchItems, { deep: true });

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'cargoType', label: 'Cargo Type' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'storageLocation', label: 'Location' },
  { key: 'status', label: 'Status' },
  { key: 'arrivalDate', label: 'Arrival Date' }
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    IN_STORAGE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    DISPATCHED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    REMOVED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
}

const rowActions = [
  {
    label: 'View',
    icon: EyeIcon,
    handler: (item: StorageItem) => navigateTo(`/dashboard/warehousing/${item.id}`),
  }
];
</script> 