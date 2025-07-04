<template>
  <DataTable
    title="Warehousing Requests"
    description="Warehousing requests for storage and handling services"
    :data="warehousingQuery.data.value?.data || []"
    :columns="columns"
    :loading="warehousingQuery.isLoading.value"
    :error="warehousingQuery.isError.value"
    :header-actions="headerActions"
    :row-actions="rowActions"
    :pagination="paginationData"
    loading-text="Loading warehousing requests..."
    error-title="Error Loading Warehousing Requests"
    error-message="There was a problem loading your warehousing requests."
    empty-title="No Warehousing Requests"
    empty-message="No warehousing requests found matching your criteria."
    :empty-icon="BuildingStorefrontIcon"
    @retry="warehousingQuery.refetch"
    @previous-page="previousPage"
    @next-page="nextPage"
    @go-to-page="goToPage"
  >
    <!-- Request ID -->
    <template #cell-id="{ value }">
      <div class="text-sm font-medium text-gray-900 dark:text-white">
        {{ value }}
      </div>
    </template>
    
    <!-- Details with sub-details -->
    <template #cell-details="{ item, value }">
      <div>
        <div class="text-sm text-gray-900 dark:text-white">
          {{ value }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ item.subDetails }}
        </div>
      </div>
    </template>
    
    <!-- Status badge -->
    <template #cell-status="{ value }">
      <span
        :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          getStatusColor(value)
        ]"
      >
        {{ getStatusLabel(value) }}
      </span>
    </template>

    <!-- Priority badge -->
    <template #cell-priority="{ value }">
      <span
        :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          getPriorityColor(value)
        ]"
      >
        {{ value }}
      </span>
    </template>

    <!-- Storage Type badge -->
    <template #cell-storageType="{ value }">
      <span
        :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          getStorageTypeColor(value)
        ]"
      >
        {{ formatStorageType(value) }}
      </span>
    </template>

    <!-- Volume -->
    <template #cell-volume="{ value }">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ value }} m³
      </span>
    </template>
    
    <!-- Formatted date -->
    <template #cell-date="{ value }">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ formatDate(value) }}
      </span>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { BuildingStorefrontIcon, EyeIcon, CubeIcon } from '@heroicons/vue/24/outline'
import DataTable from '~/components/ui-library/datatable/DataTable.vue'
import { useWarehousingRequestsPaginated } from './warehousing-requests-api'
import type { WarehousingRequestsFilters } from './warehousing-requests.model'

interface Props {
  filters: WarehousingRequestsFilters
}

const props = defineProps<Props>()

const currentPage = ref(1)
const itemsPerPage = 10

// Use the API composable
const warehousingQuery = useWarehousingRequestsPaginated(
  computed(() => props.filters),
  currentPage,
  itemsPerPage
)

// Column definitions
const columns = [
  {
    key: 'id',
    label: 'Request ID'
  },
  {
    key: 'details',
    label: 'Storage Type & Cargo'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'priority',
    label: 'Priority'
  },
  {
    key: 'storageType',
    label: 'Storage Type'
  },
  {
    key: 'volume',
    label: 'Volume'
  },
  {
    key: 'date',
    label: 'Date Created'
  }
]

// Header actions
const headerActions = [
  {
    label: 'New Warehousing Request',
    handler: () => navigateTo('/dashboard/warehousing/new'),
    variant: 'primary' as const
  }
]

// Row actions
const rowActions = [
  {
    label: 'View Details',
    handler: (item: any) => navigateTo(`/dashboard/requests/warehousing/${item.id}`),
    icon: EyeIcon
  },
  {
    label: 'View Inventory',
    handler: (item: any) => {
      // Navigate to inventory view when available
      console.log('View inventory for:', item.id)
    },
    icon: CubeIcon,
    condition: (item: any) => ['STORED', 'RECEIVED'].includes(item.status)
  }
]

// Utility functions
const getStatusColor = (status: string) => {
  const colors = {
    'SUBMITTED': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'UNDER_REVIEW': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'APPROVED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'PENDING_ARRIVAL': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'RECEIVED': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'STORED': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    'COMPLETED': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const getStatusLabel = (status: string) => {
  const labels = {
    'SUBMITTED': 'Submitted',
    'UNDER_REVIEW': 'Under Review',
    'APPROVED': 'Approved',
    'PENDING_ARRIVAL': 'Pending Arrival',
    'RECEIVED': 'Received',
    'STORED': 'Stored',
    'COMPLETED': 'Completed'
  }
  return labels[status as keyof typeof labels] || status
}

const getPriorityColor = (priority: string) => {
  const colors = {
    'LOW': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'NORMAL': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'HIGH': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'URGENT': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const getStorageTypeColor = (storageType: string) => {
  const colors = {
    'AMBIENT': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'REFRIGERATED': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'FROZEN': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'CLIMATE_CONTROLLED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'HAZARDOUS': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'SECURE': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
  return colors[storageType as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const formatStorageType = (storageType: string) => {
  return storageType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

// Computed values for pagination
const totalPages = computed(() => {
  const data = warehousingQuery.data.value
  return data ? Math.ceil(data.total / itemsPerPage) : 0
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => startIndex.value + itemsPerPage)

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const paginationData = computed(() => ({
  currentPage: currentPage.value,
  totalPages: totalPages.value,
  total: warehousingQuery.data.value?.total || 0,
  startIndex: startIndex.value,
  endIndex: endIndex.value,
  visiblePages: visiblePages.value
}))

// Actions
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Watch for filter changes to reset pagination
watch(() => props.filters, () => {
  currentPage.value = 1
}, { deep: true })
</script> 