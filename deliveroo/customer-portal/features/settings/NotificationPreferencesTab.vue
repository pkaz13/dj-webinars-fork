<template>
  <div class="card p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
      Notification Preferences
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Email Notifications
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Receive updates about your shipments and requests
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="form.emailNotifications"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-success-300 dark:peer-focus:ring-success-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-success-600"></div>
          </label>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              SMS Notifications
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Receive critical updates via SMS
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="form.smsNotifications"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-success-300 dark:peer-focus:ring-success-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-success-600"></div>
          </label>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              Marketing Communications
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Receive newsletters and promotional offers
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="form.marketingCommunications"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-success-300 dark:peer-focus:ring-success-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-success-600"></div>
          </label>
        </div>
      </div>
      
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn-primary"
        >
          Save Preferences
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { NotificationPreferences } from './settings.model'

interface Props {
  notificationPreferences: NotificationPreferences
}

interface Emits {
  (e: 'update', data: NotificationPreferences): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive<NotificationPreferences>({
  emailNotifications: props.notificationPreferences.emailNotifications,
  smsNotifications: props.notificationPreferences.smsNotifications,
  marketingCommunications: props.notificationPreferences.marketingCommunications
})

const handleSubmit = () => {
  emit('update', form)
}
</script> 