import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { InventoryItem } from '../shared/models/user/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  private http = inject(HttpClient);

  // 1. Data State
  public inventory = signal<InventoryItem[]>([]);
  public isLoaded = signal<boolean>(false);
  public searchTerm = signal<string>(''); // NEW: For the search widget

  // 2. Computed Logic
  public totalSkus = computed(() => this.inventory().length);
  
  // NEW: Reacts to searchTerm signal automatically
  public filteredInventory = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.inventory();
    return this.inventory().filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.sku.toLowerCase().includes(term) ||
      item.location.zone.toLowerCase().includes(term)
    );
  });

  public lowStockItems = computed(() => 
    this.inventory().filter(item => item.status === 'LOW_STOCK' || item.quantity.available <= item.quantity.minThreshold)
  );

  public outOfStockCount = computed(() => 
    this.inventory().filter(item => item.status === 'OUT_OF_STOCK').length
  );

  public inventoryAccuracy = computed(() => 99.8);

  constructor() {
    this.initInventory();
  }

  private async initInventory() {
    try {
      const data = await firstValueFrom(
        this.http.get<InventoryItem[]>('/assets/data/inventory.json')
      );
      this.inventory.set(data);
      this.isLoaded.set(true);
      console.log('Zentory Vault: Inventory Synced.');
    } catch (error) {
      console.error('Zentory Error: Failed to load inventory vault.', error);
    }
  }

  // 3. Actions
  public addItem(newItem: InventoryItem) {
    // Adds to the top of the list instantly
    this.inventory.update(prev => [newItem, ...prev]);
    console.log(`Zentory Vault: Registered ${newItem.sku}`);
  }

  public getItemBySku(sku: string): InventoryItem | undefined {
    return this.inventory().find(item => item.sku === sku);
  }
}