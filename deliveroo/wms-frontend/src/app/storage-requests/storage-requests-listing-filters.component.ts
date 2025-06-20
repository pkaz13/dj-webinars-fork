import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { StorageRequestsFiltersService } from './storage-requests-listing-filters.service';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-storage-requests-listing-filters',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  template: `
    <!-- Filters -->
    <div class="card p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select [value]="filtersService.status()" 
                  (change)="filtersService.setStatus($any($event.target).value)"
                  class="input">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer</label>
          <div class="relative">
            <lucide-icon [img]="SearchIcon" size="18" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></lucide-icon>
            <input type="text" 
                   [value]="filtersService.customer()"
                   (input)="filtersService.setCustomer($any($event.target).value)"
                   placeholder="Search customer..."
                   class="input pl-10">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date From</label>
          <input type="date" 
                 [value]="filtersService.dateFrom()"
                 (change)="filtersService.setDateFrom($any($event.target).value)"
                 class="input">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date To</label>
          <input type="date" 
                 [value]="filtersService.dateTo()"
                 (change)="filtersService.setDateTo($any($event.target).value)"
                 class="input">
        </div>
      </div>
      
      @if (filtersService.hasActiveFilters()) {
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            Filters applied
          </span>
          <button (click)="filtersService.resetFilters()"
                  class="text-sm text-primary-600 hover:text-primary-500">
            Clear all filters
          </button>
        </div>
      }
    </div>
  `
})
export class StorageRequestsListingFiltersComponent {
  // Lucide icons
  SearchIcon = Search;

  public filtersService = inject(StorageRequestsFiltersService);
}