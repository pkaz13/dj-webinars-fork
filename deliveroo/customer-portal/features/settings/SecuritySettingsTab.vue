<template>
  <div class="card p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
      Security Settings
    </h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Change Password
        </h3>
        <form @submit.prevent="handlePasswordChange" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              required
              class="input"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              required
              class="input"
            />
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              class="btn-primary"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Two-Factor Authentication
        </h3>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Add an extra layer of security to your account
            </p>
          </div>
          <button @click="handleEnable2FA" class="btn-outline">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PasswordChangeData } from './settings.model'

interface Emits {
  (e: 'passwordChange', data: PasswordChangeData): void
  (e: 'enable2FA'): void
}

const emit = defineEmits<Emits>()

const passwordForm = reactive<PasswordChangeData>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handlePasswordChange = () => {
  emit('passwordChange', passwordForm)
  // Reset form after successful submission
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

const handleEnable2FA = () => {
  emit('enable2FA')
}
</script> 