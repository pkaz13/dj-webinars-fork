<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        New Transportation Request
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Create a new road transportation request across Europe
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Service Type Selection -->
      <div class="card p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Service Type
        </h3>
        
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label
            v-for="service in serviceTypes"
            :key="service.value"
            :class="[
              'relative flex cursor-pointer rounded-lg border p-4 focus:outline-none',
              form.serviceType === service.value
                ? 'border-primary-600 ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            ]"
          >
            <input
              v-model="form.serviceType"
              type="radio"
              :value="service.value"
              class="sr-only"
              required
            />
            <div class="flex items-center">
              <div class="text-sm">
                <div class="font-medium text-gray-900 dark:text-white">
                  {{ service.name }}
                </div>
                <div class="text-gray-500 dark:text-gray-400">
                  {{ service.description }}
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Pickup Information -->
      <div class="card p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Pickup Information
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pickup Address *
            </label>
            <input
              v-model="form.pickupLocation.address.street"
              type="text"
              required
              class="input"
              placeholder="Enter pickup address"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              City *
            </label>
            <input
              v-model="form.pickupLocation.address.city"
              type="text"
              required
              class="input"
              placeholder="Enter city"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country *
            </label>
            <select
              v-model="form.pickupLocation.address.country"
              required
              class="input"
            >
              <option value="">Select country</option>
              <option value="Poland">Poland</option>
              <option value="Germany">Germany</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Hungary">Hungary</option>
              <option value="Austria">Austria</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Belgium">Belgium</option>
              <option value="France">France</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Person *
            </label>
            <input
              v-model="form.pickupLocation.contactPerson"
              type="text"
              required
              class="input"
              placeholder="Contact person name"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Phone *
            </label>
            <input
              v-model="form.pickupLocation.contactPhone"
              type="tel"
              required
              class="input"
              placeholder="Phone number"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Pickup Date *
            </label>
            <input
              v-model="form.requestedPickupDate"
              type="date"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Loading Type
            </label>
            <select
              v-model="form.pickupLocation.loadingType"
              class="input"
            >
              <option value="DOCK">Dock Loading</option>
              <option value="GROUND">Ground Level</option>
              <option value="CRANE">Crane Required</option>
              <option value="FORKLIFT">Forklift Available</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Delivery Information -->
      <div class="card p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Delivery Information
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Delivery Address *
            </label>
            <input
              v-model="form.deliveryLocation.address.street"
              type="text"
              required
              class="input"
              placeholder="Enter delivery address"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              City *
            </label>
            <input
              v-model="form.deliveryLocation.address.city"
              type="text"
              required
              class="input"
              placeholder="Enter city"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country *
            </label>
            <select
              v-model="form.deliveryLocation.address.country"
              required
              class="input"
            >
              <option value="">Select country</option>
              <option value="Poland">Poland</option>
              <option value="Germany">Germany</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Hungary">Hungary</option>
              <option value="Austria">Austria</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Belgium">Belgium</option>
              <option value="France">France</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Person *
            </label>
            <input
              v-model="form.deliveryLocation.contactPerson"
              type="text"
              required
              class="input"
              placeholder="Contact person name"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Phone *
            </label>
            <input
              v-model="form.deliveryLocation.contactPhone"
              type="tel"
              required
              class="input"
              placeholder="Phone number"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Delivery Date
            </label>
            <input
              v-model="form.requestedDeliveryDate"
              type="date"
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Unloading Type
            </label>
            <select
              v-model="form.deliveryLocation.loadingType"
              class="input"
            >
              <option value="DOCK">Dock Unloading</option>
              <option value="GROUND">Ground Level</option>
              <option value="CRANE">Crane Required</option>
              <option value="FORKLIFT">Forklift Available</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Cargo Information -->
      <div class="card p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Cargo Information
        </h3>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cargo Description *
            </label>
            <textarea
              v-model="form.cargo.description"
              rows="3"
              required
              class="input"
              placeholder="Describe the cargo to be transported"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cargo Type
            </label>
            <select
              v-model="form.cargo.cargoType"
              class="input"
            >
              <option value="GENERAL_CARGO">General Cargo</option>
              <option value="PERISHABLE">Perishable</option>
              <option value="HAZARDOUS">Hazardous</option>
              <option value="OVERSIZED">Oversized</option>
              <option value="VALUABLE">Valuable</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Weight (kg) *
            </label>
            <input
              v-model.number="form.cargo.weight"
              type="number"
              min="0"
              required
              class="input"
              placeholder="Enter weight in kg"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Packaging Type
            </label>
            <select
              v-model="form.cargo.packaging"
              class="input"
            >
              <option value="PALLETS">Pallets</option>
              <option value="BOXES">Boxes</option>
              <option value="CRATES">Crates</option>
              <option value="BULK">Bulk</option>
              <option value="CONTAINERS">Containers</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <input
              v-model.number="form.cargo.quantity"
              type="number"
              min="1"
              class="input"
              placeholder="Number of units"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Estimated Value (EUR)
            </label>
            <input
              v-model.number="form.cargo.value"
              type="number"
              min="0"
              class="input"
              placeholder="Enter estimated value"
            />
          </div>
        </div>
        
        <div class="mt-6 space-y-4">
          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="form.cargo.fragile"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Fragile</span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.cargo.stackable"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Stackable</span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.requiresInsurance"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires Insurance</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Special Instructions -->
      <div class="card p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Special Instructions
        </h3>
        <textarea
          v-model="form.specialInstructions"
          rows="4"
          class="input"
          placeholder="Any special handling requirements, delivery instructions, or additional information..."
        ></textarea>
      </div>

      <!-- Submit Buttons -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="saveDraft"
          class="btn-outline"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="btn-primary"
        >
          <span v-if="!loading">Submit Request</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <SuccessModal
      :show="showSuccessModal"
      title="Transportation Request Submitted Successfully!"
      message="Your transportation request has been received and is being processed by our logistics team."
      :reference-number="generatedRequestNumber"
      :next-steps="[
        'Our team will review your request within 2 business hours',
        'You will receive a detailed quote via email within 4 hours',
        'Once approved, we will schedule pickup and provide tracking information',
        'You can track your shipment progress in real-time through the dashboard'
      ]"
      :show-contact="true"
      :primary-action="{
        label: 'View Request',
        action: () => navigateToRequest()
      }"
      close-label="Create Another Request"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const showSuccessModal = ref(false)
