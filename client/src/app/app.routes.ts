import { Routes } from '@angular/router';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { OverviewComponent } from './features/admin/overview/overview.component';
import { HomeComponent } from './features/admin/home/home.component';
import { InventoryComponent } from './features/admin/inventory/inventory.component';
import { OrdersComponent } from './features/admin/orders/orders.component';
import { ShippingReceivingComponent } from './features/admin/shipping-receiving/shipping-receiving.component';
import { ReturnsDamagesComponent } from './features/admin/returns-damages/returns-damages.component';
import { CustomerOverviewComponent } from './features/admin/customer-overview/customer-overview.component';
import { ReportsComponent } from './features/admin/reports/reports.component';

// NEW USER IMPORTS (Adjust paths if your filenames vary slightly)
import { UserHomeComponent } from './features/user/home/home.component';
// import { PickerDashboardComponent } from './features/user/picker-dashboard/picker-dashboard.component';
// import { ReceivingDockComponent } from './features/user/receiving-dock/receiving-dock.component';
// import { ShippingDispatchComponent } from './features/user/shipping-dispatch/shipping-dispatch.component';
// import { InventoryVaultComponent } from './features/user/inventory-vault/inventory-vault.component';
// import { RecoveryCenterComponent } from './features/user/recovery-center/recovery-center.component';
// import { SystemLogsComponent } from './features/user/system-logs/system-logs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard/home', pathMatch: 'full' },
  
  // --- ADMIN ROUTES ---
  { 
    path: 'admin/dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'shipment-receiving', component: ShippingReceivingComponent },
      { path: 'returns', component: ReturnsDamagesComponent },
      { path: 'customers', component: CustomerOverviewComponent },
      { path: 'reports', component: ReportsComponent },
    ] 
  },

  // --- USER / LOGISTICS ROUTES ---
  {
   path: 'user/dashboard', component: DashboardComponent,
    children: [
      { path: 'home', component: UserHomeComponent },
      // { path: 'picker-dashboard', component: PickerDashboardComponent },
      // { path: 'receiving-dock', component: ReceivingDockComponent },
      // { path: 'shipping-dispatch', component: ShippingDispatchComponent },
      // { path: 'inventory-control', component: InventoryVaultComponent },
      // { path: 'recovery-center', component: RecoveryCenterComponent },
      // { path: 'system-logs', component: SystemLogsComponent },
    ]
  }
];