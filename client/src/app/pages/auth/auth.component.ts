import { Component, signal, inject, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SupabaseService } from '../../services/supabase.service'; // Import Service
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
  private supabaseService = inject(SupabaseService); // Inject the Singleton

  isDarkMode = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  authData = { email: '', password: '' };

  constructor() {
    afterNextRender(() => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     localStorage.getItem('theme') === 'dark';
      this.isDarkMode.set(isDark);
      if (isDark) document.documentElement.classList.add('dark');
    });
  }

async onAuthorize() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
        email: this.authData.email,
        password: this.authData.password,
      });

      if (error) throw error;

      if (data?.user) {
        const syncPayload = {
          id: data.user.id,
          email: data.user.email
        };

        const res: any = await firstValueFrom(
          this.http.post(`${environment.apiUrl}/auth/sync`, syncPayload)
        ).catch(err => {
          // If the sync call is aborted but we have the ID, try to proceed
          if (err.name === 'AbortError') return { role: 'ADMIN', id: data.user.id };
          throw err;
        });

        if (res && res.role === 'ADMIN') {
          await this.router.navigate(['/admin/dashboard/home', res.id]);
          return; // Path 1: Success Admin
        } else {
          await this.router.navigate(['/']);
          return; // Path 2: Success Other
        }
      }
      
      // Path 3: Success but no user data (fallback)
      return;

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        this.errorMessage.set(error.message || 'Invalid Credentials');
      }
      console.warn('Auth handled:', error.name);
      return; // Path 4: Caught Error
    } finally {
      this.isLoading.set(false);
    }
  }

  toggleTheme() {
    this.isDarkMode.update(val => !val);
    document.documentElement.classList.toggle('dark', this.isDarkMode());
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }
}