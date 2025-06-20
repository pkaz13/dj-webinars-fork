import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer } from './customers.model';
import { MOCK_CUSTOMERS } from '../mock/customers.mock';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private mockCustomers: Customer[] = MOCK_CUSTOMERS;

  getCustomers(): Observable<Customer[]> {
    return of(this.mockCustomers).pipe(delay(300));
  }

  getCustomer(id: number): Observable<Customer | undefined> {
    const customer = this.mockCustomers.find(c => c.id === id);
    return of(customer).pipe(delay(200));
  }
}