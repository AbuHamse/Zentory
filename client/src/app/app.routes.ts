import { Routes } from '@angular/router';

// ADMIN IMPORTS
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { OverviewComponent } from './features/admin/overview/overview.component';
import { HomeComponent as AdminHomeComponent } from './features/admin/home/home.component';
import { InventoryComponent } from './features/admin/inventory/inventory.component';
import { OrdersComponent } from './features/admin/orders/orders.component';
import { ShippingReceivingComponent } from './features/admin/shipping-receiving/shipping-receiving.component';
import { ReturnsDamagesComponent } from './features/admin/returns-damages/returns-damages.component';
import { CustomerOverviewComponent } from './features/admin/customer-overview/customer-overview.component';
import { ReportsComponent } from './features/admin/reports/reports.component';

// USER IMPORTS
import { UserHomeComponent } from './features/user/home/home.component';
import { PickerDashboardComponent } from './features/user/picker-dashboard/picker-dashboard.component';
import { InventoryVaultComponent } from './features/user/inventory-vault/inventory-vault.component';
import { ReceivingDockComponent } from './features/user/receiving-dock/receiving-dock.component';
import { MyPerformanceComponent } from './features/user/my-performance/my-performance.component';
import { DockOutboundComponent } from './features/user/dock-outbound/dock-outbound.component';

// WEBSITE IMPORTS
import { LandingShellComponent } from './pages/landing-shell/landing-shell.component';
import { HomeComponent as WebHomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ZentraComponent } from './pages/zentra/zentra.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import {AuthComponent} from './pages/auth/auth.component'

export const routes: Routes = [
  // 🌐 WEBSITE ROUTES
  {
    path: '',
    component: LandingShellComponent,
    children: [
      { path: '', component: WebHomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'zentra', component: ZentraComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'auth/login', component: AuthComponent },
    ]
  },
  
  // 🛠️ ADMIN ROUTES
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'shipment-receiving', component: ShippingReceivingComponent },
      { path: 'returns', component: ReturnsDamagesComponent },
      { path: 'customers', component: CustomerOverviewComponent },
      { path: 'reports', component: ReportsComponent },
    ] 
  },

  // 📦 USER / LOGISTICS ROUTES
  {
    path: 'user/dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home/temp', pathMatch: 'full' },
      { path: 'home/:id', component: UserHomeComponent },
      { path: 'picker-dashboard', component: PickerDashboardComponent },
      { path: 'inventory-control', component: InventoryVaultComponent },
      { path: 'receiving-dock', component: ReceivingDockComponent },
      { path: 'performance', component: MyPerformanceComponent },
      { path: 'dock-outbound', component: DockOutboundComponent },
    ]
  }
];