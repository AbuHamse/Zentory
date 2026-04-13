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
  
  // Track loading state to prevent race conditions
  public isInitialized = signal<boolean>(false);

  public currentUser = signal<WarehouseUser | null>(null);

  // 3. Computed "Worker View" Logic
  public myPendingTasks = computed(() => {
    const user = this.currentUser();
    if (!user) return [];
    return this.allOrders().filter(order => 
      order.status === 'PENDING' || order.status === 'PICKING'
    );
  });

  public activeAlerts = computed(() => {
    return this.allAlerts().filter(alert => !alert.isResolved);
  });

  public performanceTier = computed(() => {
    const user = this.currentUser();
    if (!user || !user.stats) return 'NEUTRAL';
    
    const avgUPH = 50; 
    const userUPH = user.stats.unitsPerHour;
    
    if (userUPH > avgUPH * 1.1) return 'ELITE';
    if (userUPH < avgUPH * 0.8) return 'WARNING';
    return 'STABLE';
  });

  constructor() {
    this.initLogisticsSystem();
  }

  private async initLogisticsSystem() {
    try {
      // Added leading slashes to ensure paths are absolute from root
      const [u, o, a, l] = await Promise.all([
        firstValueFrom(this.http.get<WarehouseUser[]>('/assets/data/users.json')),
        firstValueFrom(this.http.get<LogisticsOrder[]>('/assets/data/pendingorders.json')),
        firstValueFrom(this.http.get<LogisticsAlert[]>('/assets/data/logistic-alerts.json')),
        firstValueFrom(this.http.get<Logistics[]>('/assets/data/logistics.json'))
      ]);

      this.users.set(u);
      this.allOrders.set(o);
      this.allAlerts.set(a);
      this.logisticsData.set(l);
      
      this.isInitialized.set(true);
      console.log('Zentory Logistics: System Synchronized.');
    } catch (error) {
      console.error('Zentory Error: Failed to sync warehouse data.', error);
    }
  }

  /**
   * REFACTORED: Now async to ensure it waits for the system to initialize 
   * if the user lands directly on a deep-linked ID route.
   */
  public async loginAsUser(id: string) {
    // Wait for initLogisticsSystem to complete if it hasn't yet
    if (!this.isInitialized()) {
      console.log('Zentory: Waiting for data sync before login...');
      // Small recursive check or simple delay can work, 
      // but checking the signal is cleanest.
      await new Promise(resolve => {
        const check = setInterval(() => {
          if (this.isInitialized()) {
            clearInterval(check);
            resolve(true);
          }
        }, 50);
      });
    }

    const foundUser = this.users().find(u => u.id === id);
    if (foundUser) {
      this.currentUser.set(foundUser);
      console.log(`Zentory OS: Active Session switched to ${foundUser.name}`);
    } else {
      console.error(`Zentory Error: User ID ${id} not found in system.`);
    }
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
  // Inside logistics-engine.service.ts
public confirmPick(orderId: string, sku: string) {
  console.log(`Zentory: Confirming pick for ${sku} in Order ${orderId}`);
  // Your logic here
}
}