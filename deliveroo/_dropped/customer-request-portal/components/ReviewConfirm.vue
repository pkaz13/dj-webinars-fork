<template>
  <div class="review-confirm">
    <h2>Review & Confirm</h2>
    <p class="form-instruction">Please review your request. Confirm all details are correct before submitting.</p>

    <div class="summary-sections">
      <!-- Cargo Details Section -->
      <div class="summary-section">
        <div class="summary-header">
          <h3>Cargo Details</h3>
          <button class="edit-button" @click="editSection(1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Edit
          </button>
        </div>
        <div class="summary-content">
          <div class="summary-item">
            <span class="summary-label">Description:</span>
            <span class="summary-value">{{ formData.cargo.description }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Duration:</span>
            <span class="summary-value">{{ formData.cargo.duration }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Warehouse:</span>
            <span class="summary-value">{{ formData.cargo.warehouse }}</span>
          </div>
        </div>
      </div>

      <!-- Customer Information Section -->
      <div class="summary-section">
        <div class="summary-header">
          <h3>Customer Information</h3>
          <button class="edit-button" @click="editSection(2)">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Edit
          </button>
        </div>
        <div class="summary-content">
          <div class="summary-item">
            <span class="summary-label">Company:</span>
            <span class="summary-value">{{ formData.customer.companyName }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Contact:</span>
            <span class="summary-value">{{ formData.customer.contactPerson }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Email:</span>
            <span class="summary-value">{{ formData.customer.email }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Phone:</span>
            <span class="summary-value">{{ formData.customer.phone }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="form-checkbox terms-checkbox">
      <input type="checkbox" id="terms" v-model="termsAccepted" />
      <label for="terms">
        I agree to the <a href="#" @click.prevent="showTerms">Terms and Conditions</a> for warehouse storage services.
      </label>
    </div>
    <p v-if="errors.terms" class="error-message">{{ errors.terms }}</p>

    <div class="form-actions">
      <button type="button" class="btn btn-outline" @click="handleBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"></path>
        </svg>
        Back
      </button>
      <button 
        type="button" 
        class="btn btn-secondary submit-button"
        @click="handleSubmit"
      >
        Submit Request
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '~/store';

const store = useAppStore();
const formData = computed(() => store.formData);

const termsAccepted = computed({
  get: () => store.formData.termsAccepted,
  set: (value: boolean) => store.setTermsAccepted(value)
});

const errors = ref({
  terms: ''
});

function validateForm() {
  let valid = true;
  errors.value.terms = '';
  
  if (!termsAccepted.value) {
    errors.value.terms = 'You must accept the terms and conditions to proceed';
    valid = false;
  }
  
  return valid;
}

function handleSubmit() {
  if (validateForm()) {
    store.submitForm();
  }
}

function handleBack() {
  store.prevStep();
}

function editSection(step: number) {
  store.goToStep(step);
}

function showTerms() {
  alert("Terms and Conditions would open in a modal in a real application.");
}
</script>

<style scoped>
.review-confirm {
  animation: fadeIn 0.3s ease-out;
}

.form-instruction {
  margin-bottom: 1.5rem;
  color: var(--color-text-light);
}

.summary-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-section {
  background-color: #f9fafb;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f3f4f6;
  border-bottom: 1px solid var(--color-border);
}

.summary-header h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--color-primary);
}

.edit-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

.edit-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.summary-content {
  padding: 1rem;
}

.summary-item {
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-label {
  font-weight: 500;
  width: 100px;
  flex-shrink: 0;
  color: var(--color-text-light);
}

.summary-value {
  flex: 1;
  color: var(--color-text);
}

.terms-checkbox {
  margin-bottom: 1.5rem;
}

.terms-checkbox label {
  font-size: 0.9375rem;
}

.terms-checkbox a {
  color: var(--color-primary);
  text-decoration: underline;
}

.submit-button, .btn-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .summary-item {
    flex-direction: column;
  }
  
  .summary-label {
    width: 100%;
    margin-bottom: 0.25rem;
  }
}
</style>