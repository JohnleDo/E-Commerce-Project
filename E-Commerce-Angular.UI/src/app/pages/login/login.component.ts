import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SignupComponent } from "./signup/signup.component";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LoginResponse } from '../../models/api/login.response';
import { AuthService } from '../../services/authentication.service';

// TODO: Hide header when on login/signup page
// TODO: Implement actual authentication service
// TODO: Prevent access to any page without authentication
// TODO: Add "Remember me" functionality

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
              <label for="login-userName" class="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="login-userName"
                type="text"
                formControlName="userName"
                placeholder="Username"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="loginForm.get('userName')?.invalid && loginForm.get('userName')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="loginForm.get('userName')?.errors?.['required']">Username is required</p>
                <p *ngIf="loginForm.get('userName')?.errors?.['minlength']">Username must be at least 3 characters</p>
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

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
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

    const { userName, password, rememberMe } = this.loginForm.value;

    // TODO: Display error messages based on actual error (e.g. invalid credentials, server error, etc.)
    this.authService.UserLogin({ userName: userName, password }).subscribe({
          next: (result: LoginResponse) => {
            this.isLoading = false;
            console.log('Login successful:', result);
            this.successMessage = 'Login successful! Redirecting...';
            setTimeout(() => this.router.navigate(['/']), 1500); // 1.5s pause
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = 'An error occurred while trying to log in. Please try again.';
            console.error('Login error:', err);
          }
        });
  }
}
