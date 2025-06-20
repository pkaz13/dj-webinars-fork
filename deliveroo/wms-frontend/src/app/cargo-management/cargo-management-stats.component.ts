import { Component, input, inject } from '@angular/core';

import { Router } from '@angular/router';
import { InventoryOverview } from '../inventory/inventory.model';
import { LucideAngularModule, Package, DollarSign, AlertTriangle, Clock } from 'lucide-angular';

@Component({
  selector: 'app-cargo-management-stats',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card p-6 cursor-pointer hover:shadow-md transition-shadow" 
           (click)="navigateToCargoListing()">
        <div class="flex items-center">
          <div class="p-2 bg-primary-100 rounded-lg">
            <lucide-icon [img]="PackageIcon" size="24" class="text-primary-600"></lucide-icon>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ overview()?.totalItems || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 cursor-pointer hover:shadow-md transition-shadow" 
           (click)="navigateToCargoListing()">
        <div class="flex items-center">
          <div class="p-2 bg-success-100 rounded-lg">
            <lucide-icon [img]="DollarSignIcon" size="24" class="text-success-600"></lucide-icon>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">\${{ formatCurrency(overview()?.totalValue) }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 cursor-pointer hover:shadow-md transition-shadow" 
           (click)="navigateToCargoListing()">
        <div class="flex items-center">
          <div class="p-2 bg-warning-100 rounded-lg">
            <lucide-icon [img]="AlertTriangleIcon" size="24" class="text-warning-600"></lucide-icon>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ overview()?.lowStockItems || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 cursor-pointer hover:shadow-md transition-shadow" 
           (click)="navigateToCargoListing()">
        <div class="flex items-center">
          <div class="p-2 bg-error-100 rounded-lg">
            <lucide-icon [img]="ClockIcon" size="24" class="text-error-600"></lucide-icon>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Expiring Soon</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ overview()?.expiringSoonItems || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CargoManagementStatsComponent {
  // Signal-based input
  overview = input<InventoryOverview | null>(null);

  // Lucide icons
  PackageIcon = Package;
  DollarSignIcon = DollarSign;
  AlertTriangleIcon = AlertTriangle;
  ClockIcon = Clock;

  private router = inject(Router);

  navigateToCargoListing(): void {
    // Could implement specific navigation logic here
    console.log('Navigate to cargo listing');
  }

  formatCurrency(value: number | undefined): string {
    if (!value) return '0';
    return new Intl.NumberFormat('en-US').format(value);
  }
}