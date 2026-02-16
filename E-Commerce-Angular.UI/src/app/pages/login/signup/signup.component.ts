import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

// TODO: Add validation if Username already exists
// TODO: Add password strength validation
// TODO: Add redirect where you're logged in with newly created account

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- SIGNUP FORM -->
          <form [formGroup]="signupForm" (ngSubmit)="onSignupSubmit()" class="space-y-6">
            <!-- Username Field -->
            <div>
              <label for="userName" class="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="userName"
                type="text"
                formControlName="userName"
                placeholder="Username"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="signupForm.get('userName')?.invalid && signupForm.get('userName')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="signupForm.get('userName')?.errors?.['required']">Username is required</p>
                <p *ngIf="signupForm.get('userName')?.errors?.['minlength']">Username must be at least 3 characters</p>
              </div>
            </div>

            <!-- First Name Field -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                formControlName="firstName"
                placeholder="John"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="signupForm.get('firstName')?.invalid && signupForm.get('firstName')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="signupForm.get('firstName')?.errors?.['required']">First name is required</p>
              </div>
            </div>

             <!-- Last Name Field -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                formControlName="lastName"
                placeholder="Doe"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="signupForm.get('lastName')?.invalid && signupForm.get('lastName')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="signupForm.get('lastName')?.errors?.['required']">Last name is required</p>
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label for="signup-email" class="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                formControlName="email"
                placeholder="you@example.com"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="signupForm.get('email')?.invalid && signupForm.get('email')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="signupForm.get('email')?.errors?.['required']">Email is required</p>
                <p *ngIf="signupForm.get('email')?.errors?.['email']">Please enter a valid email</p>
              </div>
            </div>

            <!-- Password Field -->
            <div>
              <label for="signup-password" class="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                formControlName="password"
                placeholder="••••••••"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="signupForm.get('password')?.invalid && signupForm.get('password')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="signupForm.get('password')?.errors?.['required']">Password is required</p>
                <p *ngIf="signupForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</p>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                formControlName="confirmPassword"
                placeholder="••••••••"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              <div *ngIf="signupForm.get('confirmPassword')?.invalid && signupForm.get('confirmPassword')?.touched" class="mt-1 text-sm text-red-400">
                <p *ngIf="signupForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</p>
                <p *ngIf="signupForm.get('confirmPassword')?.errors?.['passwordMismatch']">Passwords do not match</p>
              </div>
            </div>

            <!-- Terms & Conditions -->
            <div class="flex items-center">
              <input
                id="terms"
                type="checkbox"
                formControlName="agreeToTerms"
                class="w-4 h-4 bg-gray-700 border border-gray-600 rounded cursor-pointer focus:ring-blue-500"
              />
              <label for="terms" class="ml-2 text-sm text-gray-400 cursor-pointer">
                I agree to the Terms and Conditions
              </label>
            </div>
            <div *ngIf="signupForm.get('agreeToTerms')?.invalid && signupForm.get('agreeToTerms')?.touched" class="text-sm text-red-400">
              You must agree to the terms
            </div>

            <!-- Signup Button -->
            <button
              type="submit"
              [disabled]="signupForm.invalid || isLoading"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {{ isLoading ? 'Creating account...' : 'Create Account' }}
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
  `,
  styles: ``
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {

    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSignupSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // TODO: Add messageService like from in products-manage
    const userData = this.signupForm.value;

    // TODO: When given back the time it will be in my central local timezone. Best to standardize for everyone or something.
    //       I like for it to be central in the backend for development purpose but in the case someone lives else where will
    //       need to convert it to their local timezone.
    this.userService.AddUser(userData).subscribe({
      next: (result: User) => {
        this.isLoading = false;
        this.successMessage = 'Account created successfully! Redirecting...';},
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while creating the account. Please try again.';
        console.error('Signup error:', err);
      }
    });
  }
}
