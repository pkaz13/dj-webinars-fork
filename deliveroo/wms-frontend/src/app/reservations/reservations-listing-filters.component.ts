import { Component, inject, input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReservationsListingFiltersService } from './reservations-listing-filters.service';
import { LucideAngularModule, Search } from 'lucide-angular';

interface Warehouse {
  id: number;
  name: string;
}

@Component({
  selector: 'app-reservations-listing-filters',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  template: `
    <!-- Filters -->
    <div class="card p-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <div class="relative">
            <lucide-icon [img]="SearchIcon" size="18" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></lucide-icon>
            <input type="text" 
                   [value]="filtersService.search()"
                   (input)="filtersService.setSearch($any($event.target).value)"
                   placeholder="Search by customer or location..."
                   class="input pl-10">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
          <select [value]="filtersService.status()" 
                  (change)="filtersService.setStatus($any($event.target).value)" 
                  class="input">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warehouse</label>
          <select [value]="filtersService.warehouse()" 
                  (change)="filtersService.setWarehouse($any($event.target).value)" 
                  class="input">
            <option value="">All Warehouses</option>
            @for (warehouse of warehouses(); track warehouse.id) {
              <option [value]="warehouse.id">{{ warehouse.name }}</option>
            }
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zone</label>
          <select [value]="filtersService.zone()" 
                  (change)="filtersService.setZone($any($event.target).value)" 
                  class="input">
            <option value="">All Zones</option>
            <option value="Zone A">Zone A</option>
            <option value="Zone B">Zone B</option>
            <option value="Zone C">Zone C</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
          <select [value]="filtersService.period()" 
                  (change)="filtersService.setPeriod($any($event.target).value)" 
                  class="input">
            <option value="">All Periods</option>
            <option value="current">Current Month</option>
            <option value="next">Next Month</option>
            <option value="upcoming">Upcoming</option>
          </select>
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
export class ReservationsListingFiltersComponent {
  // Signal-based input
  warehouses = input<Warehouse[]>([]);

  // Lucide icons
  SearchIcon = Search;

  public filtersService = inject(ReservationsListingFiltersService);
}