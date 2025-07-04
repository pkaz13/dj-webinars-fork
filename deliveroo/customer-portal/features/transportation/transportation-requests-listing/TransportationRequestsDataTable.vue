<template>
  <DataTable
    title="Transportation Requests"
    description="Manage your road transportation requests across Europe"
    :data="query.data.value || []"
    :columns="columns"
    :headerActions="headerActions"
    :loading="query.isPending.value"
    :error="query.isError.value"
    :loadingText="'Loading transportation requests...'"
    :errorTitle="'Error Loading Requests'"
    :errorMessage="'There was a problem loading your transportation requests.'"
    :rowActions="rowActions"
    @retry="query.refetch"
  >
    <template #cell-request="{ item }">
      <div class="text-sm font-medium text-gray-900 dark:text-white">
        {{ item.requestNumber }}
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ item.trackingNumber || 'Not assigned' }}
      </div>
    </template>
    <template #cell-route="{ item }">
      <div class="text-sm text-gray-900 dark:text-white">
        {{ item.pickupLocation.address.city }} → {{ item.deliveryLocation.address.city }}
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ item.pickupLocation.address.country }} → {{ item.deliveryLocation.address.country }}
      </div>
    </template>
    <template #cell-serviceType="{ item }">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {{ formatServiceType(item.serviceType) }}
      </span>
    </template>
    <template #cell-status="{ item }">
      <span
        :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          getStatusColor(item.status)
        ]"
      >
        {{ formatStatus(item.status) }}
      </span>
    </template>
    <template #cell-requestedPickupDate="{ item }">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ formatDate(item.requestedPickupDate) }}
      </span>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { 
  EyeIcon, 
  MapPinIcon
} from '@heroicons/vue/24/outline'
import type { TransportationRequest } from './transportation-request.model'
import DataTable from '~/components/ui-library/datatable/DataTable.vue'
import { type PartialTransportationRequestFilters } from './transportation-requests-filter'
import { useTransportationRequestsQuery } from './transportation-requests-api'

interface Props {
  filters?: PartialTransportationRequestFilters
}

const props = withDefaults(defineProps<Props>(), {
  filters: () => ({})
})

// Use TanStack Query
const query = useTransportationRequestsQuery(toRef(props, 'filters'))

// Formatting functions
const formatServiceType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const getStatusColor = (status: string) => {
  const colors = {
    'SUBMITTED': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'IN_PROGRESS': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'PICKUP_SCHEDULED': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'PICKED_UP': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'IN_TRANSIT': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'DELIVERED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

// Navigation functions
const trackShipment = (trackingNumber: string) => {
  navigateTo(`/dashboard/tracking?number=${trackingNumber}`)
}

// Header actions
const headerActions = [
  {
    label: 'New Transportation Request',
    handler: () => navigateTo('/dashboard/transportation/new'),
    variant: 'primary' as const
  }
]

// Table configuration
const columns = [
  {
    key: 'request',
    label: 'Request'
  },
  {
    key: 'route',
    label: 'Route'
  },
  {
    key: 'serviceType',
    label: 'Service Type'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'requestedPickupDate',
    label: 'Pickup Date'
  }
]

const rowActions = [
  {
    label: 'View',
    icon: EyeIcon,
    handler: (item: TransportationRequest) => {
      navigateTo(`/dashboard/requests/transportation/${item.id}`)
    }
  },
  {
    label: 'Track',
    icon: MapPinIcon,
    handler: (item: TransportationRequest) => {
      if (item.trackingNumber) {
        trackShipment(item.trackingNumber)
      }
    },
    condition: (item: TransportationRequest) => !!item.trackingNumber
  }
]
</script>
