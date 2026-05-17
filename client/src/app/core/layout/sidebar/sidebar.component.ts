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
      background-color: #FFFBF7;
    }
    .active-link {
      background-color: rgba(169, 0, 17, 0.05);
      border-right: 4px solid #A90011;
      color: #A90011 !important;
    }
  `]
})
export class SidebarComponent {
  onClose = output<void>();

  protected readonly navItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard/home' },
    { icon: 'inventory_2', label: 'Inventory', route: '/admin/dashboard/inventory' },
    { icon: 'shopping_cart', label: 'Orders', route: '/admin/dashboard/orders' },
    { icon: 'qr_code_scanner', label: 'Scanning', route: '/admin/dashboard/shipment-receiving' },
    { icon: 'map', label: 'Floor Plan', route: '/admin/dashboard/floor-plan' },
    { icon: 'analytics', label: 'Analytics', route: '/admin/dashboard/analytics' },
    { icon: 'settings', label: 'Settings', route: '/admin/dashboard/settings' },
  ];

  close() {
    this.onClose.emit();
  }
}