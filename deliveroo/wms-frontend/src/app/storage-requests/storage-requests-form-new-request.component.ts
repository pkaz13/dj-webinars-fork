import { Component, input, output, inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notifications/notification.service';
import { LucideAngularModule, X, Package, User, Calendar, DollarSign, AlertTriangle, Save } from 'lucide-angular';

@Component({
  selector: 'app-storage-requests-form-new-request',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <!-- New Storage Request Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-dark-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <lucide-icon [img]="PackageIcon" size="20" class="mr-2"></lucide-icon>
              New Storage Request
            </h3>
            <button (click)="onCancel()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <lucide-icon [img]="XIcon" size="24"></lucide-icon>
            </button>
          </div>

          <form [formGroup]="requestForm" (ngSubmit)="onSubmit()" class="p-6">
            <div class="space-y-8">
              <!-- Customer Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="UserIcon" size="18" class="mr-2"></lucide-icon>
                  Customer Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="customerName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Customer Name *
                    </label>
                    <input type="text"
                           id="customerName"
                           formControlName="customerName"
                           class="input"
                           placeholder="Enter customer name">
                    @if (requestForm.get('customerName')?.invalid && requestForm.get('customerName')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Customer name is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="customerId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Customer ID *
                    </label>
                    <input type="number"
                           id="customerId"
                           formControlName="customerId"
                           class="input"
                           placeholder="Enter customer ID"
                           min="1">
                    @if (requestForm.get('customerId')?.invalid && requestForm.get('customerId')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Valid customer ID is required
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Storage Period -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="CalendarIcon" size="18" class="mr-2"></lucide-icon>
                  Storage Period
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="requestedEntryDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Requested Entry Date *
                    </label>
                    <input type="date"
                           id="requestedEntryDate"
                           formControlName="requestedEntryDate"
                           class="input"
                           [min]="getMinDate()">
                    @if (requestForm.get('requestedEntryDate')?.invalid && requestForm.get('requestedEntryDate')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Entry date is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="requestedExitDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Requested Exit Date *
                    </label>
                    <input type="date"
                           id="requestedExitDate"
                           formControlName="requestedExitDate"
                           class="input"
                           [min]="getMinExitDate()">
                    @if (requestForm.get('requestedExitDate')?.invalid && requestForm.get('requestedExitDate')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Exit date is required and must be after entry date
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Cargo Details -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="PackageIcon" size="18" class="mr-2"></lucide-icon>
                  Cargo Details
                </h4>
                <div class="space-y-4">
                  <div>
                    <label for="cargoDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cargo Description *
                    </label>
                    <textarea id="cargoDescription"
                              formControlName="cargoDescription"
                              rows="3"
                              class="input"
                              placeholder="Describe the cargo to be stored..."></textarea>
                    @if (requestForm.get('cargoDescription')?.invalid && requestForm.get('cargoDescription')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Cargo description is required
                      </div>
                    }
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="cargoWeight" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight (kg) *
                      </label>
                      <input type="number"
                             id="cargoWeight"
                             formControlName="cargoWeight"
                             class="input"
                             placeholder="1000"
                             min="1"
                             step="0.1">
                      @if (requestForm.get('cargoWeight')?.invalid && requestForm.get('cargoWeight')?.touched) {
                        <div class="mt-1 text-sm text-error-600">
                          Valid weight is required
                        </div>
                      }
                    </div>
                    <div>
                      <label for="cargoVolume" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Volume (m³) *
                      </label>
                      <input type="number"
                             id="cargoVolume"
                             formControlName="cargoVolume"
                             class="input"
                             placeholder="50"
                             min="1"
                             step="0.1">
                      @if (requestForm.get('cargoVolume')?.invalid && requestForm.get('cargoVolume')?.touched) {
                        <div class="mt-1 text-sm text-error-600">
                          Valid volume is required
                        </div>
                      }
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="estimatedValue" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estimated Value ($)
                      </label>
                      <input type="number"
                             id="estimatedValue"
                             formControlName="estimatedValue"
                             class="input"
                             placeholder="10000"
                             min="0">
                    </div>
                    <div>
                      <label for="currency" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Currency
                      </label>
                      <select id="currency" formControlName="currency" class="input">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CAD">CAD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Special Requirements -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="AlertTriangleIcon" size="18" class="mr-2"></lucide-icon>
                  Special Requirements
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-3">
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="requiresRefrigeration"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires Refrigeration (2°C - 8°C)</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="requiresFreezing"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires Freezing (-18°C or below)</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="isHazardous"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Contains Hazardous Materials</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="containsPerishables"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Contains Perishable Goods</span>
                    </label>
                  </div>

                  <div class="space-y-4">
                    @if (requestForm.get('isHazardous')?.value) {
                      <div>
                        <label for="hazardousClassification" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Hazardous Classification
                        </label>
                        <select id="hazardousClassification" formControlName="hazardousClassification" class="input">
                          <option value="">Select classification</option>
                          <option value="Class 1">Class 1 - Explosives</option>
                          <option value="Class 2">Class 2 - Gases</option>
                          <option value="Class 3">Class 3 - Flammable Liquids</option>
                          <option value="Class 4">Class 4 - Flammable Solids</option>
                          <option value="Class 5">Class 5 - Oxidizing Substances</option>
                          <option value="Class 6">Class 6 - Toxic Substances</option>
                          <option value="Class 7">Class 7 - Radioactive Materials</option>
                          <option value="Class 8">Class 8 - Corrosive Substances</option>
                          <option value="Class 9">Class 9 - Miscellaneous</option>
                        </select>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Special Handling Instructions -->
              <div>
                <label for="specialHandlingInstructions" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Handling Instructions
                </label>
                <textarea id="specialHandlingInstructions"
                          formControlName="specialHandlingInstructions"
                          rows="3"
                          class="input"
                          placeholder="e.g., Fragile, keep upright, etc."></textarea>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end pt-8 space-x-4">
              <button (click)="onCancel()" type="button" class="btn btn-secondary">
                Cancel
              </button>
              <button [disabled]="requestForm.invalid || submitting"
                      type="submit"
                      class="btn btn-primary">
                <lucide-icon [img]="SaveIcon" size="18" class="mr-2"></lucide-icon>
                {{ submitting ? 'Submitting...' : 'Submit Request' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class StorageRequestsFormNewRequestComponent {
  // Signal-based input
  showModal = input<boolean>(false);

  // Outputs
  modalClosed = output<void>();
  requestSubmitted = output<any>();

  requestForm: FormGroup;
  submitting = false;

  // Lucide icons
  XIcon = X;
  PackageIcon = Package;
  UserIcon = User;
  CalendarIcon = Calendar;
  DollarSignIcon = DollarSign;
  AlertTriangleIcon = AlertTriangle;
  SaveIcon = Save;

  private formBuilder = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  constructor() {
    this.requestForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerId: ['', [Validators.required, Validators.min(1)]],
      requestedEntryDate: ['', Validators.required],
      requestedExitDate: ['', Validators.required],
      cargoDescription: ['', Validators.required],
      cargoWeight: ['', [Validators.required, Validators.min(1)]],
      cargoVolume: ['', [Validators.required, Validators.min(1)]],
      estimatedValue: [''],
      currency: ['USD'],
      requiresRefrigeration: [false],
      requiresFreezing: [false],
      isHazardous: [false],
      containsPerishables: [false],
      hazardousClassification: [''],
      specialHandlingInstructions: ['']
    });

    // Add custom validator for exit date
    this.requestForm.get('requestedExitDate')?.addValidators(this.exitDateValidator.bind(this));
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getMinExitDate(): string {
    const entryDate = this.requestForm.get('requestedEntryDate')?.value;
    if (entryDate) {
      const nextDay = new Date(entryDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split('T')[0];
    }
    return this.getMinDate();
  }

  exitDateValidator(control: any) {
    const entryDate = this.requestForm?.get('requestedEntryDate')?.value;
    const exitDate = control.value;
    
    if (entryDate && exitDate && new Date(exitDate) <= new Date(entryDate)) {
      return { exitDateInvalid: true };
    }
    return null;
  }

  onCancel(): void {
    this.requestForm.reset({
      currency: 'USD',
      requiresRefrigeration: false,
      requiresFreezing: false,
      isHazardous: false,
      containsPerishables: false
    });
    this.modalClosed.emit();
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const formData = this.requestForm.value;

    // Simulate API call
    setTimeout(() => {
      try {
        const requestData = {
          id: Math.floor(Math.random() * 1000) + 1,
          customerId: formData.customerId,
          customerName: formData.customerName,
          warehouseId: 1, // Default warehouse
          requestedEntryDate: new Date(formData.requestedEntryDate),
          requestedExitDate: new Date(formData.requestedExitDate),
          status: 'pending',
          cargoDetails: {
            description: formData.cargoDescription,
            weight: formData.cargoWeight,
            volume: formData.cargoVolume,
            requiresRefrigeration: formData.requiresRefrigeration,
            requiresFreezing: formData.requiresFreezing,
            isHazardous: formData.isHazardous,
            hazardousClassification: formData.hazardousClassification,
            specialHandlingInstructions: formData.specialHandlingInstructions,
            containsPerishables: formData.containsPerishables,
            estimatedValue: formData.estimatedValue,
            currency: formData.currency
          },
          reservations: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.requestSubmitted.emit(requestData);
        
        this.notificationService.showSuccess(
          'Storage Request Submitted',
          `Storage request for ${formData.customerName} has been successfully submitted and is pending approval.`
        );

        this.requestForm.reset({
          currency: 'USD',
          requiresRefrigeration: false,
          requiresFreezing: false,
          isHazardous: false,
          containsPerishables: false
        });
        this.submitting = false;
        this.modalClosed.emit();
      } catch (error) {
        this.notificationService.showError(
          'Submission Failed',
          'There was an error submitting the storage request. Please try again.'
        );
        this.submitting = false;
      }
    }, 1500);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.requestForm.controls).forEach(key => {
      const control = this.requestForm.get(key);
      control?.markAsTouched();
    });
  }
}