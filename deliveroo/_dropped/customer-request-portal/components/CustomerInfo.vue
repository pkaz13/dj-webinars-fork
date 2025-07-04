<template>
  <div class="customer-info">
    <h2>Customer Information</h2>
    <p class="form-instruction">Enter your company and contact details for communication and invoicing.</p>

    <form @submit.prevent="handleNext">
      <div class="form-group">
        <label for="companyName" class="form-label">Company Name</label>
        <div class="icon-input-wrapper">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </span>
          <input 
            type="text" 
            id="companyName" 
            v-model="companyName" 
            placeholder="Your company name" 
            required 
          />
        </div>
        <p v-if="errors.companyName" class="error-message">{{ errors.companyName }}</p>
      </div>

      <div class="form-group">
        <label for="contactPerson" class="form-label">Contact Person</label>
        <div class="icon-input-wrapper">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <input 
            type="text" 
            id="contactPerson" 
            v-model="contactPerson" 
            placeholder="Full name" 
            required 
          />
        </div>
        <p v-if="errors.contactPerson" class="error-message">{{ errors.contactPerson }}</p>
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email Address</label>
        <div class="icon-input-wrapper">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </span>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="example@company.com" 
            required 
          />
        </div>
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="phone" class="form-label">Phone Number</label>
        <div class="icon-input-wrapper">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </span>
          <input 
            type="tel" 
            id="phone" 
            v-model="phone" 
            placeholder="+1 (555) 123-4567" 
            required 
          />
        </div>
        <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-outline" @click="handleBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
          Back
        </button>
        <button type="submit" class="btn btn-primary next-button">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '~/store'

const store = useAppStore()

// Form fields with initial values from store
const companyName = computed({
  get: () => store.formData.customer.companyName,
  set: (value: string) => store.updateCustomerData('companyName', value)
})

const contactPerson = computed({
  get: () => store.formData.customer.contactPerson,
  set: (value: string) => store.updateCustomerData('contactPerson', value)
})

const email = computed({
  get: () => store.formData.customer.email,
  set: (value: string) => store.updateCustomerData('email', value)
})

const phone = computed({
  get: () => store.formData.customer.phone,
  set: (value: string) => store.updateCustomerData('phone', value)
})

// Form validation
const errors = ref({
  companyName: '',
  contactPerson: '',
  email: '',
  phone: ''
})

function validateForm() {
  let valid = true
  errors.value = {
    companyName: '',
    contactPerson: '',
    email: '',
    phone: ''
  }
  
  if (!companyName.value.trim()) {
    errors.value.companyName = 'Company name is required'
    valid = false
  }
  
  if (!contactPerson.value.trim()) {
    errors.value.contactPerson = 'Contact person is required'
    valid = false
  }
  
  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!validateEmail(email.value)) {
    errors.value.email = 'Please enter a valid email address'
    valid = false
  }
  
  if (!phone.value.trim()) {
    errors.value.phone = 'Phone number is required'
    valid = false
  }
  
  return valid
}

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function handleNext() {
  if (validateForm()) {
    store.nextStep()
  }
}

function handleBack() {
  store.prevStep()
}
</script>

<style scoped>
.customer-info {
  animation: fadeIn 0.3s ease-out;
}

.form-instruction {
  margin-bottom: 1.5rem;
  color: var(--color-text-light);
}

.next-button, .btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>