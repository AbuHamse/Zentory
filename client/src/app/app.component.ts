import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

// Custom Imports
import { MaterialModule } from './shared/material.module';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MaterialModule,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent {
  // Zentory Branding
  protected readonly title = signal('ZTN-Zentory');
  
  // 1. Unified Sidebar State (Starts closed for the 'Drawer' effect)
  protected readonly isSidenavOpen = signal(false); 

  // 2. Toggle Logic for the Navbar Click
  toggleSidebar() {
    this.isSidenavOpen.update(state => !state);
  }

  // 3. Close Logic (For the backdrop click or close button)
  closeSidebar() {
    this.isSidenavOpen.set(false);
  }

  /** * Zentory Navigation Items 
   * (You can keep these here or in the SidebarComponent directly)
   */
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