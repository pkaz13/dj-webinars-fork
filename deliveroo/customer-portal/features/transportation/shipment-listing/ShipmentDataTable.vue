<template>
  <DataTable
    title="Shipments"
    description="Manage your active shipments across Europe"
    :data="query.data.value || []"
    :columns="columns"
    :loading="query.isPending.value"
    :error="query.isError.value"
    :loadingText="'Loading shipments...'"
    :errorTitle="'Error Loading Shipments'"
    :errorMessage="'There was a problem loading your shipments.'"
    :rowActions="rowActions"
    @retry="query.refetch"
  >
    <template #cell-shipment="{ item }">
      <div class="text-sm font-medium text-gray-900 dark:text-white">
        {{ item.shipmentNumber }}
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ item.trackingNumber }}
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
    <template #cell-scheduledPickupDate="{ item }">
      <span class="text-sm text-gray-900 dark:text-white">
        {{ formatDate(item.scheduledPickupDate) }}
      </span>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { 
  EyeIcon, 
  MapPinIcon
} from '@heroicons/vue/24/outline'
import type { Shipment } from './shipment.model'
import DataTable from '~/components/ui-library/datatable/DataTable.vue'
import { type PartialShipmentFilters } from './shipment-filters'
import { useShipmentsQuery } from './shipment-api'

interface Props {
  filters?: PartialShipmentFilters
}

const props = withDefaults(defineProps<Props>(), {
  filters: () => ({})
})

// Use TanStack Query
const query = useShipmentsQuery(toRef(props, 'filters'))

// Formatting functions
const formatServiceType = (type: string) => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const getStatusColor = (status: string) => {
  const colors = {
    'SCHEDULED': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'PICKUP_SCHEDULED': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'IN_TRANSIT': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'OUT_FOR_DELIVERY': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'DELIVERED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'COMPLETED': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    'AWAITING_PAYMENT': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'PAID': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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

// Table configuration
const columns = [
  {
    key: 'shipment',
    label: 'Shipment'
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
    key: 'scheduledPickupDate',
    label: 'Pickup Date'
  }
]

const rowActions = [
  {
    label: 'View',
    icon: EyeIcon,
    handler: (item: Shipment) => {
      navigateTo(`/dashboard/transportation/${item.id}`)
    }
  },
  {
    label: 'Track',
    icon: MapPinIcon,
    handler: (item: Shipment) => {
      trackShipment(item.trackingNumber)
    }
  }
]
</script> 