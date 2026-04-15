import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { InboundShipment } from '../shared/models/user/inbound-shipment.model';

@Injectable({
  providedIn: 'root'
})
export class InboundDataService {
  private http = inject(HttpClient);

  // 1. Data State
  public shipments = signal<InboundShipment[]>([]);
  public isLoaded = signal<boolean>(false);

  // 2. Computed Logic
  public activeTrailers = computed(() => 
    this.shipments().filter(s => s.status === 'UNLOADING' || s.status === 'DOCKING')
  );

  public totalTrailersAtDock = computed(() => this.activeTrailers().length);

  public criticalShipments = computed(() => 
    this.shipments().filter(s => s.priority === 'CRITICAL')
  );

  constructor() {
    this.initInbound();
  }

  private async initInbound() {
    try {
      // Using 'data/' because of your public folder configuration
      const data = await firstValueFrom(
        this.http.get<InboundShipment[]>('data/inbound-shipments.json')
      );
      this.shipments.set(data);
      this.isLoaded.set(true);
      console.log('Zentory Logistics: Inbound Gate Synced.');
    } catch (error) {
      console.error('Zentory Error: Inbound sync failed.', error);
    }
  }
}