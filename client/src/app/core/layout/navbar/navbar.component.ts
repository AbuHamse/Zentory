import { Component, output, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // Navigation Protocol Outputs
  onToggleSidenav = output<void>();
  
  // System Metadata Inputs
  title = input('ZTN-ZENTORY');
  version = input('v21.4');
  
  // Logic Status Signals
  protected systemStatus = signal<'SECURED' | 'SYNCING' | 'OFFLINE'>('SECURED');
  protected currentUser = signal({
    name: 'System Admin',
    role: 'Global Permissions',
    initials: 'SA'
  });

  // Action: Trigger Sidebar Toggle
  toggle() {
    this.onToggleSidenav.emit();
  }
}