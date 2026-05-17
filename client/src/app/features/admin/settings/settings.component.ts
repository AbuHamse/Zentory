import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './settings.component.html',
  styles: [`
    :host { display: block; height: 100%; background-color: #FFFBF7; }
    .active-tab { 
      color: #334155 !important; 
      border-bottom: 2px solid #334155 !important;
      font-weight: 900 !important;
    }
  `]
})
export class SettingsComponent {
  // Navigation State
  protected activeTab = signal<'ACCOUNT' | 'PREFERENCES' | 'PAYMENT'>('ACCOUNT');

  // Profile Signals
  protected profileName = signal('David');
  protected profileBio = signal('Senior Logistics Coordinator // North Sector');
  protected email = signal('david.admin@zentory.os');
  protected phone = signal('+39 312 345 6789');

  saveProfile() {
    console.log('ZENTORY_OS // Updating Security Vault...');
    // Implementation for DB update goes here
  }
}