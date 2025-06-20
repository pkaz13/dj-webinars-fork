import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeOnboardingProgressTrackerComponent } from './components/employee-onboarding-progress-tracker.component';
import { EmployeeOnboardingStep01PersonalInfoComponent } from './components/employee-onboarding-step-01-personal-info.component';
import { EmployeeOnboardingStep02JobInfoComponent } from './components/employee-onboarding-step-02-job-info.component';
import { EmployeeRole, EmployeeStatus } from './employee.model';
import { EmployeeOnboardingHttpService } from './employee-onboarding-http.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employee-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    EmployeeOnboardingProgressTrackerComponent,
    EmployeeOnboardingStep01PersonalInfoComponent,
    EmployeeOnboardingStep02JobInfoComponent,
  ],
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">New Employee Onboarding</h1>

        <div class="mb-10">
          <app-employee-onboarding-progress-tracker
            [steps]="steps"
            [currentStep]="currentStep"
            [visitedSteps]="visitedSteps"
            (stepClicked)="goToStep($event)">
          </app-employee-onboarding-progress-tracker>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-6 md:p-8 mb-8 animate-fade-in">
          @switch (currentStep) {
            @case (0) {
              <app-employee-onboarding-step-01-personal-info
                [formGroup]="employeeOnboardingForm"
                (goToNext)="nextStep()">
              </app-employee-onboarding-step-01-personal-info>
            }
            @case (1) {
              <app-employee-onboarding-step-02-job-info
                [formGroup]="employeeOnboardingForm"
                (submitForm)="submitForm()"
                (goBack)="prevStep()">
              </app-employee-onboarding-step-02-job-info>
            }
          }
        </div>

        @if (formSubmitted) {
          <div class="bg-success-50 border border-success-200 text-success-700 px-4 py-5 rounded-lg text-center animate-fade-in">
            <span class="material-icons text-success-500 text-4xl">check_circle</span>
            <h3 class="text-xl font-semibold mt-2 mb-1">Employee Onboarded Successfully!</h3>
            <p class="mb-4">The new employee has been added to the system.</p>
            <div class="mt-6">
              <a routerLink="/personnel" class="btn btn-primary">Return to Personnel List</a>
            </div>
          </div>
        }

        @if (submissionError) {
          <div class="bg-error-50 border border-error-200 text-error-700 px-4 py-5 rounded-lg text-center animate-fade-in">
            <span class="material-icons text-error-500 text-4xl">error</span>
            <h3 class="text-xl font-semibold mt-2 mb-1">Submission Failed</h3>
            <p class="mb-4">{{ submissionError }}</p>
          </div>
        }
      </div>
    </div>
  `
})
export class EmployeeOnboardingComponent {
  private fb = inject(FormBuilder);
  private employeeOnboardingHttpService = inject(EmployeeOnboardingHttpService);

  steps = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'job', label: 'Job Information' },
  ];

  currentStep = 0;
  formSubmitted = false;
  visitedSteps = new Set<number>([0]);
  isSubmitting = false;
  submissionError: string | null = null;

  employeeOnboardingForm: FormGroup = this.fb.group({
    // Step 1: Personal Information
    name: ['', Validators.required],
    contactEmail: ['', [Validators.required, Validators.email]],
    hireDate: [null, Validators.required],
    address: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    dateOfBirth: [null, Validators.required],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],

    // Step 2: Job Information
    role: [EmployeeRole.Driver, Validators.required],
    status: [EmployeeStatus.Active, Validators.required],
  });

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.visitedSteps.add(this.currentStep);
      this.scrollToTop();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.scrollToTop();
    }
  }

  goToStep(stepIndex: number) {
    if (this.visitedSteps.has(stepIndex) || stepIndex === this.currentStep) {
      this.currentStep = stepIndex;
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  submitForm() {
    if (this.employeeOnboardingForm.valid) {
      this.isSubmitting = true;
      this.submissionError = null;
      this.employeeOnboardingHttpService.addEmployee(this.employeeOnboardingForm.value)
        .pipe(
          finalize(() => this.isSubmitting = false)
        )
        .subscribe({
          next: () => {
            this.formSubmitted = true;
            this.scrollToTop();
          },
          error: (err) => {
            this.submissionError = err.message;
            this.scrollToTop();
          }
        });
    } else {
      this.employeeOnboardingForm.markAllAsTouched();
    }
  }
}
