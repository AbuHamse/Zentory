import { Routes } from '@angular/router';
import { DashboardComponent } from '././features/admin/dashboard/dashboard.component';
import { OverviewComponent } from '././features/admin/overview/overview.component';
import { HomeComponent } from '././features/admin/home/home.component';
import { InventoryComponent } from '././features/admin/inventory/inventory.component';
import { OrdersComponent } from '././features/admin/orders/orders.component';
import { ShippingReceivingComponent } from './features/admin/shipping-receiving/shipping-receiving.component';
import { ReturnsDamagesComponent } from './features/admin/returns-damages/returns-damages.component';
import { CustomerOverviewComponent } from './features/admin/customer-overview/customer-overview.component';
import { ReportsComponent } from './features/admin/reports/reports.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, 
    children:[
    { path: 'home', component: HomeComponent },
    { path: 'overview', component: OverviewComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'shipment-receiving', component: ShippingReceivingComponent },
    { path: 'returns', component: ReturnsDamagesComponent },
    { path: 'customers', component: CustomerOverviewComponent },
    { path: 'reports', component: ReportsComponent },
  ] },
];
