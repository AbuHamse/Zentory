import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WarehouseUser } from '../shared/models/user/warehouse-user.model';
import { LogisticsOrder } from '../shared/models/user/logistic-orders.model';
import { LogisticsAlert } from '../shared/models/user/logistics-alert.model';
import { Logistics } from '../shared/models/user/shipper-reciever.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogisticsEngineService {
  private http = inject(HttpClient);

  // 1. Raw Data Signals
  private users = signal<WarehouseUser[]>([]);
  private allOrders = signal<LogisticsOrder[]>([]);
  private allAlerts = signal<LogisticsAlert[]>([]);
  private logisticsData = signal<Logistics[]>([]);

  // 2. Active Session State
  // In a real app, this would come from an Auth Service
  public currentUser = signal<WarehouseUser | null>(null);

  // 3. Computed "Worker View" Logic
  
  // Filters orders that haven't been picked yet (Role: Picker)
  public myPendingTasks = computed(() => {
    const user = this.currentUser();
    if (!user) return [];
    
    // Returns orders assigned to this user that are still in PENDING or PICKING status
    return this.allOrders().filter(order => 
      order.status === 'PENDING' || order.status === 'PICKING'
    );
  });

  // Filters alerts specific to this user's role or assigned area
  public activeAlerts = computed(() => {
    return this.allAlerts().filter(alert => !alert.isResolved);
  });

  // Gamification Logic: Compares user UPH vs Warehouse average
  public performanceTier = computed(() => {
    const user = this.currentUser();
    if (!user) return 'NEUTRAL';
    
    const avgUPH = 50; // Set a baseline for the warehouse
    const userUPH = user.stats.unitsPerHour;
    
    if (userUPH > avgUPH * 1.1) return 'ELITE'; // 10% faster
    if (userUPH < avgUPH * 0.8) return 'WARNING';
    return 'STABLE';
  });

  constructor() {
    this.initLogisticsSystem();
  }

  private async initLogisticsSystem() {
    try {
      // Load all JSON data in parallel
      const [u, o, a, l] = await Promise.all([
        firstValueFrom(this.http.get<WarehouseUser[]>('assets/data/user.json')),
        firstValueFrom(this.http.get<LogisticsOrder[]>('assets/data/pendingorder.json')),
        firstValueFrom(this.http.get<LogisticsAlert[]>('assets/data/logistic-alert.json')),
        firstValueFrom(this.http.get<Logistics[]>('assets/data/logistics.json'))
      ]);

      this.users.set(u);
      this.allOrders.set(o);
      this.allAlerts.set(a);
      this.logisticsData.set(l);

      // Mocking a login for testing: Setting the first user as active
      if (u.length > 0) this.currentUser.set(u[0]);
      
      console.log('Zentory Logistics: System Synchronized.');
    } catch (error) {
      console.error('Zentory Error: Failed to sync warehouse data.', error);
    }
  }

  // 4. Transactional Actions (The "Ignition" quadrant)
  
  public confirmPick(orderId: string, sku: string) {
    console.log(`Zentory: Confirming pick for ${sku} in Order ${orderId}`);
    // Logic to update the signal and eventually the JSON/DB goes here
  }

  public reportStockIssue(sku: string, bin: string) {
    const newAlert: LogisticsAlert = {
      id: `ALT-${Math.random()}`,
      severity: 'WARNING',
      category: 'INVENTORY',
      message: `Stock discrepancy at Bin ${bin} for SKU ${sku}`,
      timestamp: new Date().toISOString(),
      isResolved: false
    };
    this.allAlerts.update(prev => [newAlert, ...prev]);
  }
}
