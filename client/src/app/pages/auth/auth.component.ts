import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { crossFadeTrigger } from './auth.animations';
import { environment } from '../../../environments/environment'; // Adjust path as needed

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [crossFadeTrigger],
  templateUrl: './auth.component.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Initialize Supabase
  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  // Operational States
  isLoginMode = signal(true);
  isDarkMode = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  // Form State
  authData = {
    email: '',
    password: '',
    fullName: '',
    companyName: '', 
    role: 'ADMIN'     
  };

  toggleMode() {
    this.isLoginMode.update(val => !val);
    this.errorMessage.set('');
  }

  toggleTheme() {
    this.isDarkMode.update(val => !val);
    document.documentElement.classList.toggle('dark');
  }

  async onAuthorize() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      let authResponse;

      if (this.isLoginMode()) {
        // 1a. Supabase Login
        authResponse = await this.supabase.auth.signInWithPassword({
          email: this.authData.email,
          password: this.authData.password,
        });
      } else {
        // 1b. Supabase Sign Up
        authResponse = await this.supabase.auth.signUp({
          email: this.authData.email,
          password: this.authData.password,
          options: {
            data: {
              full_name: this.authData.fullName,
              company_name: this.authData.companyName,
            }
          }
        });
      }

      if (authResponse.error) throw authResponse.error;

      const user = authResponse.data.user;

      if (user) {
        // 2. Call NestJS /auth/sync endpoint to populate your PG tables
        const syncPayload = {
          id: user.id,
          email: user.email,
          fullName: this.authData.fullName,
          role: this.isLoginMode() ? undefined : 'ADMIN' // Only force ADMIN on signup
        };

        this.http.post(`${environment.apiUrl}/auth/sync`, syncPayload).subscribe({
          next: (res: any) => {
            console.log('Sync Successful:', res);
            // 3. Route based on role
            if (res.role === 'ADMIN') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/user', res.id]);
            }
          },
          error: (err) => {
            console.error('Sync failed:', err);
            this.errorMessage.set('Database sync failed. Please contact support.');
          },
          complete: () => this.isLoading.set(false)
        });
      }
    } catch (error: any) {
      this.errorMessage.set(error.message || 'An authentication error occurred');
      this.isLoading.set(false);
    }
  }
}