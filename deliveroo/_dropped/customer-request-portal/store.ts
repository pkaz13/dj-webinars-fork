import { defineStore } from 'pinia';
import { postStorageRequest } from './shared/http/storagerequest.http';

export const useAppStore = defineStore('app', {
  state: () => ({
    currentStep: 1,
    formData: {
      cargo: {
        description: '',
        duration: '6 months',
        warehouse: 'Warehouse A',
      },
      customer: {
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
      },
      termsAccepted: false,
    },
    requestSubmitted: false,
    referenceNumber: '',
  }),
  actions: {
    setCurrentStep(step: number) {
      this.currentStep = step;
    },
    updateCargoData(field: string, value: string) {
      this.formData.cargo[field as keyof typeof this.formData.cargo] = value;
    },
    updateCustomerData(field: string, value: string) {
      this.formData.customer[field as keyof typeof this.formData.customer] = value;
    },
    setTermsAccepted(value: boolean) {
      this.formData.termsAccepted = value;
    },
    async submitRequest() {
      const response = await postStorageRequest(this.formData);
      this.requestSubmitted = true;
      this.referenceNumber = response.referenceNumber;
    },
    resetForm() {
      this.currentStep = 1;
      this.formData = {
        cargo: {
          description: '',
          duration: '6 months',
          warehouse: 'Warehouse A',
        },
        customer: {
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
        },
        termsAccepted: false,
      };
      this.requestSubmitted = false;
      this.referenceNumber = '';
    },
    nextStep() {
      if (this.currentStep < 3) {
        this.setCurrentStep(this.currentStep + 1);
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.setCurrentStep(this.currentStep - 1);
      }
    },
    goToStep(step: number) {
      this.setCurrentStep(step);
    },
    submitForm() {
      this.submitRequest();
    },
  },
  getters: {
    isStepComplete: (state) => (step: number) => {
      if (step === 1) {
        return !!state.formData.cargo.description &&
          !!state.formData.cargo.duration &&
          !!state.formData.cargo.warehouse;
      } else if (step === 2) {
        return !!state.formData.customer.companyName &&
          !!state.formData.customer.contactPerson &&
          !!state.formData.customer.email &&
          !!state.formData.customer.phone;
      } else if (step === 3) {
        return state.formData.termsAccepted;
      }
      return false;
    },
    canProceedToNextStep: (state) => {
      return (state as any).isStepComplete((state as any).currentStep);
    },
  },
});