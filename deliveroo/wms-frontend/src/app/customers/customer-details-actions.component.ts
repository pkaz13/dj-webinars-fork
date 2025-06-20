import { Component, input } from '@angular/core';

import { Customer } from './customers.model';
import { LucideAngularModule, Edit, CreditCard } from 'lucide-angular';

@Component({
  selector: 'app-customer-details-actions',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    @if (customer()) {
      <div class="flex space-x-3">
        <button class="btn btn-secondary">
          <lucide-icon [img]="EditIcon" size="18" class="mr-2"></lucide-icon>
          Edit Customer
        </button>
        <button class="btn btn-primary">
          <lucide-icon [img]="CreditCardIcon" size="18" class="mr-2"></lucide-icon>
          Create Invoice
        </button>
      </div>
    }
  `
})
export class CustomerDetailsActionsComponent {
  // Signal-based input
  customer = input<Customer | null>(null);

  // Lucide icons
  EditIcon = Edit;
  CreditCardIcon = CreditCard;
}