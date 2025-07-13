import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { Heading2Component, Heading4Component } from '../ui-library/Typography/Typography.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ForgotPasswordComponent, Heading2Component, Heading4Component],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div class="max-w-md w-full space-y-8 p-8">
        @if (showForgotPassword()) {
          <div class="card p-8">
            <app-forgot-password (backToLogin)="showForgotPassword.set(false)"></app-forgot-password>
          </div>
        } @else {
          <div class="text-center">
            <div class="mx-auto h-16 w-16 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <ui-heading2 class="text-white">Warehouse Management System</ui-heading2>
            <p class="mt-2 text-gray-300">Sign in to your account</p>
          </div>

          <div class="card p-8">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="space-y-6">
                <div>
                  <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    formControlName="username"
                    class="input mt-1"
                    placeholder="Enter your username"
                  >
                  @if (loginForm.get('username')?.invalid && loginForm.get('username')?.touched) {
                    <div class="mt-1 text-sm text-error-600">
                      Username is required
                    </div>
                  }
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    formControlName="password"
                    class="input mt-1"
                    placeholder="Enter your password"
                  >
                  @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                    <div class="mt-1 text-sm text-error-600">
                      Password is required
                    </div>
                  }
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      formControlName="rememberMe"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    >
                    <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div class="text-sm">
                    <a (click)="showForgotPassword.set(true)" class="font-medium text-primary-600 hover:text-primary-500 cursor-pointer">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                @if (error()) {
                  <div class="text-sm text-error-600 text-center">
                    {{ error() }}
                  </div>
                }

                <button
                  type="submit"
                  [disabled]="loginForm.invalid || loading()"
                  class="btn btn-primary w-full"
                >
                  @if (loading()) {
                    <span class="inline-block animate-spin h-4 w-4 mr-2">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  }
                  {{ loading() ? 'Signing in...' : 'Sign in' }}
                </button>
              </div>
            </form>

            <div class="mt-6 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <ui-heading4 class="text-gray-700 dark:text-gray-300 mb-2">Demo Credentials:</ui-heading4>
              <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <div><strong>Manager:</strong> manager / password</div>
                <div><strong>Coordinator:</strong> coordinator / password</div>
                <div><strong>Worker:</strong> worker / password</div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: WritableSignal<boolean> = signal(false);
  error: WritableSignal<string> = signal('');
  showForgotPassword: WritableSignal<boolean> = signal(false);

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigate([returnUrl]);
      },
      error: (error) => {
        this.error.set(error.message || 'Login failed. Please try again.');
        this.loading.set(false);
      }
    });
  }
}