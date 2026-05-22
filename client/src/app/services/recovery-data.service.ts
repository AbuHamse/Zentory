import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ReturnItem {
  id: string;
  originalOrderId: string;
  customer: string;
  item: string;
  qty: number;
  reason: string;
  status: string;
  disposition: string;
  dateReceived: string;
  images: string[];
}

@Injectable({ providedIn: 'root' })
export class RecoveryDataService {
  private http = inject(HttpClient);

  // Raw data stream
  private allReturns = signal<ReturnItem[]>([]);
  
  // Selection State for the detail view
  public selectedReturn = signal<ReturnItem | null>(null);

  // Computed list for the UI
  public returnsQueue = computed(() => this.allReturns());

  constructor() {
    this.loadReturns();
  }

  public async loadReturns() {
    try {
      const data = await firstValueFrom(this.http.get<ReturnItem[]>('data/returns.json'));
      this.allReturns.set(data);
      if (data.length > 0) {
        this.selectedReturn.set(data[0]);
      }
    } catch (error) {
      console.error('Zentory OS Error: Recovery Data Sync Failed.', error);
    }
  }

  public selectItem(item: ReturnItem) {
    this.selectedReturn.set(item);
  }
}