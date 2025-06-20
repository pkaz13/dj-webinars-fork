import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeOnboardingService } from '../employee-onboarding.service';

@Component({
  selector: 'app-employee-onboarding-step-01-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="animate-fade-in">
      <h2 class="text-xl font-semibold mb-6">Personal Information</h2>
      
      <button 
        type="button" 
        class="btn btn-secondary mb-4"
        (click)="loadMockData()">
        Load Mock Data
      </button>

      <form [formGroup]="formGroup()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input type="text" id="name" formControlName="name" class="form-control" [class.border-error-500]="isFieldInvalid('name')" />
            @if (isFieldInvalid('name')) {
              <p class="mt-1 text-sm text-error-500">Name is required</p>
            }
          </div>
          
          <div class="form-group">
            <label for="contactEmail" class="form-label">Email</label>
            <input type="email" id="contactEmail" formControlName="contactEmail" class="form-control" [class.border-error-500]="isFieldInvalid('contactEmail')" />
            @if (isFieldInvalid('contactEmail')) {
              <p class="mt-1 text-sm text-error-500">Valid email is required</p>
            }
          </div>
          
          <div class="form-group">
            <label for="hireDate" class="form-label">Hire Date</label>
            <input type="date" id="hireDate" formControlName="hireDate" class="form-control" [class.border-error-500]="isFieldInvalid('hireDate')" />
            @if (isFieldInvalid('hireDate')) {
              <p class="mt-1 text-sm text-error-500">Hire date is required</p>
            }
          </div>

          <div class="form-group">
            <label for="dateOfBirth" class="form-label">Date of Birth</label>
            <input type="date" id="dateOfBirth" formControlName="dateOfBirth" class="form-control" [class.border-error-500]="isFieldInvalid('dateOfBirth')" />
            @if (isFieldInvalid('dateOfBirth')) {
              <p class="mt-1 text-sm text-error-500">Date of birth is required</p>
            }
          </div>

          <div class="md:col-span-2 mt-4">
            <h3 class="text-lg font-medium mb-4">Address</h3>
          </div>
          
          <div class="form-group md:col-span-2">
            <label for="address" class="form-label">Street Address</label>
            <input type="text" id="address" formControlName="address" class="form-control" [class.border-error-500]="isFieldInvalid('address')" />
            @if (isFieldInvalid('address')) {
              <p class="mt-1 text-sm text-error-500">Address is required</p>
            }
          </div>
          
          <div class="form-group">
            <label for="city" class="form-label">City</label>
            <input type="text" id="city" formControlName="city" class="form-control" [class.border-error-500]="isFieldInvalid('city')" />
            @if (isFieldInvalid('city')) {
              <p class="mt-1 text-sm text-error-500">City is required</p>
            }
          </div>
          
          <div class="form-group">
            <label for="postalCode" class="form-label">Zip Code</label>
            <input type="text" id="postalCode" formControlName="postalCode" class="form-control" [class.border-error-500]="isFieldInvalid('postalCode')" />
            @if (isFieldInvalid('postalCode')) {
              <p class="mt-1 text-sm text-error-500">Zip code is required</p>
            }
          </div>
          
          <div class="form-group">
            <label for="country" class="form-label">Country</label>
            <input type="text" id="country" formControlName="country" class="form-control" [class.border-error-500]="isFieldInvalid('country')" />
            @if (isFieldInvalid('country')) {
              <p class="mt-1 text-sm text-error-500">Country is required</p>
            }
          </div>

          <div class="md:col-span-2 mt-4">
            <h3 class="text-lg font-medium mb-4">Other Information</h3>
          </div>

           <div class="form-group">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" formControlName="gender" class="form-control" [class.border-error-500]="isFieldInvalid('gender')">
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            @if (isFieldInvalid('gender')) {
              <p class="mt-1 text-sm text-error-500">Gender is required</p>
            }
          </div>

          <div class="form-group">
            <label for="nationality" class="form-label">Nationality</label>
            <input type="text" id="nationality" formControlName="nationality" class="form-control" [class.border-error-500]="isFieldInvalid('nationality')" />
            @if (isFieldInvalid('nationality')) {
              <p class="mt-1 text-sm text-error-500">Nationality is required</p>
            }
          </div>

        </div>
        
        <div class="flex justify-end mt-8">
          <button 
            type="button" 
            class="btn btn-primary"
            [disabled]="isNextDisabled()"
            (click)="onNext()">
            Continue to Job Information
            <span class="material-icons ml-1">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class EmployeeOnboardingStep01PersonalInfoComponent {
  formGroup = input.required<FormGroup>();
  goToNext = output<void>();
  private employeeOnboardingService = inject(EmployeeOnboardingService);

  isFieldInvalid(field: string): boolean {
    const control = this.formGroup().get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  isNextDisabled(): boolean {
    const personalInfoControls = [
      'name', 
      'contactEmail', 
      'hireDate', 
      'address',
      'postalCode',
      'city',
      'country',
      'dateOfBirth',
      'gender',
      'nationality'
    ];
    
    return personalInfoControls.some(control => {
      const formControl = this.formGroup().get(control);
      return formControl?.invalid;
    });
  }

  onNext(): void {
    if (!this.isNextDisabled()) {
      this.goToNext.emit();
    } else {
      this.formGroup().markAllAsTouched();
    }
  }

  loadMockData(): void {
    this.formGroup().patchValue(this.employeeOnboardingService.getPersonalInfoMockData());
  }
}
