import { Injectable, signal, computed } from '@angular/core';

export interface BillingPaymentsFilters {
  search: string;
  status: string;
  customer: string;
  dateFrom: string;
  dateTo: string;
}

@Injectable({
  providedIn: 'root'
})
export class BillingPaymentsFiltersService {
  #search = signal<string>('');
  #status = signal<string>('');
  #customer = signal<string>('');
  #dateFrom = signal<string>('');
  #dateTo = signal<string>('');

  readonly search = this.#search.asReadonly();
  readonly status = this.#status.asReadonly();
  readonly customer = this.#customer.asReadonly();
  readonly dateFrom = this.#dateFrom.asReadonly();
  readonly dateTo = this.#dateTo.asReadonly();

  filters = computed<BillingPaymentsFilters>(() => ({
    search: this.#search(),
    status: this.#status(),
    customer: this.#customer(),
    dateFrom: this.#dateFrom(),
    dateTo: this.#dateTo()
  }));

  setSearch(search: string): void {
    this.#search.set(search);
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
    this.#search.set('');
    this.#status.set('');
    this.#customer.set('');
    this.#dateFrom.set('');
    this.#dateTo.set('');
  }

  hasActiveFilters = computed<boolean>(() => {
    const filters = this.filters();
    return !!(filters.search || filters.status || filters.customer || filters.dateFrom || filters.dateTo);
  });
}