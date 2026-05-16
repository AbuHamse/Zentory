import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { firstValueFrom } from 'rxjs';
import { InventoryItem } from '../shared/models/user/inventory-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private supabase: SupabaseClient;

  // 1. Core State Signals
  public items = signal<InventoryItem[]>([]);
  public isLoading = signal<boolean>(false);
  public lastSync = signal<Date | null>(null);

  // 2. Enterprise UI State (Tabs & Sorting)
  public activeCategory = signal<string>('ALL');
  public sortOrder = signal<'ASC' | 'DESC'>('ASC');

  constructor() {
    // Initializing Supabase with environment keys
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.initializeEnterpriseData();
  }

  /**
   * Primary Hydration Logic:
   * 1. Loads JSON fallback for speed/stability
   * 2. Attempts to sync live data from Supabase
   */
  public async initializeEnterpriseData() {
    this.isLoading.set(true);
    
    try {
      // Step A: Immediate JSON Fallback
      const localData = await firstValueFrom(
        this.http.get<InventoryItem[]>('data/inventory.json')
      );
      this.items.set(localData);
      
      // Step B: Attempt Supabase Sync
      const { data, error } = await this.supabase
        .from('inventory')
        .select('*');

      if (data && !error) {
        this.items.set(data as InventoryItem[]);
        this.lastSync.set(new Date());
        console.log('ZENTORY_OS // Supabase Sync Successful');
      }
    } catch (err) {
      console.warn('ZENTORY_OS // Falling back to local JSON vault.', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  // 3. Enterprise Computed Logic
  public filteredItems = computed(() => {
    const category = this.activeCategory();
    const allItems = this.items();
    
    if (category === 'ALL') return allItems;
    return allItems.filter(item => item.category === category);
  });

  // 4. Supabase CRUD Operations
  async updateStock(sku: string, newQuantity: number) {
    const { error } = await this.supabase
      .from('inventory')
      .update({ 'quantity.onHand': newQuantity })
      .eq('sku', sku);

    if (!error) {
      this.items.update(prev => prev.map(item => 
        item.sku === sku ? { ...item, quantity: { ...item.quantity, onHand: newQuantity } } : item
      ));
    }
  }

  async createItem(newItem: InventoryItem) {
    const { data, error } = await this.supabase
      .from('inventory')
      .insert([newItem])
      .select();

    if (data && !error) {
      this.items.update(prev => [data[0] as InventoryItem, ...prev]);
    }
  }
}