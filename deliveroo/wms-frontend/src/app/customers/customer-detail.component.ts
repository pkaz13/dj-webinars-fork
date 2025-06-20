import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomersService } from './customers.service';
import { Customer } from './customers.model';
import { CustomerDetailsActionsComponent } from './customer-details-actions.component';
import { CustomerDetailsCardsComponent } from './customer-details-cards.component';
import { LucideAngularModule, ArrowLeft, User } from 'lucide-angular';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    LucideAngularModule,
    CustomerDetailsActionsComponent,
    CustomerDetailsCardsComponent
  ],
  template: `
    @if (customer) {
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button routerLink="/customers" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ customer.companyName }}</h1>
              <p class="text-gray-600 dark:text-gray-400">Customer Details</p>
            </div>
            <span [class]="getStatusClass(customer.status)" 
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
              {{ customer.status | titlecase }}
            </span>
          </div>
          
          <!-- Actions Component -->
          <app-customer-details-actions [customer]="customer" />
        </div>

        <!-- Details Cards Component -->
        <app-customer-details-cards [customer]="customer" />
      </div>
    } @else {
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <lucide-icon [img]="UserIcon" size="48" class="mx-auto text-gray-400 mb-4"></lucide-icon>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Customer not found</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">The requested customer could not be found.</p>
        </div>
      </div>
    }
  `
})
export class CustomerDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private customersService = inject(CustomersService);

  customer: Customer | null = null;
  customerId: number = 0;

  // Lucide icons
  ArrowLeftIcon = ArrowLeft;
  UserIcon = User;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = parseInt(params['id']);
      this.loadCustomerDetails();
    });
  }

  loadCustomerDetails(): void {
    this.customersService.getCustomer(this.customerId).subscribe(customer => {
      this.customer = customer || null;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}