import { Component, OnInit, inject, effect, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LucideAngularModule, SquareChevronLeft, SquareChevronRight, Bell, LogOut, BarChart3, Package, FileText, MapPin, Truck, Users, CreditCard, Home, Calendar, UserCheck, Settings, Shield, Cog, X } from 'lucide-angular';

import { AuthService } from './auth/auth.service';
import { NotificationService, ToastNotification } from './notifications/notification.service';
import { Notification } from './notifications/notification.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, 
            LucideAngularModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
      <!-- Sidebar -->
      <div class="fixed inset-y-0 left-0 z-50 bg-white dark:bg-dark-800 shadow-lg transition-all duration-300 ease-in-out"
           [class.w-64]="!sidebarCollapsed"
           [class.w-16]="sidebarCollapsed">
        <!-- Logo -->
        <div class="flex items-center h-16 px-4 border-b border-gray-200 dark:border-dark-700"
             [class.justify-center]="sidebarCollapsed"
             [class.justify-between]="!sidebarCollapsed">
          <a routerLink="/dashboard" class="flex items-center hover:opacity-80 transition-opacity">
            <div class="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            @if (!sidebarCollapsed) {
              <span class="ml-2 text-lg font-semibold text-gray-900 dark:text-white">WMS</span>
            }
          </a>
          @if (!sidebarCollapsed) {
            <button (click)="toggleSidebar()"
                    class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <lucide-icon [img]="SquareChevronLeftIcon" size="20"></lucide-icon>
            </button>
          }
        </div>

        <!-- Collapse button when sidebar is collapsed -->
        @if (sidebarCollapsed) {
          <div class="flex justify-center mt-4">
            <button (click)="toggleSidebar()"
                    class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <lucide-icon [img]="SquareChevronRightIcon" size="20"></lucide-icon>
            </button>
          </div>
        }

        <!-- Navigation -->
        <nav class="mt-5 px-2">
          <div class="space-y-1">
            <a routerLink="/dashboard" 
               [class.active]="isRouteActive('/dashboard')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="HomeIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Dashboard</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Dashboard</div>
              }
            </a>

            @if (canAccessReports()) {
              <a routerLink="/reports" 
                 [class.active]="isRouteActive('/reports')"
                 class="sidebar-nav-item group"
                 [class.justify-center]="sidebarCollapsed">
                <lucide-icon [img]="BarChart3Icon" size="20" class="flex-shrink-0"></lucide-icon>
                @if (!sidebarCollapsed) {
                  <span class="ml-3">Reports</span>
                }
                @if (sidebarCollapsed) {
                  <div class="tooltip">Reports</div>
                }
              </a>
            }
            
            <a routerLink="/reservations" 
               [class.active]="isRouteActive('/reservations')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="CalendarIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Reservations</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Reservations</div>
              }
            </a>

            <a routerLink="/cargo-management" 
               [class.active]="isRouteActive('/cargo-management')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="PackageIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Cargo Management</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Cargo Management</div>
              }
            </a>

            <a routerLink="/warehouse-operations" 
               [class.active]="isRouteActive('/warehouse-operations')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="CogIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Warehouse Operations</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Warehouse Operations</div>
              }
            </a>

            <a routerLink="/storage-requests" 
               [class.active]="isRouteActive('/storage-requests')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="FileTextIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Storage Requests</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Storage Requests</div>
              }
            </a>

            <a routerLink="/dock-management" 
               [class.active]="isRouteActive('/dock-management')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="TruckIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Dock Management</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Dock Management</div>
              }
            </a>

            <a routerLink="/warehouse-map" 
               [class.active]="isRouteActive('/warehouse-map')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="MapPinIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Warehouse Map</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Warehouse Map</div>
              }
            </a>

            <a routerLink="/customers" 
               [class.active]="isRouteActive('/customers')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="UsersIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Customers</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Customers</div>
              }
            </a>

            <a routerLink="/billing-payments" 
               [class.active]="isRouteActive('/billing-payments')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="CreditCardIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Billing & Payments</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Billing & Payments</div>
              }
            </a>

            @if (canAccessEmployeeManagement()) {
              <a routerLink="/employees" 
                 [class.active]="isRouteActive('/employees')"
                 class="sidebar-nav-item group"
                 [class.justify-center]="sidebarCollapsed">
                <lucide-icon [img]="UserCheckIcon" size="20" class="flex-shrink-0"></lucide-icon>
                @if (!sidebarCollapsed) {
                  <span class="ml-3">Employees</span>
                }
                @if (sidebarCollapsed) {
                  <div class="tooltip">Employees</div>
                }
              </a>
            }

            @if (canAccessRoleManagement()) {
              <a routerLink="/role-management" 
                 [class.active]="isRouteActive('/role-management')"
                 class="sidebar-nav-item group"
                 [class.justify-center]="sidebarCollapsed">
                <lucide-icon [img]="ShieldIcon" size="20" class="flex-shrink-0"></lucide-icon>
                @if (!sidebarCollapsed) {
                  <span class="ml-3">Role Management</span>
                }
                @if (sidebarCollapsed) {
                  <div class="tooltip">Role Management</div>
                }
              </a>
            }

            <a routerLink="/settings" 
               [class.active]="isRouteActive('/settings')"
               class="sidebar-nav-item group"
               [class.justify-center]="sidebarCollapsed">
              <lucide-icon [img]="SettingsIcon" size="20" class="flex-shrink-0"></lucide-icon>
              @if (!sidebarCollapsed) {
                <span class="ml-3">Settings</span>
              }
              @if (sidebarCollapsed) {
                <div class="tooltip">Settings</div>
              }
            </a>
          </div>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="transition-all duration-300 ease-in-out"
           [class.pl-64]="!sidebarCollapsed"
           [class.pl-16]="sidebarCollapsed">
        <!-- Top Bar -->
        <div class="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-700">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <!-- Breadcrumb or page title could go here -->
              </div>
              
              <!-- User Menu -->
              <div class="flex items-center space-x-4">
                <!-- Notifications -->
                <div class="relative">
                  <button (click)="toggleNotifications()" 
                          class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative">
                    <lucide-icon [img]="BellIcon" size="20"></lucide-icon>
                    @if (unreadNotifications() > 0) {
                      <span class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {{ unreadNotifications() }}
                      </span>
                    }
                  </button>
                  
                  <!-- Notifications Dropdown -->
                  @if (showNotifications) {
                    <div class="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 z-50">
                      <div class="p-4 border-b border-gray-200 dark:border-dark-700">
                        <div class="flex items-center justify-between">
                          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
                          <button (click)="markAllAsRead()" 
                                  class="text-sm text-primary-600 hover:text-primary-500">
                            Mark all read
                          </button>
                        </div>
                      </div>
                      <div class="max-h-96 overflow-y-auto">
                        @for (notification of notifications(); track notification.id) {
                          <div class="p-4 border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer"
                             [class.bg-blue-50]="!notification.isRead"
                             (click)="markAsRead(notification)">
                            <div class="flex items-start">
                              <div [class]="getNotificationIconClass(notification.type)" 
                                   class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                <lucide-icon [img]="getNotificationIcon(notification.type)" size="16"></lucide-icon>
                              </div>
                              <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ notification.title }}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ notification.message }}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ notification.createdAt | date:'MMM d, h:mm a' }}</p>
                              </div>
                              @if (!notification.isRead) {
                                <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              }
                            </div>
                          </div>
                        } @empty {
                          <div class="p-8 text-center">
                            <lucide-icon [img]="BellIcon" size="48" class="mx-auto text-gray-400 mb-4"></lucide-icon>
                            <p class="text-gray-500 dark:text-gray-400">No notifications</p>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>

                <!-- User Profile -->
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span class="text-sm font-medium text-white">
                        {{ currentUser()?.name?.charAt(0) || 'U' }}
                      </span>
                    </div>
                  </div>
                  <div class="hidden md:block">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ currentUser()?.name || 'User' }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ getUserRole() }}</div>
                  </div>
                  <button (click)="logout()" 
                          class="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <lucide-icon [img]="LogOutIcon" size="20"></lucide-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main class="p-4 sm:p-6 lg:p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
    
    <!-- Toast Notifications Container -->
    <div class="fixed top-5 right-5 z-[100] space-y-3">
      @for (toast of toastNotifications(); track toast.id) {
        <div [class]="getToastClass(toast.type)" 
             class="flex items-start p-4 rounded-lg shadow-lg w-80">
          <div class="flex-shrink-0" [class]="getToastIconClass(toast.type)">
            <lucide-icon [img]="getToastIcon(toast.type)" size="20"></lucide-icon>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium">{{ toast.title }}</p>
            @if(toast.message) {
              <p class="mt-1 text-sm">{{ toast.message }}</p>
            }
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button (click)="dismissToast(toast)" 
                    class="inline-flex rounded-md text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <span class="sr-only">Close</span>
              <lucide-icon [img]="XIcon" size="16"></lucide-icon>
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .tooltip {
      @apply absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50;
    }
    
    .group:hover .tooltip {
      @apply opacity-100;
    }
    
    .sidebar-nav-item {
      @apply flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-dark-700 relative text-gray-700 dark:text-gray-300;
    }
    
    .sidebar-nav-item.active {
      @apply bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300;
    }
  `]
})
export class LayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  // Lucide icons
  SquareChevronLeftIcon = SquareChevronLeft;
  SquareChevronRightIcon = SquareChevronRight;
  BellIcon = Bell;
  LogOutIcon = LogOut;
  BarChart3Icon = BarChart3;
  PackageIcon = Package;
  FileTextIcon = FileText;
  MapPinIcon = MapPin;
  TruckIcon = Truck;
  UsersIcon = Users;
  CreditCardIcon = CreditCard;
  HomeIcon = Home;
  CalendarIcon = Calendar;
  UserCheckIcon = UserCheck;
  SettingsIcon = Settings;
  ShieldIcon = Shield;
  CogIcon = Cog;
  XIcon = X;

  sidebarCollapsed = false;
  currentRoute = '';
  showNotifications = false;
  notifications = signal<Notification[]>([]);
  unreadNotifications = computed(() => this.notifications().filter(n => !n.isRead).length);
  
  toastNotifications = this.notificationService.toastNotifications;

  currentUser = this.authService.currentUser;

  constructor() {
    effect(() => {
      if (this.currentUser()) {
        this.loadNotifications();
      }
    });
  }

  ngOnInit(): void {
    // Track current route for active navigation highlighting
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications.set(notifications);
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(notification: Notification): void {
    this.notifications.update(notifications => 
      notifications.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(notifications => notifications.map(n => ({ ...n, isRead: true })));
  }

  dismissToast(toast: ToastNotification): void {
    this.notificationService.dismissToast(toast.id);
  }

  getNotificationIcon(type: string) {
    switch (type) {
      case 'success': return this.PackageIcon;
      case 'warning': return this.BellIcon;
      case 'error': return this.BellIcon;
      default: return this.BellIcon;
    }
  }

  getNotificationIconClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-success-100 text-success-600';
      case 'warning': return 'bg-warning-100 text-warning-600';
      case 'error': return 'bg-error-100 text-error-600';
      default: return 'bg-primary-100 text-primary-600';
    }
  }

  getToastIcon(type: string) {
    switch (type) {
      case 'success': return UserCheck;
      case 'error': return X;
      case 'warning': return Bell;
      case 'info': return Bell;
      default: return Bell;
    }
  }

  getToastIconClass(type: string): string {
    switch (type) {
      case 'success': return 'text-success-500';
      case 'error': return 'text-error-500';
      case 'warning': return 'text-warning-500';
      case 'info': return 'text-info-500';
      default: return 'text-gray-500';
    }
  }

  getToastClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-success-50 text-success-800 dark:bg-success-800 dark:text-success-50';
      case 'error': return 'bg-error-50 text-error-800 dark:bg-error-800 dark:text-error-50';
      case 'warning': return 'bg-warning-50 text-warning-800 dark:bg-warning-800 dark:text-warning-50';
      case 'info': return 'bg-info-50 text-info-800 dark:bg-info-800 dark:text-info-50';
      default: return 'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-50';
    }
  }

  isRouteActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }

  getUserRole(): string {
    const user = this.currentUser();
    if (!user) return 'Guest';
    return user.role.map(r => r.roleName).join(', ');
  }

  canAccessReports(): boolean {
    return this.authService.hasRole('Warehouse Manager');
  }

  canAccessEmployeeManagement(): boolean {
    return this.authService.hasRole('Warehouse Manager');
  }

  canAccessRoleManagement(): boolean {
    return this.authService.hasRole('Warehouse Manager');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}