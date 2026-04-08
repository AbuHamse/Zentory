import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { OverviewComponent } from './features/overview/overview.component';
import { HomeComponent } from './features/home/home.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { OrdersComponent } from './features/orders/orders.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, 
    children:[
    { path: 'home', component: HomeComponent },
    { path: 'overview', component: OverviewComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'orders', component: OrdersComponent },
    // { path: 'overview', component: OverviewComponent },
    // { path: 'overview', component: OverviewComponent },
  ] },
];
