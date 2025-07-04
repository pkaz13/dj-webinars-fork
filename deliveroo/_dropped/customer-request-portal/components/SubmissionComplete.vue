<template>
  <div class="submission-complete">
    <div class="success-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>
    
    <h2>Request Submitted Successfully</h2>
    
    <div class="reference-number">
      <p>Reference Number:</p>
      <div class="reference-box">{{ referenceNumber }}</div>
    </div>
    
    <p class="response-time">
      Our team will review your request and contact you within 2 business days.
    </p>
    
    <div class="next-steps">
      <h3>What's Next?</h3>
      <ul>
        <li>You'll receive a confirmation email shortly</li>
        <li>Our team will assess your storage requirements</li>
        <li>We'll contact you to finalize details and pricing</li>
      </ul>
    </div>
    
    <div class="contact-support">
      <h3>Need Help?</h3>
      <p>
        If you have any questions, please contact our support team:
      </p>
      <div class="contact-methods">
        <a href="mailto:storage@example.com" class="contact-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          storage@example.com
        </a>
        <a href="tel:+15551234567" class="contact-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          +1 (555) 123-4567
        </a>
      </div>
    </div>
    
    <button class="btn btn-primary start-new" @click="startNew">Start New Request</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '~/store'

const store = useAppStore()
const referenceNumber = computed(() => store.referenceNumber)

function startNew() {
  store.resetForm()
}
</script>

<style scoped>
.submission-complete {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.success-icon {
  color: var(--color-success);
  margin-bottom: 1.5rem;
  animation: scaleIn 0.5s ease-out;
}

.reference-number {
  margin: 1.5rem 0;
}

.reference-box {
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  background-color: #f3f4f6;
  border-radius: var(--radius-md);
  color: var(--color-primary);
  margin-top: 0.5rem;
  letter-spacing: 1px;
}

.response-time {
  color: var(--color-text-light);
  margin-bottom: 2rem;
}

.next-steps, .contact-support {
  text-align: left;
  width: 100%;
  margin-bottom: 2rem;
}

.next-steps h3, .contact-support h3 {
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  color: var(--color-primary);
}

.next-steps ul {
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.next-steps li {
  margin-bottom: 0.5rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.contact-link:hover {
  text-decoration: underline;
}

.start-new {
  margin-top: 1rem;
}

@keyframes scaleIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>