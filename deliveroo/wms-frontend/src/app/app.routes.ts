import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'cargo-management',
        loadComponent: () => import('./cargo-management/cargo-management.component').then(m => m.CargoManagementComponent)
      },
      {
        path: 'cargo-management/:id',
        loadComponent: () => import('./cargo-management/cargo-detail.component').then(m => m.CargoDetailComponent)
      },
      {
        
        path: 'warehouse-operations',
        loadComponent: () => import('./warehouse-operations/warehouse-operations.component').then(m => m.WarehouseOperationsComponent)
      },
      {
        path: 'storage-requests',
        loadComponent: () => import('./storage-requests/storage-requests.component').then(m => m.StorageRequestsComponent)
      },
      {
        path: 'storage-requests/:id',
        loadComponent: () => import('./storage-requests/storage-request-detail.component').then(m => m.StorageRequestDetailComponent)
      },
      {
        path: 'reservations',
        loadComponent: () => import('./reservations/reservations.component').then(m => m.ReservationsComponent)
      },
      {
        path: 'warehouse-map',
        loadComponent: () => import('./warehouse-map/warehouse-map.component').then(m => m.WarehouseMapComponent)
      },
      {
        path: 'dock-management',
        loadComponent: () => import('./dock-management/dock-management.component').then(m => m.DockManagementComponent)
      },
      {
        path: 'dock-management/:id',
        loadComponent: () => import('./dock-management/dock-detail.component').then(m => m.DockDetailComponent)
      },
      {
        path: 'billing-payments',
        loadComponent: () => import('./billing-payments/billing-payments.component').then(m => m.BillingPaymentsComponent)
      },
      {
        path: 'billing-payments/invoice/:id',
        loadComponent: () => import('./billing-payments/invoice-detail.component').then(m => m.InvoiceDetailComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./customers/customers.component').then(m => m.CustomersComponent)
      },
      {
        path: 'customers/:id',
        loadComponent: () => import('./customers/customer-detail.component').then(m => m.CustomerDetailComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./employees/employees.component').then(m => m.EmployeesComponent),
        data: { role: 'Warehouse Manager' }
      },
      {
        path: 'employees/:id',
        loadComponent: () => import('./employees/employee-detail.component').then(m => m.EmployeeDetailComponent),
        data: { role: 'Warehouse Manager' }
      },
      
      {
        path: 'role-management',
        loadComponent: () => import('./role-management/role-management.component').then(m => m.RoleManagementComponent),
        data: { role: 'Warehouse Manager' }
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent),
        data: { role: 'Warehouse Manager' }
      },
      // Legacy route redirect
      {
        path: 'inventory',
        redirectTo: '/cargo-management',
        pathMatch: 'full'
      },
      // Legacy users route redirect
      {
        path: 'users',
        redirectTo: '/employees',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];