const generatedRequestNumber = ref('')

const serviceTypes = [
  {
    value: 'FULL_TRUCKLOAD',
    name: 'Full Truckload (FTL)',
    description: 'Dedicated truck for your cargo'
  },
  {
    value: 'LESS_THAN_TRUCKLOAD',
    name: 'Less Than Truckload (LTL)',
    description: 'Shared truck space'
  },
  {
    value: 'EXPRESS_DELIVERY',
    name: 'Express Delivery',
    description: 'Priority fast delivery'
  },
  {
    value: 'OVERSIZED_CARGO',
    name: 'Oversized Cargo',
    description: 'Special handling for large items'
  },
  {
    value: 'HAZARDOUS_MATERIALS',
    name: 'Hazardous Materials',
    description: 'ADR compliant transport'
  }
]

const form = reactive({
  serviceType: '',
  pickupLocation: {
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: ''
    },
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    loadingType: 'DOCK',
    facilityType: 'WAREHOUSE',
    operatingHours: {}
  },
  deliveryLocation: {
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: ''
    },
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    loadingType: 'DOCK',
    facilityType: 'WAREHOUSE',
    operatingHours: {}
  },
  cargo: {
    description: '',
    cargoType: 'GENERAL_CARGO',
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      unit: 'cm'
    },
    value: 0,
    currency: 'EUR',
    packaging: 'PALLETS',
    stackable: true,
    fragile: false,
    quantity: 1,
    unitType: 'pallets'
  },
  requestedPickupDate: '',
  requestedDeliveryDate: '',
  specialInstructions: '',
  requiresInsurance: false,
  requiresCustomsClearance: false,
  priority: 'NORMAL',
  currency: 'EUR'
})

const handleSubmit = async () => {
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate request number
    generatedRequestNumber.value = `TR-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    
    // Show success modal
    showSuccessModal.value = true
  } catch (error) {
    console.error('Request submission failed:', error)
  } finally {
    loading.value = false
  }
}

const saveDraft = async () => {
  // Save as draft logic
  console.log('Saving as draft...')
}

const navigateToRequest = () => {
  navigateTo('/dashboard/transportation')
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  // Reset form for new request
  Object.keys(form).forEach(key => {
    if (typeof form[key] === 'object' && form[key] !== null) {
      Object.keys(form[key]).forEach(subKey => {
        if (typeof form[key][subKey] === 'object') {
          Object.keys(form[key][subKey]).forEach(subSubKey => {
            form[key][subKey][subSubKey] = ''
          })
        } else {
          form[key][subKey] = ''
        }
      })
    } else {
      form[key] = ''
    }
  })
  
  // Reset specific values
  form.cargo.cargoType = 'GENERAL_CARGO'
  form.cargo.packaging = 'PALLETS'
  form.cargo.stackable = true
  form.cargo.fragile = false
  form.cargo.quantity = 1
  form.cargo.unitType = 'pallets'
  form.pickupLocation.loadingType = 'DOCK'
  form.deliveryLocation.loadingType = 'DOCK'
  form.priority = 'NORMAL'
  form.currency = 'EUR'
}

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>