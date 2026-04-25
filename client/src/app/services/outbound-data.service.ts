import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { OutboundShipment } from '../shared/models/user/outbound-shipment.model';

@Injectable({
  providedIn: 'root'
})
export class OutboundDataService {
  private http = inject(HttpClient);

  // 1. Data State
  public shipments = signal<OutboundShipment[]>([]);
  public isLoaded = signal<boolean>(false);
  
  // Modal & Selection State
  public selectedShipment = signal<OutboundShipment | null>(null);

  // 2. Computed Logic
  public activeOutbound = computed(() => 
    this.shipments().filter(s => s.status !== 'DEPARTED')
  );

  // Filter for the "Previous" history view in your modal
  public shipmentHistory = computed(() => 
    this.shipments().filter(s => s.status === 'DEPARTED')
  );

  public hotLoads = computed(() => 
    this.shipments().filter(s => s.priority === 'CRITICAL_CUTOFF' || s.priority === 'HOT_LOAD')
  );

  constructor() {
    this.initOutbound();
  }

  private async initOutbound() {
    try {
      const data = await firstValueFrom(
        this.http.get<OutboundShipment[]>('data/outbound-shipments.json')
      );
      this.shipments.set(data);
      this.isLoaded.set(true);
      console.log('ZENTORY_OS // Outbound_Gate_Online');
    } catch (error) {
      console.error('ZENTORY_OS // Outbound_Sync_Failure', error);
    }
  }

  // --- CRUD OPERATIONS ---

  // CREATE: Add a new trailer to staging
  public addShipment(newShipment: OutboundShipment) {
    this.shipments.update(list => [newShipment, ...list]);
    console.log(`ZENTORY_OS // Shipment_Created // ID: ${newShipment.id}`);
  }

  // UPDATE: Edit existing trailer info or manifest progress
  public updateShipment(updated: OutboundShipment) {
    this.shipments.update(list => 
      list.map(s => s.id === updated.id ? updated : s)
    );
    // If the updated item is the one currently open in the modal, sync it
    if (this.selectedShipment()?.id === updated.id) {
      this.selectedShipment.set(updated);
    }
    console.log(`ZENTORY_OS // Shipment_Updated // ID: ${updated.id}`);
  }

  // DELETE: Remove an erroneous load
  public deleteShipment(id: string) {
    this.shipments.update(list => list.filter(s => s.id !== id));
    if (this.selectedShipment()?.id === id) {
      this.selectedShipment.set(null);
    }
    console.log(`ZENTORY_OS // Shipment_Purged // ID: ${id}`);
  }

  // DEPART: Specific update for releasing a trailer
  public departTrailer(id: string) {
    this.shipments.update(list => 
      list.map(s => s.id === id ? { 
        ...s, 
        status: 'DEPARTED', 
        actualDeparture: new Date().toISOString() 
      } : s)
    );
    console.log(`ZENTORY_OS // Trailer_Released // ID: ${id}`);
  }
}