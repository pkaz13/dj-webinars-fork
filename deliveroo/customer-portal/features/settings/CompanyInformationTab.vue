<template>
  <div class="card p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
      Company Information
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company Name *
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            class="input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Registration Number *
          </label>
          <input
            v-model="form.registrationNumber"
            type="text"
            required
            class="input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            VAT Number
          </label>
          <input
            v-model="form.vatNumber"
            type="text"
            class="input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Industry Type
          </label>
          <select
            v-model="form.industryType"
            class="input"
          >
            <option
              v-for="option in industryTypeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      
      <div>
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Company Address
        </h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Street Address *
            </label>
            <input
              v-model="form.address.street"
              type="text"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              City *
            </label>
            <input
              v-model="form.address.city"
              type="text"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Postal Code *
            </label>
            <input
              v-model="form.address.postalCode"
              type="text"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country *
            </label>
            <select
              v-model="form.address.country"
              required
              class="input"
            >
              <option
                v-for="option in countryOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn-primary"
        >
          Save Company Information
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { CompanyInfo } from './settings.model'
import { industryTypeOptions, countryOptions } from './settings.mocks'

interface Props {
  companyInfo: CompanyInfo
}

interface Emits {
  (e: 'update', data: CompanyInfo): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive<CompanyInfo>({
  name: props.companyInfo.name,
  registrationNumber: props.companyInfo.registrationNumber,
  vatNumber: props.companyInfo.vatNumber,
  industryType: props.companyInfo.industryType,
  address: {
    street: props.companyInfo.address.street,
    city: props.companyInfo.address.city,
    postalCode: props.companyInfo.address.postalCode,
    country: props.companyInfo.address.country
  }
})

const handleSubmit = () => {
  emit('update', form)
}
</script> 