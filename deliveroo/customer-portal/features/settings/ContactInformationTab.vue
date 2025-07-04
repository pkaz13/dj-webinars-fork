<template>
  <div class="card p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
      Contact Information
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Email *
          </label>
          <input
            v-model="form.primaryEmail"
            type="email"
            required
            class="input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Primary Phone *
          </label>
          <input
            v-model="form.primaryPhone"
            type="tel"
            required
            class="input"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Website
          </label>
          <input
            v-model="form.website"
            type="url"
            class="input"
            placeholder="https://example.com"
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Emergency Contact
        </h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Name *
            </label>
            <input
              v-model="form.emergencyContact.name"
              type="text"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Phone *
            </label>
            <input
              v-model="form.emergencyContact.phone"
              type="tel"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contact Email
            </label>
            <input
              v-model="form.emergencyContact.email"
              type="email"
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Relationship
            </label>
            <input
              v-model="form.emergencyContact.relationship"
              type="text"
              class="input"
              placeholder="e.g., Manager, Director"
            />
          </div>
        </div>
      </div>
      
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn-primary"
        >
          Save Contact Information
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { ContactInfo } from './settings.model'

interface Props {
  contactInfo: ContactInfo
}

interface Emits {
  (e: 'update', data: ContactInfo): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive<ContactInfo>({
  primaryEmail: props.contactInfo.primaryEmail,
  primaryPhone: props.contactInfo.primaryPhone,
  website: props.contactInfo.website,
  emergencyContact: {
    name: props.contactInfo.emergencyContact.name,
    phone: props.contactInfo.emergencyContact.phone,
    email: props.contactInfo.emergencyContact.email,
    relationship: props.contactInfo.emergencyContact.relationship
  }
})

const handleSubmit = () => {
  emit('update', form)
}
</script> 