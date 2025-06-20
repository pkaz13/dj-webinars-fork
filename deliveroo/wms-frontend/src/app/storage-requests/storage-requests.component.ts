import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../auth/auth.service';
import { StorageRequest } from './storage-request.model';
import { StorageRequestsFiltersService } from './storage-requests-listing-filters.service';
import { StorageRequestsListingFiltersComponent } from './storage-requests-listing-filters.component';
import { StorageRequestsListingComponent } from './storage-requests-listing.component';
import { StorageRequestsFormNewRequestComponent } from './storage-requests-form-new-request.component';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { StorageRequestService } from './storage-requests.service';

@Component({
  selector: 'app-storage-requests',
  standalone: true,
  imports: [
    LucideAngularModule,
    StorageRequestsListingFiltersComponent,
    StorageRequestsListingComponent,
    StorageRequestsFormNewRequestComponent
],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Storage Requests</h1>
          <p class="text-gray-600 dark:text-gray-400">Manage storage requests and reservations</p>
        </div>
        <button (click)="showNewRequestModal.set(true)" 
                class="btn btn-primary">
          <lucide-icon [img]="PlusIcon" size="18" class="mr-2"></lucide-icon>
          New Request
        </button>
      </div>

      <!-- Filters Component -->
      <app-storage-requests-listing-filters />

      <!-- Listing Component -->
      <app-storage-requests-listing 
        [requests]="filtersService.filteredRequests()"
        [canApprove]="canApprove()"
        [hasActiveFilters]="filtersService.hasActiveFilters()"
        (approveRequest)="approveRequest($event)"
        (rejectRequest)="rejectRequest($event)" />

      <!-- New Request Modal -->
      <app-storage-requests-form-new-request
        [showModal]="showNewRequestModal()"
        (modalClosed)="showNewRequestModal.set(false)"
        (requestSubmitted)="onRequestSubmitted($event)" />
    </div>
  `
})
export class StorageRequestsComponent implements OnInit {
  showNewRequestModal = signal(false);

  // Lucide icons
  PlusIcon = Plus;

  private storageRequestService = inject(StorageRequestService);
  private authService = inject(AuthService);
  public filtersService = inject(StorageRequestsFiltersService);

  ngOnInit(): void {
    this.loadStorageRequests();
  }

  loadStorageRequests(): void {
    this.storageRequestService.getStorageRequests().subscribe(requests => {
      this.filtersService.setRequests(requests);
    });
  }

  canApprove(): boolean {
    return this.authService.hasRole('Warehouse Manager') || this.authService.hasRole('Logistics Coordinator');
  }

  approveRequest(requestId: number): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) return;

    this.storageRequestService.updateStorageRequestStatus(requestId, 'accepted', currentUser.id)
      .subscribe(() => {
        this.loadStorageRequests();
      });
  }

  rejectRequest(requestId: number): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) return;

    this.storageRequestService.updateStorageRequestStatus(requestId, 'rejected', currentUser.id)
      .subscribe(() => {
        this.loadStorageRequests();
      });
  }

  onRequestSubmitted(requestData: StorageRequest): void {
    // Add the new request to the list
    this.filtersService.setRequests([requestData, ...this.filtersService.requests()]);
  }
}