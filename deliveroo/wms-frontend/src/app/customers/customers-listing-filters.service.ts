import { Injectable, signal, computed } from '@angular/core';

export interface CustomersListingFilters {
  searchTerm: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersListingFiltersService {
  #searchTerm = signal<string>('');
  #status = signal<string>('');

  readonly searchTerm = this.#searchTerm.asReadonly();
  readonly status = this.#status.asReadonly();

  filters = computed<CustomersListingFilters>(() => ({
    searchTerm: this.#searchTerm(),
    status: this.#status()
  }));

  setSearchTerm(searchTerm: string): void {
    this.#searchTerm.set(searchTerm);
  }

  setStatus(status: string): void {
    this.#status.set(status);
  }

  resetFilters(): void {
    this.#searchTerm.set('');
    this.#status.set('');
  }

  hasActiveFilters = computed<boolean>(() => {
    const filters = this.filters();
    return !!(filters.searchTerm || filters.status);
  });
}