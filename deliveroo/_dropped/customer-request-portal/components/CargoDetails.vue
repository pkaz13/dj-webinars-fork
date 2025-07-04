<template>
  <div class="cargo-details">
    <h2>Cargo Details</h2>
    <p class="form-instruction">Please provide details about the cargo you wish to store.</p>

    <form @submit.prevent="handleNext">
      <div class="form-group">
        <label for="description" class="form-label">Cargo Description</label>
        <div class="cargo-input-wrapper">
          <div class="cargo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="8" x2="8" y2="8"></line>
              <line x1="16" y1="16" x2="8" y2="16"></line>
              <line x1="12" y1="3" x2="12" y2="21"></line>
            </svg>
          </div>
          <textarea
            id="description"
            class="form-textarea cargo-textarea"
            placeholder="Type, size, special requirements, etc."
            v-model="description"
            required
          ></textarea>
        </div>
        <p v-if="errors.description" class="error-message">{{ errors.description }}</p>
      </div>

      <div class="form-group">
        <label for="duration" class="form-label">Storage Duration</label>
        <select 
          id="duration" 
          class="form-select" 
          v-model="duration"
          required
        >
          <option value="1 month">1 month</option>
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
          <option value="12 months">12 months</option>
        </select>
      </div>

      <div class="form-group">
        <label for="warehouse" class="form-label">Warehouse</label>
        <select 
          id="warehouse" 
          class="form-select" 
          v-model="warehouse"
          required
        >
          <option value="Warehouse A">Warehouse A - Downtown</option>
          <option value="Warehouse B">Warehouse B - Industrial Zone</option>
          <option value="Warehouse C">Warehouse C - Harbor Area</option>
        </select>
      </div>

      <div class="form-actions">
        <div></div> <!-- Empty div for spacing -->
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
const description = computed({
  get: () => store.formData.cargo.description,
  set: (value: string) => store.updateCargoData('description', value)
})

const duration = computed({
  get: () => store.formData.cargo.duration,
  set: (value: string) => store.updateCargoData('duration', value)
})

const warehouse = computed({
  get: () => store.formData.cargo.warehouse,
  set: (value: string) => store.updateCargoData('warehouse', value)
})

// Form validation
const errors = ref({
  description: ''
})

function validateForm() {
  let valid = true
  errors.value.description = ''
  
  if (!description.value.trim()) {
    errors.value.description = 'Cargo description is required'
    valid = false
  } else if (description.value.trim().length < 10) {
    errors.value.description = 'Please provide a more detailed description (at least 10 characters)'
    valid = false
  }
  
  return valid
}

function handleNext() {
  if (validateForm()) {
    store.nextStep()
  }
}
</script>

<style scoped>
.cargo-details {
  animation: fadeIn 0.3s ease-out;
}

.form-instruction {
  margin-bottom: 1.5rem;
  color: var(--color-text-light);
}

.cargo-input-wrapper {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.cargo-icon {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  color: var(--color-text-light);
}

.cargo-textarea {
  flex: 1;
  border: none;
  border-left: 1px solid var(--color-border);
}

.cargo-textarea:focus {
  outline: none;
}

.next-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>