<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Manage your account and company settings
      </p>
    </div>

    <!-- Tab Navigation -->
    <Tabs :tabs="tabs" default-tab="company" @tab-change="handleTabChange">
      <template #company>
        <CompanyInformationTab
          :company-info="companyInfo"
          @update-company-info="handleCompanyInfoUpdate"
        />
      </template>

      <template #contact>
        <ContactInformationTab
          :contact-info="contactInfo"
          @update-contact-info="handleContactInfoUpdate"
        />
      </template>

      <template #notifications>
        <NotificationPreferencesTab
          :notification-preferences="notificationPreferences"
          @update-notification-preferences="handleNotificationPreferencesUpdate"
        />
      </template>

      <template #security>
        <SecuritySettingsTab
          @change-password="handlePasswordChange"
          @enable-2fa="handle2FAEnable"
        />
      </template>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingOfficeIcon,
  PhoneIcon,
  BellIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
import Tabs from '~/components/ui-library/tabs/Tabs.vue'
import type { Tab } from '~/components/ui-library/tabs/Tabs.vue'
import CompanyInformationTab from './CompanyInformationTab.vue'
import ContactInformationTab from './ContactInformationTab.vue'
import NotificationPreferencesTab from './NotificationPreferencesTab.vue'
import SecuritySettingsTab from './SecuritySettingsTab.vue'
import { 
  getCompanyInfo, 
  updateCompanyInfo, 
  getContactInfo, 
  updateContactInfo, 
  getNotificationPreferences, 
  updateNotificationPreferences, 
  changePassword, 
  enable2FA 
} from './settings-api'
import type { CompanyInfo, ContactInfo, NotificationPreferences, PasswordChangeData } from './settings.model'
import { mockCompanyInfo, mockContactInfo, mockNotificationPreferences } from './settings.mocks'

const tabs: Tab[] = [
  { id: 'company', name: 'Company Information', icon: BuildingOfficeIcon },
  { id: 'contact', name: 'Contact Information', icon: PhoneIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon }
]

// Reactive state for each tab
const companyInfo = ref<CompanyInfo>({ ...mockCompanyInfo })
const contactInfo = ref<ContactInfo>({ ...mockContactInfo })
const notificationPreferences = ref<NotificationPreferences>({ ...mockNotificationPreferences })

// Event handlers
const handleTabChange = (tabId: string) => {
  console.log('Tab changed to:', tabId)
}

const handleCompanyInfoUpdate = async (data: CompanyInfo) => {
  try {
    const updatedData = await updateCompanyInfo(data)
    companyInfo.value = updatedData
  } catch (error) {
    console.error('Failed to update company information:', error)
  }
}

const handleContactInfoUpdate = async (data: ContactInfo) => {
  try {
    const updatedData = await updateContactInfo(data)
    contactInfo.value = updatedData
  } catch (error) {
    console.error('Failed to update contact information:', error)
  }
}

const handleNotificationPreferencesUpdate = async (data: NotificationPreferences) => {
  try {
    const updatedData = await updateNotificationPreferences(data)
    notificationPreferences.value = updatedData
  } catch (error) {
    console.error('Failed to update notification preferences:', error)
  }
}

const handlePasswordChange = async (data: PasswordChangeData) => {
  try {
    await changePassword(data)
    console.log('Password changed successfully')
  } catch (error) {
    console.error('Failed to change password:', error)
  }
}

const handle2FAEnable = async () => {
  try {
    await enable2FA()
    console.log('2FA enabled successfully')
  } catch (error) {
    console.error('Failed to enable 2FA:', error)
  }
}

// Initialize data on component mount
onMounted(async () => {
  try {
    const results = await Promise.all([
      getCompanyInfo(),
      getContactInfo(),
      getNotificationPreferences()
    ])
    
    companyInfo.value = results[0]
    contactInfo.value = results[1]
    notificationPreferences.value = results[2]
  } catch (error) {
    console.error('Failed to load settings data:', error)
  }
})
</script>
