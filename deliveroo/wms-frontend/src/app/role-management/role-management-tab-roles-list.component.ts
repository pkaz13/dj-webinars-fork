import { Component, input, output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Role } from '../employees/employees.interfaces';
import { LucideAngularModule, Shield, Search, Edit, Trash2, Eye } from 'lucide-angular';

@Component({
  selector: 'app-role-management-tab-roles-list',
  standalone: true,
  imports: [FormsModule, LucideAngularModule],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">All Roles</h3>
        <div class="flex space-x-3">
          <div class="relative">
            <lucide-icon [img]="SearchIcon" size="18" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></lucide-icon>
            <input type="text" 
                   [value]="searchTerm()"
                   (input)="onSearchChange($any($event.target).value)"
                   placeholder="Search roles..."
                   class="input pl-10 w-64">
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (role of filteredRoles(); track role.name) {
          <div class="card p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center">
                <div class="p-2 bg-primary-100 rounded-lg mr-3">
                  <lucide-icon [img]="ShieldIcon" size="20" class="text-primary-600"></lucide-icon>
                </div>
                <div>
                  <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ role.name }}</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ role.assignedUsers.length }} users assigned</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <button (click)="onEditRole(role)" class="p-1 text-gray-400 hover:text-primary-600">
                  <lucide-icon [img]="EditIcon" size="16"></lucide-icon>
                </button>
                <button (click)="onDeleteRole(role)" class="p-1 text-gray-400 hover:text-error-600">
                  <lucide-icon [img]="Trash2Icon" size="16"></lucide-icon>
                </button>
              </div>
            </div>
            
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ role.description }}</p>
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Permissions:</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ role.permissions.length }}</span>
              </div>
              <div class="flex flex-wrap gap-1">
                @for (permission of role.permissions.slice(0, 3); track permission.name) {
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ permission.name }}
                  </span>
                }
                @if (role.permissions.length > 3) {
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{{ role.permissions.length - 3 }} more
                  </span>
                }
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-dark-600">
              <button (click)="onViewRoleDetails(role)" class="btn btn-secondary w-full">
                <lucide-icon [img]="EyeIcon" size="16" class="mr-2"></lucide-icon>
                View Details
              </button>
            </div>
          </div>
        } @empty {
          <div class="text-center py-12 md:col-span-2 lg:col-span-3">
            <lucide-icon [img]="ShieldIcon" size="48" class="mx-auto text-gray-400 mb-4"></lucide-icon>
            <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No roles found</h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search criteria or create a new role.</p>
          </div>
        }
      </div>
    </div>
  `
})
export class RoleManagementTabRolesListComponent {
  // Signal-based inputs
  roles = input<Role[]>([]);
  filteredRoles = input<Role[]>([]);
  searchTerm = input<string>('');

  // Outputs
  searchChange = output<string>();
  editRole = output<Role>();
  deleteRole = output<Role>();
  viewRoleDetails = output<Role>();

  // Lucide icons
  ShieldIcon = Shield;
  SearchIcon = Search;
  EditIcon = Edit;
  Trash2Icon = Trash2;
  EyeIcon = Eye;

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  onEditRole(role: Role): void {
    this.editRole.emit(role);
  }

  onDeleteRole(role: Role): void {
    this.deleteRole.emit(role);
  }

  onViewRoleDetails(role: Role): void {
    this.viewRoleDetails.emit(role);
  }
}