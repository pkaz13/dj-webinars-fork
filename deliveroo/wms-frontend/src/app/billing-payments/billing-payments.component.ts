import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BillingService } from './billing.service';
import { BillingPaymentsFiltersService } from './billing-payments-filters.service';
import { BillingOverview, Invoice } from './billing.model';
import { LucideAngularModule, DollarSign, FileText, CheckCircle, AlertCircle, Search, Download, Eye, Plus } from 'lucide-angular';

@Component({
  selector: 'app-billing-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Billing & Payments</h1>
          <p class="text-gray-600 dark:text-gray-400">Manage invoices, payments, and financial reports</p>
        </div>
        <button class="btn btn-primary">
          <lucide-icon [img]="PlusIcon" size="18" class="mr-2"></lucide-icon>
          Create Invoice
        </button>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-success-100 rounded-lg">
              <lucide-icon [img]="DollarSignIcon" size="24" class="text-success-600"></lucide-icon>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">\${{ formatCurrency(overview?.totalRevenue) }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-primary-100 rounded-lg">
              <lucide-icon [img]="FileTextIcon" size="24" class="text-primary-600"></lucide-icon>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invoices</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ overview?.totalInvoices || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-success-100 rounded-lg">
              <lucide-icon [img]="CheckCircleIcon" size="24" class="text-success-600"></lucide-icon>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Paid Invoices</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ overview?.paidInvoices || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="p-2 bg-error-100 rounded-lg">
              <lucide-icon [img]="AlertCircleIcon" size="24" class="text-error-600"></lucide-icon>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue Invoices</p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ overview?.overdueInvoices || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sub-tabs -->
      <div class="card">
        <div class="border-b border-gray-200 dark:border-dark-700">
          <nav class="-mb-px flex space-x-8 px-6">
            @for (tab of billingTabs; track tab.id) {
              <button (click)="activeTab = tab.id"
                      [class]="getTabClass(tab.id)"
                      class="py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center">
                <lucide-icon [img]="tab.icon" size="18" class="mr-2"></lucide-icon>
                {{ tab.name }}
              </button>
            }
          </nav>
        </div>

        <!-- Invoice Generation Tab -->
        @if (activeTab === 'invoices') {
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Invoice Management</h3>
            </div>
  
            <!-- Filters -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                <div class="relative">
                  <lucide-icon [img]="SearchIcon" size="18" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></lucide-icon>
                  <input type="text" 
                         [value]="filtersService.search()"
                         (input)="filtersService.setSearch($any($event.target).value)"
                         placeholder="Search invoices..."
                         class="input pl-10">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select [value]="filtersService.status()" 
                        (change)="filtersService.setStatus($any($event.target).value)" 
                        class="input">
                  <option value="">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="sent">Sent</option>
                  <option value="overdue">Overdue</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer</label>
                <input type="text" 
                       [value]="filtersService.customer()"
                       (input)="filtersService.setCustomer($any($event.target).value)"
                       placeholder="Customer name..."
                       class="input">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                <div class="flex space-x-2">
                  <input type="date" 
                         [value]="filtersService.dateFrom()"
                         (change)="filtersService.setDateFrom($any($event.target).value)"
                         class="input flex-1">
                  <input type="date" 
                         [value]="filtersService.dateTo()"
                         (change)="filtersService.setDateTo($any($event.target).value)"
                         class="input flex-1">
                </div>
              </div>
            </div>
  
            @if (filtersService.hasActiveFilters()) {
              <div class="mb-4 flex items-center justify-between">
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ filteredInvoices.length }} of {{ invoices.length }} invoices shown
                </span>
                <button (click)="filtersService.resetFilters()" 
                        class="text-sm text-primary-600 hover:text-primary-500">
                  Clear all filters
                </button>
              </div>
            }
  
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
                <thead class="bg-gray-50 dark:bg-dark-800">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Invoice #
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Issue Date
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-700">
                  @for (invoice of filteredInvoices; track invoice.id) {
                    <tr class="hover:bg-gray-50 dark:hover:bg-dark-700">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {{ invoice.invoiceNumber }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <a [routerLink]="['/customers', invoice.customerId]" 
                           class="text-sm text-primary-600 hover:text-primary-500 font-medium">
                          {{ invoice.customerName }}
                        </a>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {{ invoice.issueDate | date:'MMM d, y' }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {{ invoice.dueDate | date:'MMM d, y' }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        \${{ formatCurrency(invoice.amount) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span [class]="getInvoiceStatusClass(invoice.status)" 
                              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                          {{ invoice.status | titlecase }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button [routerLink]="['/billing-payments/invoice', invoice.id]"
                                class="text-primary-600 hover:text-primary-500 inline-flex items-center">
                          <lucide-icon [img]="EyeIcon" size="16" class="mr-1"></lucide-icon>
                          View
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        } @else if (activeTab === 'payments') {
          <div class="p-6">
            <div class="text-center py-12">
              <lucide-icon [img]="DollarSignIcon" size="48" class="mx-auto text-gray-400 mb-4"></lucide-icon>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Payment Processing</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">This feature is not implemented yet.</p>
            </div>
          </div>
        } @else if (activeTab === 'history') {
          <div class="p-6">
            <div class="text-center py-12">
              <lucide-icon [img]="FileTextIcon" size="48" class="mx-auto text-gray-400 mb-4"></lucide-icon>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Billing History</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">This feature is not implemented yet.</p>
            </div>
          </div>
        } @else if (activeTab === 'reports') {
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Financial Reports</h3>
              <div class="flex space-x-3">
                <button class="btn btn-secondary">
                  <lucide-icon [img]="DownloadIcon" size="18" class="mr-2"></lucide-icon>
                  Export Report
                </button>
                <button class="btn btn-primary">
                  <lucide-icon [img]="DownloadIcon" size="18" class="mr-2"></lucide-icon>
                  Download PDF
                </button>
              </div>
            </div>
  
            <!-- Revenue Summary -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="card p-6">
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Revenue Summary</h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Total Revenue</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">\${{ formatCurrency(overview?.totalRevenue) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Total Invoices</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ overview?.totalInvoices }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Paid Invoices</span>
                    <span class="text-sm font-medium text-success-600">{{ overview?.paidInvoices }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Overdue Invoices</span>
                    <span class="text-sm font-medium text-error-600">{{ overview?.overdueInvoices }}</span>
                  </div>
                </div>
              </div>
  
              <div class="card p-6">
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h4>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Average Payment Time</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ overview?.avgPaymentTime }} days</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Collection Rate</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ overview?.collectionRate }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Average Invoice Value</span>
                    <span class="text-sm font-medium text-gray-900 dark:text-white">\${{ formatCurrency(overview?.avgInvoiceValue) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class BillingPaymentsComponent implements OnInit {
  activeTab = 'invoices';
  overview: BillingOverview | null = null;
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];

  // Lucide icons
  DollarSignIcon = DollarSign;
  FileTextIcon = FileText;
  CheckCircleIcon = CheckCircle;
  AlertCircleIcon = AlertCircle;
  SearchIcon = Search;
  DownloadIcon = Download;
  EyeIcon = Eye;
  PlusIcon = Plus;

  billingTabs = [
    { id: 'invoices', name: 'Invoices', icon: FileText },
    { id: 'payments', name: 'Payment Processing', icon: DollarSign },
    { id: 'history', name: 'Billing History', icon: FileText },
    { id: 'reports', name: 'Financial Reports', icon: Download }
  ];

  private billingService = inject(BillingService);
  public filtersService = inject(BillingPaymentsFiltersService);

  constructor() {
    effect(() => {
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.loadBillingData();
  }

  loadBillingData(): void {
    this.billingService.getBillingOverview().subscribe(overview => {
      this.overview = overview;
    });

    this.billingService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filters = this.filtersService.filters();
    
    this.filteredInvoices = this.invoices.filter(invoice => {
      // Search term filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!invoice.invoiceNumber.toLowerCase().includes(searchLower) &&
            !invoice.customerName.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Status filter
      if (filters.status && invoice.status !== filters.status) {
        return false;
      }

      // Customer filter
      if (filters.customer && !invoice.customerName.toLowerCase().includes(filters.customer.toLowerCase())) {
        return false;
      }

      // Date from filter
      if (filters.dateFrom) {
        const dateFrom = new Date(filters.dateFrom);
        if (new Date(invoice.issueDate) < dateFrom) {
          return false;
        }
      }

      // Date to filter
      if (filters.dateTo) {
        const dateTo = new Date(filters.dateTo);
        if (new Date(invoice.issueDate) > dateTo) {
          return false;
        }
      }

      return true;
    });
  }

  getTabClass(tabId: string): string {
    return tabId === this.activeTab
      ? 'border-primary-500 text-primary-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  }

  getInvoiceStatusClass(status: string): string {
    switch (status) {
      case 'paid': return 'bg-success-100 text-success-800';
      case 'sent': return 'bg-primary-100 text-primary-800';
      case 'overdue': return 'bg-error-100 text-error-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(value: number | undefined): string {
    if (!value) return '0';
    return new Intl.NumberFormat('en-US').format(value);
  }
}