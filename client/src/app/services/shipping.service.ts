import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shipment } from '../shared/models/user/shipment.model'; // Move the interface here

@Injectable({ providedIn: 'root' })
export class ShippingService {
  private http = inject(HttpClient);

  // State Signals
  private allShipments = signal<Shipment[]>([]);
  public isLoading = signal(false);

  // Computed Stats for your Dashboard widgets
  public inboundCount = computed(() => this.allShipments().filter(s => s.type === 'INBOUND').length);
  public delayedCount = computed(() => this.allShipments().filter(s => s.status === 'Delayed').length);

  async loadShipments() {
    this.isLoading.set(true);
    // Ensure the filename is correct: shipments.json
    this.http.get<Shipment[]>('/data/shipments.json').subscribe({
      next: (data) => {
        this.allShipments.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Dock Error:', err);
        this.isLoading.set(false);
      }
    });
  }

  getShipments() {
    return this.allShipments;
  }
}