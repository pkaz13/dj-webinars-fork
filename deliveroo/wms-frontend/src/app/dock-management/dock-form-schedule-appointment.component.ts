import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dock } from './dock.model';
import { NotificationService } from '../notifications/notification.service';
import { LucideAngularModule, X, Calendar, Truck, User, Package, Clock, Save } from 'lucide-angular';

@Component({
  selector: 'app-dock-form-schedule-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <!-- Schedule Appointment Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-dark-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <lucide-icon [img]="CalendarIcon" size="20" class="mr-2"></lucide-icon>
              Schedule Dock Appointment
            </h3>
            <button (click)="onCancel()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <lucide-icon [img]="XIcon" size="24"></lucide-icon>
            </button>
          </div>

          <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="p-6">
            <div class="space-y-8">
              <!-- Dock Selection -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="PackageIcon" size="18" class="mr-2"></lucide-icon>
                  Dock Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="dockId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Select Dock *
                    </label>
                    <select id="dockId" formControlName="dockId" class="input">
                      <option value="">Choose a dock</option>
                      @for (dock of availableDocks(); track dock.id) {
                        <option [value]="dock.id">
                          {{ dock.name }} ({{ dock.type | titlecase }})
                        </option>
                      }
                    </select>
                    @if (appointmentForm.get('dockId')?.invalid && appointmentForm.get('dockId')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Please select a dock
                      </div>
                    }
                  </div>
                  <div>
                    <label for="appointmentType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Appointment Type *
                    </label>
                    <select id="appointmentType" formControlName="appointmentType" class="input">
                      <option value="">Select type</option>
                      <option value="receiving">Receiving</option>
                      <option value="shipping">Shipping</option>
                    </select>
                    @if (appointmentForm.get('appointmentType')?.invalid && appointmentForm.get('appointmentType')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Please select appointment type
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Schedule Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="ClockIcon" size="18" class="mr-2"></lucide-icon>
                  Schedule Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="scheduledDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Appointment Date *
                    </label>
                    <input type="date" 
                          id="scheduledDate"
                          formControlName="scheduledDate"
                          class="input"
                          [min]="getMinDate()">
                    @if (appointmentForm.get('scheduledDate')?.invalid && appointmentForm.get('scheduledDate')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Please select a valid date
                      </div>
                    }
                  </div>
                  <div>
                    <label for="estimatedDuration" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Estimated Duration (hours) *
                    </label>
                    <select id="estimatedDuration" formControlName="estimatedDuration" class="input">
                      <option value="">Select duration</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="6">6 hours</option>
                      <option value="8">8 hours</option>
                    </select>
                    @if (appointmentForm.get('estimatedDuration')?.invalid && appointmentForm.get('estimatedDuration')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Please select duration
                      </div>
                    }
                  </div>
                  <div>
                    <label for="scheduledStartTime" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Time *
                    </label>
                    <select id="scheduledStartTime" formControlName="scheduledStartTime" class="input">
                      <option value="">Select time</option>
                      <option value="06:00">06:00 AM</option>
                      <option value="07:00">07:00 AM</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                    @if (appointmentForm.get('scheduledStartTime')?.invalid && appointmentForm.get('scheduledStartTime')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Please select start time
                      </div>
                    }
                  </div>
                  <div>
                    <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Priority Level
                    </label>
                    <select id="priority" formControlName="priority" class="input">
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Carrier & Truck Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="TruckIcon" size="18" class="mr-2"></lucide-icon>
                  Carrier & Truck Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="carrierName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Carrier Company *
                    </label>
                    <input type="text" 
                          id="carrierName"
                          formControlName="carrierName"
                          class="input"
                          placeholder="Enter carrier company name">
                    @if (appointmentForm.get('carrierName')?.invalid && appointmentForm.get('carrierName')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Carrier name is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="carrierContact" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Carrier Contact Number *
                    </label>
                    <input type="tel" 
                          id="carrierContact"
                          formControlName="carrierContact"
                          class="input"
                          placeholder="+1-555-0123">
                    @if (appointmentForm.get('carrierContact')?.invalid && appointmentForm.get('carrierContact')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Contact number is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="truckLicensePlate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Truck License Plate *
                    </label>
                    <input type="text" 
                          id="truckLicensePlate"
                          formControlName="truckLicensePlate"
                          class="input"
                          placeholder="ABC-123"
                          style="text-transform: uppercase;">
                    @if (appointmentForm.get('truckLicensePlate')?.invalid && appointmentForm.get('truckLicensePlate')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        License plate is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="truckType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Truck Type *
                    </label>
                    <select id="truckType" formControlName="truckType" class="input">
                      <option value="">Select truck type</option>
                      <option value="semi-trailer">Semi-trailer</option>
                      <option value="box-truck">Box Truck</option>
                      <option value="flatbed">Flatbed</option>
                      <option value="refrigerated">Refrigerated Truck</option>
                      <option value="tanker">Tanker</option>
                      <option value="van">Delivery Van</option>
                    </select>
                    @if (appointmentForm.get('truckType')?.invalid && appointmentForm.get('truckType')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Please select truck type
                      </div>
                    }
                  </div>
                  <div>
                    <label for="truckCapacity" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Truck Capacity (tons)
                    </label>
                    <input type="number" 
                          id="truckCapacity"
                          formControlName="truckCapacity"
                          class="input"
                          placeholder="40"
                          min="1"
                          max="100">
                  </div>
                </div>
              </div>

              <!-- Driver Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="UserIcon" size="18" class="mr-2"></lucide-icon>
                  Driver Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="driverName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Driver Name *
                    </label>
                    <input type="text" 
                          id="driverName"
                          formControlName="driverName"
                          class="input"
                          placeholder="Enter driver's full name">
                    @if (appointmentForm.get('driverName')?.invalid && appointmentForm.get('driverName')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Driver name is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="driverPhone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Driver Phone *
                    </label>
                    <input type="tel" 
                          id="driverPhone"
                          formControlName="driverPhone"
                          class="input"
                          placeholder="+1-555-0123">
                    @if (appointmentForm.get('driverPhone')?.invalid && appointmentForm.get('driverPhone')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Driver phone is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="driverLicense" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Driver License Number
                    </label>
                    <input type="text" 
                          id="driverLicense"
                          formControlName="driverLicense"
                          class="input"
                          placeholder="DL123456789">
                  </div>
                </div>
              </div>

              <!-- Cargo Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Cargo Information</h4>
                <div class="space-y-4">
                  <div>
                    <label for="cargoDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cargo Description *
                    </label>
                    <textarea id="cargoDescription" 
                              formControlName="cargoDescription"
                              rows="3"
                              class="input"
                              placeholder="Describe the cargo being loaded/unloaded..."></textarea>
                    @if (appointmentForm.get('cargoDescription')?.invalid && appointmentForm.get('cargoDescription')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Cargo description is required
                      </div>
                    }
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label for="estimatedWeight" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estimated Weight (kg)
                      </label>
                      <input type="number" 
                            id="estimatedWeight"
                            formControlName="estimatedWeight"
                            class="input"
                            placeholder="1000"
                            min="1">
                    </div>
                    <div>
                      <label for="estimatedVolume" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estimated Volume (m³)
                      </label>
                      <input type="number" 
                            id="estimatedVolume"
                            formControlName="estimatedVolume"
                            class="input"
                            placeholder="50"
                            min="1"
                            step="0.1">
                    </div>
                    <div>
                      <label for="cargoValue" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estimated Value ($)
                      </label>
                      <input type="number" 
                            id="cargoValue"
                            formControlName="cargoValue"
                            class="input"
                            placeholder="10000"
                            min="0">
                    </div>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                      <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Special Requirements</label>
                      <div class="space-y-2">
                        <label class="flex items-center">
                          <input type="checkbox" 
                                formControlName="requiresRefrigeration"
                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                          <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires Refrigeration</span>
                        </label>
                        <label class="flex items-center">
                          <input type="checkbox" 
                                formControlName="isHazardous"
                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                          <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Hazardous Materials</span>
                        </label>
                        <label class="flex items-center">
                          <input type="checkbox" 
                                formControlName="requiresSpecialHandling"
                                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                          <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Special Handling Required</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Notes -->
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Notes
                </label>
                <textarea id="notes" 
                          formControlName="notes"
                          rows="3"
                          class="input"
                          placeholder="Any additional instructions or special requirements..."></textarea>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
              <button type="button" 
                      (click)="onCancel()"
                      class="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" 
                      [disabled]="appointmentForm.invalid || submitting"
                      class="btn btn-primary">
                <lucide-icon [img]="SaveIcon" size="18" class="mr-2"></lucide-icon>
                {{ submitting ? 'Scheduling...' : 'Schedule Appointment' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class DockFormScheduleAppointmentComponent {
  // Signal-based inputs
  showModal = input<boolean>(false);
  availableDocks = input<Dock[]>([]);

  // Outputs
  modalClosed = output<void>();
  appointmentScheduled = output<any>();

  appointmentForm: FormGroup;
  submitting = false;

  // Lucide icons
  XIcon = X;
  CalendarIcon = Calendar;
  TruckIcon = Truck;
  UserIcon = User;
  PackageIcon = Package;
  ClockIcon = Clock;
  SaveIcon = Save;

  private formBuilder = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  constructor() {
    this.appointmentForm = this.formBuilder.group({
      dockId: ['', Validators.required],
      appointmentType: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      scheduledStartTime: ['', Validators.required],
      estimatedDuration: ['', Validators.required],
      priority: ['normal'],
      carrierName: ['', Validators.required],
      carrierContact: ['', Validators.required],
      truckLicensePlate: ['', Validators.required],
      truckType: ['', Validators.required],
      truckCapacity: [''],
      driverName: ['', Validators.required],
      driverPhone: ['', Validators.required],
      driverLicense: [''],
      cargoDescription: ['', Validators.required],
      estimatedWeight: [''],
      estimatedVolume: [''],
      cargoValue: [''],
      requiresRefrigeration: [false],
      isHazardous: [false],
      requiresSpecialHandling: [false],
      notes: ['']
    });
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onCancel(): void {
    this.appointmentForm.reset();
    this.modalClosed.emit();
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const formData = this.appointmentForm.value;

    // Simulate API call
    setTimeout(() => {
      const appointmentData = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...formData,
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.appointmentScheduled.emit(appointmentData);
      
      this.notificationService.showSuccess(
        'Appointment Scheduled',
        `Dock appointment for ${formData.carrierName} has been successfully scheduled for ${formData.scheduledDate}.`
      );

      this.appointmentForm.reset();
      this.submitting = false;
      this.modalClosed.emit();
    }, 1500);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.appointmentForm.controls).forEach(key => {
      const control = this.appointmentForm.get(key);
      control?.markAsTouched();
    });
  }
}