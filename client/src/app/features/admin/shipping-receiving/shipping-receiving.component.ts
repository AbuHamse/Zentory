import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';

// Import local JSON mock data
import shipmentsData from '../../../assets/data/shipments.json';

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
export class ShippingReceivingComponent {
  // Signals for state management
  protected allShipments = signal<Shipment[]>(shipmentsData as Shipment[]);
  protected selectedShipment = signal<Shipment | null>(null);
  protected activeFilter = signal<'ALL' | 'INBOUND' | 'OUTBOUND'>('ALL');

  // Computed signal for filtered view - Sliced to first 15 as requested
  protected filteredShipments = computed(() => {
    const filter = this.activeFilter();
    const data = this.allShipments();
    
    const filtered = filter === 'ALL' ? data : data.filter(s => s.type === filter);
    
    // Limits the initial fetch to the first 15 items
    return filtered.slice(0, 15);
  });

  selectShipment(shipment: Shipment) {
    console.log('Shipment Selected:', shipment.id); // Debugging line
    this.selectedShipment.set(shipment);
  }

  setFilter(mode: 'ALL' | 'INBOUND' | 'OUTBOUND') {
    this.activeFilter.set(mode);
    this.selectedShipment.set(null);
  }
}