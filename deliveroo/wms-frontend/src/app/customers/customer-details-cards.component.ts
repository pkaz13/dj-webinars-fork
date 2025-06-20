import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Customer } from './customers.model';
import { LucideAngularModule, Building, User, Phone, Mail, MapPin, FileText, Calendar } from 'lucide-angular';

@Component({
  selector: 'app-customer-details-cards',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    @if (customer()) {
      <div>
        <!-- Customer Information Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Basic Information -->
          <div class="card p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <lucide-icon [img]="BuildingIcon" size="20" class="mr-2"></lucide-icon>
              Company Information
            </h3>
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.companyName }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Customer ID</label>
                <p class="text-sm text-gray-900 dark:text-white mt-1">#{{ customer()?.id }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Country of Origin</label>
                <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.countryOfOrigin }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <span [class]="getStatusClass(customer()?.status || '')" 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1">
                  {{ customer()?.status | titlecase }}
                </span>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="card p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <lucide-icon [img]="UserIcon" size="20" class="mr-2"></lucide-icon>
              Contact Information
            </h3>
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person</label>
                <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.contactPerson }}</p>
                @if (customer()?.contactTitle) {
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ customer()?.contactTitle }}</p>
                }
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <div class="flex items-center mt-1">
                  <lucide-icon [img]="PhoneIcon" size="16" class="mr-2 text-gray-400"></lucide-icon>
                  <p class="text-sm text-gray-900 dark:text-white">{{ customer()?.phone }}</p>
                </div>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div class="flex items-center mt-1">
                  <lucide-icon [img]="MailIcon" size="16" class="mr-2 text-gray-400"></lucide-icon>
                  <a href="mailto:{{ customer()?.email }}" 
                    class="text-sm text-primary-600 hover:text-primary-500">{{ customer()?.email }}</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div class="card p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <lucide-icon [img]="MapPinIcon" size="20" class="mr-2"></lucide-icon>
              Address Information
            </h3>
            <div class="space-y-2">
              <p class="text-sm text-gray-900 dark:text-white">{{ customer()?.address?.street }}</p>
              <p class="text-sm text-gray-900 dark:text-white">
                {{ customer()?.address?.city }}, {{ customer()?.address?.state }} {{ customer()?.address?.postalCode }}
              </p>
              <p class="text-sm text-gray-900 dark:text-white">{{ customer()?.address?.country }}</p>
            </div>
          </div>

          <!-- Tax Information -->
          <div class="card p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <lucide-icon [img]="FileTextIcon" size="20" class="mr-2"></lucide-icon>
              Tax Information
            </h3>
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Tax ID</label>
                <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.taxId || 'Not provided' }}</p>
              </div>
              @if (customer()?.taxInfo) {
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Tax Number</label>
                  <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.taxInfo?.taxNumber || 'Not provided' }}</p>
                </div>
              }
              @if (customer()?.taxInfo) {
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">VAT Number</label>
                  <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.taxInfo?.vatNumber || 'Not provided' }}</p>
                </div>
              }
              @if (customer()?.taxInfo) {
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Tax Status</label>
                  <span [class]="customer()?.taxInfo?.taxExempt ? 'bg-warning-100 text-warning-800' : 'bg-success-100 text-success-800'" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1">
                    {{ customer()?.taxInfo?.taxExempt ? 'Tax Exempt' : 'Taxable' }}
                  </span>
                </div>
              }
              @if (customer()?.taxInfo && !customer()?.taxInfo?.taxExempt) {
                <div>
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Tax Rate</label>
                  <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.taxInfo?.taxRate }}%</p>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Account Details -->
        <div class="card p-6 mb-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <lucide-icon [img]="CalendarIcon" size="20" class="mr-2"></lucide-icon>
            Account Details
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Since</label>
              <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.createdAt | date:'MMM d, y' }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Last Updated</label>
              <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.updatedAt | date:'MMM d, y' }}</p>
            </div>
          </div>
          @if (customer()?.notes) {
            <div class="mt-4">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
              <p class="text-sm text-gray-900 dark:text-white mt-1">{{ customer()?.notes }}</p>
            </div>
          }
        </div>

        <!-- Quick Actions -->
        <div class="card p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button routerLink="/billing-payments" 
                    class="flex items-center p-4 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              <lucide-icon [img]="FileTextIcon" size="20" class="text-primary-600 mr-3"></lucide-icon>
              <span class="text-sm font-medium text-gray-900 dark:text-white">View Invoices</span>
            </button>

            <button routerLink="/reservations" 
                    class="flex items-center p-4 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg hover:border-secondary-500 hover:bg-secondary-50 dark:hover:bg-secondary-900/20 transition-colors">
              <lucide-icon [img]="CalendarIcon" size="20" class="text-secondary-600 mr-3"></lucide-icon>
              <span class="text-sm font-medium text-gray-900 dark:text-white">View Reservations</span>
            </button>

            <button routerLink="/cargo-management" 
                    class="flex items-center p-4 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg hover:border-warning-500 hover:bg-warning-50 dark:hover:bg-warning-900/20 transition-colors">
              <lucide-icon [img]="BuildingIcon" size="20" class="text-warning-600 mr-3"></lucide-icon>
              <span class="text-sm font-medium text-gray-900 dark:text-white">View Cargo</span>
            </button>

            <button routerLink="/storage-requests" 
                    class="flex items-center p-4 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg hover:border-success-500 hover:bg-success-50 dark:hover:bg-success-900/20 transition-colors">
              <lucide-icon [img]="FileTextIcon" size="20" class="text-success-600 mr-3"></lucide-icon>
              <span class="text-sm font-medium text-gray-900 dark:text-white">Storage Requests</span>
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class CustomerDetailsCardsComponent {
  // Signal-based input
  customer = input<Customer | null>(null);

  // Lucide icons
  BuildingIcon = Building;
  UserIcon = User;
  PhoneIcon = Phone;
  MailIcon = Mail;
  MapPinIcon = MapPin;
  FileTextIcon = FileText;
  CalendarIcon = Calendar;

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}