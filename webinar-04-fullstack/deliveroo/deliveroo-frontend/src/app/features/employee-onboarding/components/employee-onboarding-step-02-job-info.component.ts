import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRole, EmployeeStatus } from '../employee.model';

@Component({
  selector: 'app-employee-onboarding-step-02-job-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="animate-fade-in">
      <h2 class="text-xl font-semibold mb-6">Job Information</h2>

      <form [formGroup]="formGroup()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label for="role" class="form-label">Role</label>
            <select id="role" formControlName="role" class="form-control" [class.border-error-500]="isFieldInvalid('role')">
              @for(role of employeeRoles; track role) {
                <option [value]="role">{{ role | titlecase }}</option>
              }
            </select>
            @if (isFieldInvalid('role')) {
              <p class="mt-1 text-sm text-error-500">Role is required</p>
            }
          </div>

          <div class="form-group">
            <label for="status" class="form-label">Status</label>
            <select id="status" formControlName="status" class="form-control" [class.border-error-500]="isFieldInvalid('status')">
              @for(status of employeeStatuses; track status) {
                <option [value]="status">{{ status | titlecase }}</option>
              }
            </select>
            @if (isFieldInvalid('status')) {
              <p class="mt-1 text-sm text-error-500">Status is required</p>
            }
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button type="button" class="btn btn-secondary" (click)="onBack()">
            <span class="material-icons mr-1">arrow_back</span>
            Back
          </button>
          <button type="button" class="btn btn-primary" [disabled]="isSubmitDisabled()" (click)="onSubmit()">
            Submit Onboarding
            <span class="material-icons ml-1">check_circle</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class EmployeeOnboardingStep02JobInfoComponent {
  formGroup = input.required<FormGroup>();
  submitForm = output<void>();
  goBack = output<void>();

  employeeRoles = Object.values(EmployeeRole);
  employeeStatuses = Object.values(EmployeeStatus);

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup().get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isSubmitDisabled(): boolean {
    return this.formGroup().get('role')?.invalid || this.formGroup().get('status')?.invalid || false;
  }

  onSubmit(): void {
    if (!this.isSubmitDisabled()) {
      this.submitForm.emit();
    } else {
      this.formGroup().get('role')?.markAsTouched();
      this.formGroup().get('status')?.markAsTouched();
    }
  }

  onBack(): void {
    this.goBack.emit();
  }
}
