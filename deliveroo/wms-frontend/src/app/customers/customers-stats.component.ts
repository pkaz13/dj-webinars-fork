import { Component, input } from '@angular/core';

import { Customer } from './customers.model';
import { LucideAngularModule, Users, Building, Mail } from 'lucide-angular';

@Component({
  selector: 'app-customers-stats',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card p-6">
        <div class="flex items-center">
          <div class="p-2 bg-primary-100 rounded-lg">
            <lucide-icon [img]="UsersIcon" size="24" class="text-primary-600"></lucide-icon>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ customers().length }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="p-2 bg-success-100 rounded-lg">
            <lucide-icon [img]="BuildingIcon" size="24" class="text-success-600"></lucide-icon>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Customers</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ getActiveCustomers() }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center">
          <div class="p-2 bg-warning-100 rounded-lg">
            <lucide-icon [img]="MailIcon" size="24" class="text-warning-600"></lucide-icon>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">New This Month</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ getNewCustomersThisMonth() }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CustomersStatsComponent {
  // Signal-based input
  customers = input<Customer[]>([]);

  // Lucide icons
  UsersIcon = Users;
  BuildingIcon = Building;
  MailIcon = Mail;

  getActiveCustomers(): number {
    return this.customers().filter(c => c.status === 'active').length;
  }

  getNewCustomersThisMonth(): number {
    const now = new Date();
    return this.customers().filter(c => {
      const createdDate = new Date(c.createdAt);
      return createdDate.getMonth() === now.getMonth() && 
             createdDate.getFullYear() === now.getFullYear();
    }).length;
  }
}