import { Injectable, signal, computed } from '@angular/core';
import { StorageRequest } from './storage-request.model';

export interface StorageRequestFilters {
  status: string;
  customer: string;
  dateFrom: string;
  dateTo: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageRequestsFiltersService {
  #status = signal<string>('');
  #customer = signal<string>('');
  #dateFrom = signal<string>('');
  #dateTo = signal<string>('');
  #requests = signal<StorageRequest[]>([]);

  readonly status = this.#status.asReadonly();
  readonly customer = this.#customer.asReadonly();
  readonly dateFrom = this.#dateFrom.asReadonly();
  readonly dateTo = this.#dateTo.asReadonly();
  readonly requests = this.#requests.asReadonly();

  filters = computed<StorageRequestFilters>(() => ({
    status: this.#status(),
    customer: this.#customer(),
    dateFrom: this.#dateFrom(),
    dateTo: this.#dateTo()
  }));

  filteredRequests = computed(() => {
    const filters = this.filters();
    const requests = this.#requests();

    return requests.filter(request => {
      // Status filter
      if (filters.status && request.status !== filters.status) {
        return false;
      }

      // Customer filter
      if (filters.customer && !request.customerName.toLowerCase().includes(filters.customer.toLowerCase())) {
        return false;
      }

      // Date from filter
      if (filters.dateFrom) {
        const dateFrom = new Date(filters.dateFrom);
        if (new Date(request.requestedEntryDate) < dateFrom) {
          return false;
        }
      }

      // Date to filter
      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        if (new Date(request.requestedEntryDate) > dateTo) {
          return false;
        }
      }

      return true;
    });
  });

  setRequests(requests: StorageRequest[]): void {
    this.#requests.set(requests);
  }

  setStatus(status: string): void {
    this.#status.set(status);
  }

  setCustomer(customer: string): void {
    this.#customer.set(customer);
  }

  setDateFrom(dateFrom: string): void {
    this.#dateFrom.set(dateFrom);
  }

  setDateTo(dateTo: string): void {
    this.#dateTo.set(dateTo);
  }

  resetFilters(): void {
    this.#status.set('');
    this.#customer.set('');
    this.#dateFrom.set('');
    this.#dateTo.set('');
  }

  hasActiveFilters = computed<boolean>(() => {
    const filters = this.filters();
    return !!(filters.status || filters.customer || filters.dateFrom || filters.dateTo);
  });
}