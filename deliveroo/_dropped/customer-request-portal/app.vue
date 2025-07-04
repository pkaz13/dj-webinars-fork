<template>
  <div class="container">
    <div class="card main-card">
      <div class="card-body slide-up">
        <h1>Customer Storage Request</h1>
        
        <!-- Progress Stepper -->
        <div class="stepper">
          <div 
            v-for="step in 3" 
            :key="step"
            :class="['stepper-step', { 
              'active': currentStep === step,
              'completed': currentStep > step 
            }]"
            @click="goToStep(step)"
          >
            <div class="step-circle">{{ step }}</div>
            <div class="step-name">{{ stepNames[step - 1] }}</div>
          </div>
          <div class="stepper-line"></div>
        </div>

        <!-- Form Steps Container -->
        <div class="form-container fade-in">
          <CargoDetails v-if="currentStep === 1" />
          <CustomerInfo v-if="currentStep === 2" />
          <ReviewConfirm v-if="currentStep === 3" />
          <SubmissionComplete v-if="requestSubmitted" />
        </div>
      </div>
    </div>
    <div class="form-footer">
      <img src="/deliveroo-transparent-dark-foreground.png" alt="Deliveroo Logo" class="logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '~/store';
import '~/assets/style.css';
import CargoDetails from './components/CargoDetails.vue';
import CustomerInfo from './components/CustomerInfo.vue';
import ReviewConfirm from './components/ReviewConfirm.vue';
import SubmissionComplete from './components/SubmissionComplete.vue';

const store = useAppStore();

const stepNames = ['Cargo Details', 'Customer Info', 'Review & Submit'];
const currentStep = computed(() => store.currentStep);
const requestSubmitted = computed(() => store.requestSubmitted);

function goToStep(step: number) {
  if (
    step < currentStep.value ||
    (step === currentStep.value + 1 && store.isStepComplete(currentStep.value))
  ) {
    store.goToStep(step);
  }
}
</script>

<style scoped>
.main-card {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
}

.stepper {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 3rem;
}

.stepper-line {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-border);
  z-index: 1;
}

.stepper-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 33.333%;
  cursor: pointer;
}

.step-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--color-border);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-text-light);
  transition: all 0.3s ease;
}

.step-name {
  font-size: 0.875rem;
  color: var(--color-text-light);
  transition: all 0.3s ease;
}

.stepper-step.active .step-circle {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.stepper-step.active .step-name {
  color: var(--color-primary);
  font-weight: 500;
}

.stepper-step.completed .step-circle {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
  color: white;
}

.form-container {
  min-height: 400px;
}

@media (max-width: 640px) {
  .stepper-step .step-name {
    font-size: 0.75rem;
  }
}

.form-footer {
  text-align: center;
  margin-top: 1.2rem;
}
.logo {
  max-width: 180px;
  margin-bottom: 0.3rem;
  filter: drop-shadow(0 2px 8px rgba(44, 62, 80, 0.10));
}
.tagline {
  color: #fbb040;
  font-weight: 600;
  margin-top: 0.1rem;
  letter-spacing: 0.12em;
  font-size: 1.1rem;
  text-shadow: 0 1px 4px rgba(251, 176, 64, 0.08);
  margin-bottom: 0.2rem;
}
</style>