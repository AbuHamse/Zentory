import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MaterialModule],
  templateUrl: './sidebar.component.html',
  styles: [`
    :host { 
      display: block; 
      height: 100%; 
    }
  `]
})
export class SidebarComponent {
  // We only need the output so the Close Button can tell the parent to shut it
  onClose = output<void>();

  protected readonly navItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'inventory_2', label: 'Inventory', route: '/inventory' },
    { icon: 'local_shipping', label: 'Orders', route: '/orders' },
    { icon: 'qr_code_scanner', label: 'Scanning', route: '/scanning' },
    { icon: 'map', label: 'Floor Plan', route: '/floor-plan' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];
}