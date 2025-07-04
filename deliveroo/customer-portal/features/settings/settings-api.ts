import type { CompanyInfo, ContactInfo, NotificationPreferences, PasswordChangeData } from './settings.model'
import { mockCompanyInfo, mockContactInfo, mockNotificationPreferences } from './settings.mocks'

export async function getCompanyInfo(): Promise<CompanyInfo> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockCompanyInfo
}

export async function updateCompanyInfo(data: CompanyInfo): Promise<CompanyInfo> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Company information updated:', data)
  return data
}

export async function getContactInfo(): Promise<ContactInfo> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockContactInfo
}

export async function updateContactInfo(data: ContactInfo): Promise<ContactInfo> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Contact information updated:', data)
  return data
}

export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockNotificationPreferences
}

export async function updateNotificationPreferences(data: NotificationPreferences): Promise<NotificationPreferences> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Notification preferences updated:', data)
  return data
}

export async function changePassword(data: PasswordChangeData): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (data.newPassword !== data.confirmPassword) {
    throw new Error('New passwords do not match')
  }
  
  console.log('Password changed successfully')
}

export async function enable2FA(): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('2FA enabled successfully')
} 