import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  isDarkMode = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  // Admin and Corporation Data
  regData = {
    email: '',
    password: '',
    fullName: '',
    companyName: ''
  };

  toggleTheme() {
    this.isDarkMode.update(val => !val);
    document.documentElement.classList.toggle('dark');
  }

  async onRegister() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      // 1. Create the Admin account in Supabase
      const { data, error } = await this.supabase.auth.signUp({
        email: this.regData.email,
        password: this.regData.password,
        options: {
          data: {
            full_name: this.regData.fullName,
            company_name: this.regData.companyName,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // 2. Sync with NestJS to create Corporation and get Stripe Checkout URL
        const syncPayload = {
          id: data.user.id,
          email: data.user.email,
          fullName: this.regData.fullName,
          companyName: this.regData.companyName,
          role: 'ADMIN' // Explicitly setting role for corporation setup
        };

        this.http.post(`${environment.apiUrl}/auth/sync`, syncPayload).subscribe({
          next: (res: any) => {
            // 3. Redirect to Stripe Checkout for subscription
            if (res.checkoutUrl) {
              window.location.href = res.checkoutUrl;
            } else {
              this.router.navigate(['/admin/dashboard']);
            }
          },
          error: (err) => {
            console.error('Registration sync failed:', err);
            this.errorMessage.set('Corporation initialization failed. Please try again.');
            this.isLoading.set(false);
          }
        });
      }
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Registration failed');
      this.isLoading.set(false);
    }
  }
}