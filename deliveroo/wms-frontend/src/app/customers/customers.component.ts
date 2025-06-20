import { Component, OnInit, effect, inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from './customers.service';
import { CustomersListingFiltersService } from './customers-listing-filters.service';
import { NotificationService } from '../notifications/notification.service';
import { Customer } from './customers.model';
import { CustomersStatsComponent } from './customers-stats.component';
import { CustomersListingFiltersComponent } from './customers-listing-filters.component';
import { CustomersListingComponent } from './customers-listing.component';
import { LucideAngularModule, Plus, X, UserMinus } from 'lucide-angular';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    CustomersStatsComponent,
    CustomersListingFiltersComponent,
    CustomersListingComponent
],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p class="text-gray-600 dark:text-gray-400">Manage customer information and contacts</p>
        </div>
        <button (click)="showAddCustomerModal = true" class="btn btn-primary">
          <lucide-icon [img]="PlusIcon" size="18" class="mr-2"></lucide-icon>
          Add Customer
        </button>
      </div>

      <!-- Stats Component -->
      <app-customers-stats [customers]="customers" />

      <!-- Filters Component -->
      <app-customers-listing-filters />

      <!-- Listing Component -->
      <app-customers-listing 
        [customers]="filteredCustomers" 
        (deactivateCustomer)="deactivateCustomer($event)" />
    </div>

    <!-- Add Customer Modal -->
    @if (showAddCustomerModal) {
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-dark-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Add New Customer</h3>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <lucide-icon [img]="XIcon" size="24"></lucide-icon>
            </button>
          </div>

          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()" class="p-6">
            <div class="space-y-6">
              <!-- Company Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Company Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="companyName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company Name *
                    </label>
                    <input type="text" 
                          id="companyName"
                          formControlName="companyName"
                          class="input"
                          placeholder="Enter company name">
                    @if (customerForm.get('companyName')?.invalid && customerForm.get('companyName')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Company name is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="countryOfOrigin" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country of Origin *
                    </label>
                    <select id="countryOfOrigin" formControlName="countryOfOrigin" class="input">
                      <option value="">Select country</option>
                      <option value="USA">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                    @if (customerForm.get('countryOfOrigin')?.invalid && customerForm.get('countryOfOrigin')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Country is required
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Contact Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="contactPerson" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Person *
                    </label>
                    <input type="text" 
                          id="contactPerson"
                          formControlName="contactPerson"
                          class="input"
                          placeholder="Enter contact person name">
                    @if (customerForm.get('contactPerson')?.invalid && customerForm.get('contactPerson')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Contact person is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="contactTitle" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contact Title
                    </label>
                    <input type="text" 
                          id="contactTitle"
                          formControlName="contactTitle"
                          class="input"
                          placeholder="e.g., Operations Manager">
                  </div>
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input type="tel" 
                          id="phone"
                          formControlName="phone"
                          class="input"
                          placeholder="+1-555-0123">
                    @if (customerForm.get('phone')?.invalid && customerForm.get('phone')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Phone number is required
                      </div>
                    }
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input type="email" 
                          id="email"
                          formControlName="email"
                          class="input"
                          placeholder="contact@company.com">
                    @if (customerForm.get('email')?.invalid && customerForm.get('email')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Valid email is required
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Address Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Address Information</h4>
                <div class="space-y-4">
                  <div>
                    <label for="street" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Street Address *
                    </label>
                    <input type="text" 
                          id="street"
                          formControlName="street"
                          class="input"
                          placeholder="123 Business Street">
                    @if (customerForm.get('street')?.invalid && customerForm.get('street')?.touched) {
                      <div class="mt-1 text-sm text-error-600">
                        Street address is required
                      </div>
                    }
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City *
                      </label>
                      <input type="text" 
                            id="city"
                            formControlName="city"
                            class="input"
                            placeholder="City">
                      @if (customerForm.get('city')?.invalid && customerForm.get('city')?.touched) {
                        <div class="mt-1 text-sm text-error-600">
                          City is required
                        </div>
                      }
                    </div>
                    <div>
                      <label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        State/Province *
                      </label>
                      <input type="text" 
                            id="state"
                            formControlName="state"
                            class="input"
                            placeholder="State">
                      @if (customerForm.get('state')?.invalid && customerForm.get('state')?.touched) {
                        <div class="mt-1 text-sm text-error-600">
                          State is required
                        </div>
                      }
                    </div>
                    <div>
                      <label for="postalCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Postal Code *
                      </label>
                      <input type="text" 
                            id="postalCode"
                            formControlName="postalCode"
                            class="input"
                            placeholder="12345">
                      @if (customerForm.get('postalCode')?.invalid && customerForm.get('postalCode')?.touched) {
                        <div class="mt-1 text-sm text-error-600">
                          Postal code is required
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tax Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Tax Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="taxId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tax ID
                    </label>
                    <input type="text" 
                          id="taxId"
                          formControlName="taxId"
                          class="input"
                          placeholder="TAX-123-456">
                  </div>
                  <div>
                    <label for="taxNumber" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tax Number
                    </label>
                    <input type="text" 
                          id="taxNumber"
                          formControlName="taxNumber"
                          class="input"
                          placeholder="12-3456789">
                  </div>
                </div>
              </div>

              <!-- Billing Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Billing Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="paymentTerms" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Terms
                    </label>
                    <select id="paymentTerms" formControlName="paymentTerms" class="input">
                      <option value="Net 30">Net 30</option>
                      <option value="Net 60">Net 60</option>
                      <option value="Net 90">Net 90</option>
                    </select>
                  </div>
                  <div>
                    <label for="creditLimit" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Credit Limit ($)
                    </label>
                    <input type="number" 
                          id="creditLimit"
                          formControlName="creditLimit"
                          class="input"
                          placeholder="5000">
                  </div>
                </div>
              </div>
              
              <!-- Notes -->
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea id="notes" 
                          formControlName="notes" 
                          rows="4"
                          class="input"
                          placeholder="Any additional notes about the customer..."></textarea>
              </div>
            </div>
            
            <div class="flex items-center justify-end p-6 border-t border-gray-200 dark:border-dark-700 mt-6">
              <button type="button" (click)="closeModal()" class="btn btn-secondary mr-4">Cancel</button>
              <button type="submit" [disabled]="customerForm.invalid || submitting" class="btn btn-primary">
                @if (submitting) {
                  <span>Saving...</span>
                } @else {
                  <span>Save Customer</span>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class CustomersComponent implements OnInit {
  private customersService = inject(CustomersService);
  private filtersService = inject(CustomersListingFiltersService);
  private notificationService = inject(NotificationService);
  private formBuilder = inject(FormBuilder);

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  showAddCustomerModal = false;
  submitting = false;
  customerForm: FormGroup;

  // Lucide icons
  PlusIcon = Plus;
  XIcon = X;
  UserMinusIcon = UserMinus;

  constructor() {
    this.customerForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      countryOfOrigin: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactTitle: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      taxId: [''],
      taxNumber: [''],
      paymentTerms: ['Net 30'],
      creditLimit: [5000],
      notes: ['']
    });

    effect(() => {
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customersService.getCustomers().subscribe(data => {
      this.customers = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const searchTerm = this.filtersService.searchTerm().toLowerCase();
    const status = this.filtersService.status();

    this.filteredCustomers = this.customers.filter(customer => {
      const matchesSearchTerm = (
        customer.companyName.toLowerCase().includes(searchTerm) ||
        customer.contactPerson.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm)
      );
      const matchesStatus = status ? customer.status === status : true;

      return matchesSearchTerm && matchesStatus;
    });
  }

  deactivateCustomer(customer: Customer): void {
    // In a real app, you'd call a service to update the customer status
    customer.status = 'inactive';
    this.notificationService.showWarning(
      'Customer Deactivated',
      `Customer ${customer.companyName} has been deactivated.`
    );
    this.applyFilters(); // Re-apply filters to update the view
  }

  closeModal(): void {
    this.showAddCustomerModal = false;
    this.customerForm.reset();
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      return;
    }

    this.submitting = true;

    // In a real app, you'd send this data to a server
    setTimeout(() => {
      const newCustomer: Customer = {
        id: `CUS-${Math.floor(Math.random() * 10000)}`,
        ...this.customerForm.value,
        status: 'active',
        memberSince: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString()
      };
      
      this.customers = [...this.customers, newCustomer];
      this.applyFilters();
      
      this.submitting = false;
      this.closeModal();
      
      this.notificationService.showSuccess(
        'Customer added successfully!',
        `${this.customerForm.value.companyName} has been created.`
      );
    }, 1500);
  }
}