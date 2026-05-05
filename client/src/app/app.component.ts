import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
  private readonly router = inject(Router);

  // 1. Track the current URL as a signal
  private readonly currentUrl = toSignal(
    this.router.events.pipe(map(() => this.router.url))
  );

  // 2. Determine if we are on a landing page
  // This checks if the path is / or /products or /zentra or /resources
  protected readonly isLandingPage = computed(() => {
    const url = this.currentUrl() || '/';
    const landingPaths = ['/', '/products', '/zentra', '/resources','/auth/login', '/auth/register', '/payment/success', '/payment/cancel'];
    return landingPaths.includes(url) || url === '';
  });

  protected readonly title = signal('ZTN-Zentory');
  protected readonly isSidenavOpen = signal(false); 

  toggleSidebar() {
    this.isSidenavOpen.update(state => !state);
  }

  closeSidebar() {
    this.isSidenavOpen.set(false);
  }

protected readonly navItems = [
  // Add 'admin/' to the start of these routes
  { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard/home' }, 
  { icon: 'inventory_2', label: 'Inventory', route: '/admin/dashboard/inventory' },
  { icon: 'local_shipping', label: 'Orders', route: '/admin/dashboard/orders' },
  { icon: 'qr_code_scanner', label: 'Scanning', route: '/admin/dashboard/shipment-receiving' }, // Matches shipment-receiving
  { icon: 'assignment_return', label: 'Returns', route: '/admin/dashboard/returns' },
  { icon: 'people', label: 'Customers', route: '/admin/dashboard/customers' },
  { icon: 'analytics', label: 'Reports', route: '/admin/dashboard/reports' },
];
}