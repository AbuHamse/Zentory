import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../shared/material.module';

export interface Shipment {
  id: string;
  company: string; 
  type: 'INBOUND' | 'OUTBOUND';
  carrier: string;
  tracking: string;
  status: 'Pending' | 'In-Transit' | 'Delivered' | 'Delayed';
  itemsExpected: number;
  itemsReceived?: number; 
  origin_destination: string;
  eta: string;
  received: boolean;
  damages?: {
    hasDamage: boolean;
    damagedItems?: number;
    notes?: string;
  };
}

@Component({
  selector: 'app-shipping-receiving',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './shipping-receiving.component.html'
})
export class ShippingReceivingComponent implements OnInit {
  private http = inject(HttpClient);

  // Initialize signals with empty state
  protected allShipments = signal<Shipment[]>([]);
  protected selectedShipment = signal<Shipment | null>(null);
  protected activeFilter = signal<'ALL' | 'INBOUND' | 'OUTBOUND'>('ALL');

  ngOnInit(): void {
    // Fetching from the new public/data path
    // Note: Verify if your file is named 'shipments.json' or 'shippments.json'
    this.http.get<Shipment[]>('/data/shippments.json').subscribe({
      next: (data) => {
        this.allShipments.set(data);
      },
      error: (err) => console.error('Failed to load shipments:', err)
    });
  }

  protected filteredShipments = computed(() => {
    const filter = this.activeFilter();
    const data = this.allShipments();
    
    const filtered = filter === 'ALL' ? data : data.filter(s => s.type === filter);
    return filtered.slice(0, 15);
  });

  selectShipment(shipment: Shipment) {
    this.selectedShipment.set(shipment);
  }

  setFilter(mode: 'ALL' | 'INBOUND' | 'OUTBOUND') {
    this.activeFilter.set(mode);
    this.selectedShipment.set(null);
  }
}