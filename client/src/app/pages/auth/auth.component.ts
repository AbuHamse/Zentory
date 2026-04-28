import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { crossFadeTrigger } from './auth.animations';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [crossFadeTrigger],
  templateUrl: './auth.component.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  // Operational States
  isLoginMode = signal(true);
  isDarkMode = signal(false);

  // Form State
  authData = {
    email: '',
    password: '',
    fullName: ''
  };

  toggleMode() {
    this.isLoginMode.update(val => !val);
  }

  toggleTheme() {
    this.isDarkMode.update(val => !val);
    // Logic to update global body class if needed
    document.documentElement.classList.toggle('dark');
  }

  onAuthorize() {
    const payload = this.isLoginMode() 
      ? { email: this.authData.email, password: this.authData.password }
      : { ...this.authData };
    
    console.log('Dispatching Auth Request:', payload);
    // Server-side integration follows
  }
}