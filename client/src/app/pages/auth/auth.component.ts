import { Component, signal, inject, OnInit, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { crossFadeTrigger } from './auth.animations';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  animations: [crossFadeTrigger],
  templateUrl: './auth.component.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  isDarkMode = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  authData = {
    email: '',
    password: ''
  };

  constructor() {
    // afterNextRender ensures this only runs in the browser, 
    // fixing the "document is not defined" error.
    afterNextRender(() => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     localStorage.getItem('theme') === 'dark';
      
      this.isDarkMode.set(isDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(val => !val);
    
    // Safety check for browser-only execution
    if (typeof document !== 'undefined') {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  async onAuthorize() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: this.authData.email,
        password: this.authData.password,
      });

      if (error) throw error;

      if (data.user) {
        const syncPayload = {
          id: data.user.id,
          email: data.user.email
        };

        this.http.post(`${environment.apiUrl}/auth/sync`, syncPayload).subscribe({
          next: (res: any) => {
            if (res.role === 'ADMIN') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/']);
            }
          },
          error: (err) => {
            console.error('Handshake failed:', err);
            this.errorMessage.set('System synchronization failure. Access denied.');
            this.isLoading.set(false);
          },
          complete: () => this.isLoading.set(false)
        });
      }
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Invalid Credentials');
      this.isLoading.set(false);
    }
  }
}