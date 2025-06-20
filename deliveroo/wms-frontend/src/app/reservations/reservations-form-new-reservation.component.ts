import { Component, input, output, inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notifications/notification.service';
import { LucideAngularModule, X, Calendar, MapPin, User, Package, DollarSign, Save } from 'lucide-angular';

@Component({
  selector: 'app-reservations-form-new-reservation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <!-- New Reservation Modal -->
    @if (showModal()) {
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-dark-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
              <lucide-icon [img]="CalendarIcon" size="20" class="mr-2"></lucide-icon>
              New Reservation
            </h3>
            <button (click)="onCancel()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <lucide-icon [img]="XIcon" size="24"></lucide-icon>
            </button>
          </div>

          <form [formGroup]="reservationForm" (ngSubmit)="onSubmit()" class="p-6">
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
                    @if (reservationForm.get('customerName')?.invalid && reservationForm.get('customerName')?.touched) {
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
                    @if (reservationForm.get('customerId')?.invalid && reservationForm.get('customerId')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Valid customer ID is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="storageRequestId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Storage Request ID
                    </label>
                    <input type="number"
                           id="storageRequestId"
                           formControlName="storageRequestId"
                           class="input"
                           placeholder="Related storage request ID"
                           min="1">
                  </div>
                </div>
              </div>

              <!-- Location Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="MapPinIcon" size="18" class="mr-2"></lucide-icon>
                  Storage Location
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label for="zone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Zone *
                    </label>
                    <select id="zone" formControlName="zone" class="input">
                      <option value="">Select zone</option>
                      <option value="Zone A">Zone A - Standard</option>
                      <option value="Zone B">Zone B - Refrigerated</option>
                      <option value="Zone C">Zone C - Frozen</option>
                      <option value="Zone D">Zone D - Hazardous</option>
                      <option value="Zone E">Zone E - Secure</option>
                    </select>
                    @if (reservationForm.get('zone')?.invalid && reservationForm.get('zone')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Zone selection is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="aisle" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Aisle *
                    </label>
                    <select id="aisle" formControlName="aisle" class="input">
                      <option value="">Select aisle</option>
                      <option value="Aisle 1">Aisle 1</option>
                      <option value="Aisle 2">Aisle 2</option>
                      <option value="Aisle 3">Aisle 3</option>
                      <option value="Aisle 4">Aisle 4</option>
                      <option value="Aisle 5">Aisle 5</option>
                    </select>
                    @if (reservationForm.get('aisle')?.invalid && reservationForm.get('aisle')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Aisle selection is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="rack" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Rack *
                    </label>
                    <select id="rack" formControlName="rack" class="input">
                      <option value="">Select rack</option>
                      <option value="Rack 1">Rack 1</option>
                      <option value="Rack 2">Rack 2</option>
                      <option value="Rack 3">Rack 3</option>
                      <option value="Rack 4">Rack 4</option>
                    </select>
                    @if (reservationForm.get('rack')?.invalid && reservationForm.get('rack')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Rack selection is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="shelf" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Shelf *
                    </label>
                    <select id="shelf" formControlName="shelf" class="input">
                      <option value="">Select shelf</option>
                      <option value="Shelf 1">Shelf 1</option>
                      <option value="Shelf 2">Shelf 2</option>
                      <option value="Shelf 3">Shelf 3</option>
                      <option value="Shelf 4">Shelf 4</option>
                    </select>
                    @if (reservationForm.get('shelf')?.invalid && reservationForm.get('shelf')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Shelf selection is required
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Reservation Period -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="CalendarIcon" size="18" class="mr-2"></lucide-icon>
                  Reservation Period
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="reservedFrom" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reserved From *
                    </label>
                    <input type="date"
                           id="reservedFrom"
                           formControlName="reservedFrom"
                           class="input"
                           [min]="getMinDate()">
                    @if (reservationForm.get('reservedFrom')?.invalid && reservationForm.get('reservedFrom')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Start date is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="reservedUntil" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reserved Until *
                    </label>
                    <input type="date"
                           id="reservedUntil"
                           formControlName="reservedUntil"
                           class="input"
                           [min]="getMinEndDate()">
                    @if (reservationForm.get('reservedUntil')?.invalid && reservationForm.get('reservedUntil')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        End date is required and must be after start date
                      </div>
                    }
                  </div>
                </div>
                <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Duration: {{ getReservationDuration() }} days
                </div>
              </div>

              <!-- Space Requirements -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="PackageIcon" size="18" class="mr-2"></lucide-icon>
                  Space Requirements
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="reservedWeight" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reserved Weight (kg) *
                    </label>
                    <input type="number"
                           id="reservedWeight"
                           formControlName="reservedWeight"
                           class="input"
                           placeholder="1000"
                           min="1"
                           step="0.1">
                    @if (reservationForm.get('reservedWeight')?.invalid && reservationForm.get('reservedWeight')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Valid weight is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="reservedVolume" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reserved Volume (m³) *
                    </label>
                    <input type="number"
                           id="reservedVolume"
                           formControlName="reservedVolume"
                           class="input"
                           placeholder="50"
                           min="1"
                           step="0.1">
                    @if (reservationForm.get('reservedVolume')?.invalid && reservationForm.get('reservedVolume')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Valid volume is required
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Payment Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <lucide-icon [img]="DollarSignIcon" size="18" class="mr-2"></lucide-icon>
                  Payment Information
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="paymentAmount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Amount *
                    </label>
                    <input type="number"
                           id="paymentAmount"
                           formControlName="paymentAmount"
                           class="input"
                           placeholder="2500"
                           min="0"
                           step="0.01">
                    @if (reservationForm.get('paymentAmount')?.invalid && reservationForm.get('paymentAmount')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Valid payment amount is required
                      </div>
                    }
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
                  <div>
                    <label for="paymentDueDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Due Date *
                    </label>
                    <input type="date"
                           id="paymentDueDate"
                           formControlName="paymentDueDate"
                           class="input"
                           [min]="getMinDate()">
                    @if (reservationForm.get('paymentDueDate')?.invalid && reservationForm.get('paymentDueDate')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Payment due date is required
                      </div>
                    }
                  </div>
                </div>
                <div class="mt-4">
                  <label for="paymentStatus" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Status
                  </label>
                  <select id="paymentStatus" formControlName="paymentStatus" class="input">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <!-- Reservation Status -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Reservation Status</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select id="status" formControlName="status" class="input">
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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

              <!-- Special Requirements -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Special Requirements</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-3">
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="requiresClimateControl"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires Climate Control</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="requiresSecurityAccess"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires Security Access</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="requiresSpecialHandling"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Requires Special Handling</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox"
                             formControlName="allowsSharedSpace"
                             class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Allows Shared Space</span>
                    </label>
                  </div>
                  <div class="space-y-4">
                    @if (reservationForm.get('requiresClimateControl')?.value) {
                      <div>
                        <label for="temperatureRange" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Temperature Range
                        </label>
                        <select id="temperatureRange" formControlName="temperatureRange" class="input">
                          <option value="">Select temperature range</option>
                          <option value="2-8">2°C to 8°C (Refrigerated)</option>
                          <option value="-18">-18°C or below (Frozen)</option>
                          <option value="15-25">15°C to 25°C (Room Temperature)</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>
                    }
                    @if (reservationForm.get('requiresSecurityAccess')?.value) {
                      <div>
                        <label for="securityLevel" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Security Level
                        </label>
                        <select id="securityLevel" formControlName="securityLevel" class="input">
                          <option value="">Select security level</option>
                          <option value="standard">Standard Security</option>
                          <option value="high">High Security</option>
                          <option value="maximum">Maximum Security</option>
                        </select>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Additional Notes -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Additional Notes</h4>
                <textarea id="notes"
                          formControlName="notes"
                          rows="3"
                          class="input"
                          placeholder="Any additional requirements, instructions, or special considerations..."></textarea>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-dark-700">
              <button (click)="onCancel()"
                      type="button"
                      class="btn btn-secondary">
                Cancel
              </button>
              <button [disabled]="reservationForm.invalid || submitting"
                      type="submit"
                      class="btn btn-primary">
                <lucide-icon [img]="SaveIcon" size="18" class="mr-2"></lucide-icon>
                {{ submitting ? 'Creating...' : 'Create Reservation' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class ReservationsFormNewReservationComponent {
  // Signal-based input
  showModal = input<boolean>(false);

  // Outputs
  modalClosed = output<void>();
  reservationCreated = output<any>();

  reservationForm: FormGroup;
  submitting = false;

  // Lucide icons
  XIcon = X;
  CalendarIcon = Calendar;
  MapPinIcon = MapPin;
  UserIcon = User;
  PackageIcon = Package;
  DollarSignIcon = DollarSign;
  SaveIcon = Save;

  private formBuilder = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  constructor() {
    this.reservationForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerId: ['', [Validators.required, Validators.min(1)]],
      storageRequestId: [''],
      zone: ['', Validators.required],
      aisle: ['', Validators.required],
      rack: ['', Validators.required],
      shelf: ['', Validators.required],
      reservedFrom: ['', Validators.required],
      reservedUntil: ['', Validators.required],
      reservedWeight: ['', [Validators.required, Validators.min(1)]],
      reservedVolume: ['', [Validators.required, Validators.min(1)]],
      paymentAmount: ['', [Validators.required, Validators.min(0)]],
      currency: ['USD'],
      paymentDueDate: ['', Validators.required],
      paymentStatus: ['pending'],
      status: ['pending'],
      priority: ['normal'],
      requiresClimateControl: [false],
      requiresSecurityAccess: [false],
      requiresSpecialHandling: [false],
      allowsSharedSpace: [true],
      temperatureRange: [''],
      securityLevel: [''],
      notes: ['']
    });

    // Add custom validator for end date
    this.reservationForm.get('reservedUntil')?.addValidators(this.endDateValidator.bind(this));
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  getMinEndDate(): string {
    const startDate = this.reservationForm.get('reservedFrom')?.value;
    if (startDate) {
      const nextDay = new Date(startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split('T')[0];
    }
    return this.getMinDate();
  }

  getReservationDuration(): number {
    const startDate = this.reservationForm.get('reservedFrom')?.value;
    const endDate = this.reservationForm.get('reservedUntil')?.value;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  }

  endDateValidator(control: any) {
    const startDate = this.reservationForm?.get('reservedFrom')?.value;
    const endDate = control.value;
    
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      return { endDateInvalid: true };
    }
    return null;
  }

  onCancel(): void {
    this.reservationForm.reset({
      currency: 'USD',
      paymentStatus: 'pending',
      status: 'pending',
      priority: 'normal',
      requiresClimateControl: false,
      requiresSecurityAccess: false,
      requiresSpecialHandling: false,
      allowsSharedSpace: true
    });
    this.modalClosed.emit();
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const formData = this.reservationForm.value;

    // Simulate API call
    setTimeout(() => {
      try {
        const reservationData = {
          id: Math.floor(Math.random() * 1000) + 1,
          customerId: formData.customerId,
          customerName: formData.customerName,
          storageRequestId: formData.storageRequestId || Math.floor(Math.random() * 100) + 1,
          location: {
            zone: formData.zone,
            aisle: formData.aisle,
            rack: formData.rack,
            shelf: formData.shelf,
            fullLocation: `${formData.zone} - ${formData.aisle} - ${formData.rack} - ${formData.shelf}`
          },
          reservedFrom: new Date(formData.reservedFrom),
          reservedUntil: new Date(formData.reservedUntil),
          reservedWeight: formData.reservedWeight,
          reservedVolume: formData.reservedVolume,
          status: formData.status,
          payment: {
            amount: formData.paymentAmount,
            currency: formData.currency,
            status: formData.paymentStatus,
            dueDate: new Date(formData.paymentDueDate),
            paidDate: formData.paymentStatus === 'paid' ? new Date() : undefined
          },
          specialRequirements: {
            requiresClimateControl: formData.requiresClimateControl,
            requiresSecurityAccess: formData.requiresSecurityAccess,
            requiresSpecialHandling: formData.requiresSpecialHandling,
            allowsSharedSpace: formData.allowsSharedSpace,
            temperatureRange: formData.temperatureRange,
            securityLevel: formData.securityLevel
          },
          priority: formData.priority,
          notes: formData.notes,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.reservationCreated.emit(reservationData);
        
        this.notificationService.showSuccess(
          'Reservation Created',
          `Reservation for ${formData.customerName} has been successfully created at ${reservationData.location.fullLocation}.`
        );

        this.reservationForm.reset({
          currency: 'USD',
          paymentStatus: 'pending',
          status: 'pending',
          priority: 'normal',
          requiresClimateControl: false,
          requiresSecurityAccess: false,
          requiresSpecialHandling: false,
          allowsSharedSpace: true
        });
        this.submitting = false;
        this.modalClosed.emit();
      } catch (error) {
        this.notificationService.showError(
          'Creation Failed',
          'There was an error creating the reservation. Please try again.'
        );
        this.submitting = false;
      }
    }, 1500);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.reservationForm.controls).forEach(key => {
      const control = this.reservationForm.get(key);
      control?.markAsTouched();
    });
  }
}