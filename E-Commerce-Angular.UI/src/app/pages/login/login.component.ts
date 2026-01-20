import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SignupComponent } from "./signup/signup.component";

// TODO: Hide header when on login/signup page
// TODO: Implement actual POST for creating user
// TODO: Implement actual authentication service
// TODO: Prevent access to any page without authentication
// TODO: When signing up, check if Username is available

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignupComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-start pt-12 p-4">
      <div class="w-full max-w-2xl">
        <!-- Logo/Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">E-Shop</h1>
          <p class="text-gray-400">{{ isSignUp ? 'Create your account' : 'Welcome back' }}</p>
        </div>

        <!-- Login/SignUp Card -->
        <div class="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          
          <!-- LOGIN FORM -->
          <form *ngIf="!isSignUp" [formGroup]="loginForm" (ngSubmit)="onLoginSubmit()" class="space-y-6">
            
            <!-- Email Field -->
            <div>
              <label for="login-email" class="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                formControlName="email"
                placeholder="you@example.com"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</p>
                <p *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</p>
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="login-password" class="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                formControlName="password"
                placeholder="••••••••"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</p>
                <p *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</p>
              </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center">
              <input
                id="remember"
                type="checkbox"
                formControlName="rememberMe"
                class="w-4 h-4 bg-gray-700 border border-gray-600 rounded cursor-pointer focus:ring-blue-500"
              />
              <label for="remember" class="ml-2 text-sm text-gray-400 cursor-pointer">
                Remember me
              </label>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {{ isLoading ? 'Logging in...' : 'Sign In' }}
            </button>

            <!-- Error Message -->
            <div *ngIf="errorMessage" class="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
              {{ errorMessage }}
            </div>

            <!-- Success Message -->
            <div *ngIf="successMessage" class="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg text-sm">
              {{ successMessage }}
            </div>
          </form>

          <!-- SIGNUP FORM -->
          <app-signup *ngIf="isSignUp" />

          <!-- Footer Links -->
          <div class="mt-6 text-center space-y-2 text-sm">
            <p class="text-gray-400">
              {{ isSignUp ? 'Already have an account?' : "Don't have an account?" }}
              <button
                (click)="toggleForm()"
                class="text-blue-400 hover:text-blue-300 font-medium bg-none border-none cursor-pointer"
              >
                {{ isSignUp ? 'Sign in' : 'Sign up' }}
              </button>
            </p>
            <p *ngIf="!isSignUp" class="text-gray-400">
              <a href="#" class="text-blue-400 hover:text-blue-300 font-medium">Forgot password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class LoginComponent {
  loginForm: FormGroup;
  isSignUp = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  toggleForm() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = false;
    this.loginForm.reset();
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password, rememberMe } = this.loginForm.value;

    // TODO: Replace with actual authentication service call
    console.log('Login attempt:', { email, password, rememberMe });

    // Simulated API call (replace with actual service)
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Login successful! Redirecting...';
      
      // Redirect to dashboard or products page
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 1500);
    }, 1500);
  }
}
