import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Customer } from './customers.model';
import { LucideAngularModule, Eye, Phone, Mail, Building, Users, UserMinus } from 'lucide-angular';

@Component({
  selector: 'app-customers-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <!-- Customers Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
          <thead class="bg-gray-50 dark:bg-dark-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contact Person
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-700">
            @for (customer of customers(); track customer.id) {
              <tr class="hover:bg-gray-50 dark:hover:bg-dark-700">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <lucide-icon [img]="BuildingIcon" size="20" class="text-primary-600"></lucide-icon>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.companyName }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">ID: {{ customer.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-white">{{ customer.contactPerson }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ customer.contactTitle || 'Contact' }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center text-sm text-gray-900 dark:text-white">
                    <lucide-icon [img]="PhoneIcon" size="16" class="mr-2 text-gray-400"></lucide-icon>
                    {{ customer.phone }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center text-sm text-gray-900 dark:text-white">
                    <lucide-icon [img]="MailIcon" size="16" class="mr-2 text-gray-400"></lucide-icon>
                    {{ customer.email }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span [class]="getStatusClass(customer.status)" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                    {{ customer.status | titlecase }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm font-medium space-x-2">
                  <button [routerLink]="['/customers', customer.id]"
                          class="text-primary-600 hover:text-primary-500 inline-flex items-center">
                    <lucide-icon [img]="EyeIcon" size="16" class="mr-1"></lucide-icon>
                    View Details
                  </button>
                  @if (customer.status === 'active') {
                    <button (click)="onDeactivateCustomer(customer)"
                            class="text-warning-600 hover:text-warning-500 inline-flex items-center">
                      <lucide-icon [img]="UserMinusIcon" size="16" class="mr-1"></lucide-icon>
                      Deactivate
                    </button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (customers().length === 0) {
        <div class="text-center py-12">
          <lucide-icon [img]="UsersIcon" size="48" class="mx-auto text-gray-400 mb-4"></lucide-icon>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No customers found</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search criteria.</p>
        </div>
      }
    </div>
  `
})
export class CustomersListingComponent {
  // Signal-based input
  customers = input<Customer[]>([]);

  // Outputs
  deactivateCustomer = output<Customer>();

  // Lucide icons
  EyeIcon = Eye;
  PhoneIcon = Phone;
  MailIcon = Mail;
  BuildingIcon = Building;
  UsersIcon = Users;
  UserMinusIcon = UserMinus;

  onDeactivateCustomer(customer: Customer): void {
    this.deactivateCustomer.emit(customer);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}