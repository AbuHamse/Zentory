import { Component, inject, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InboundDataService } from '../../../services/inbound-data.service';
import { MaterialModule } from '../../../shared/material.module';
import { InboundShipment } from '../../../shared/models/user/inbound-shipment.model';

@Component({
  selector: 'app-receiving-dock',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './receiving-dock.component.html'
})
export class ReceivingDockComponent {
  protected inboundService = inject(InboundDataService);
  // Add to your class properties
protected viewMode = signal<'CURRENT' | 'HISTORY'>('CURRENT');

// Update your loop in the HTML to use this filtered list
protected filteredShipments = computed(() => {
  const mode = this.viewMode();
  return this.inboundService.shipments().filter(s => 
    mode === 'CURRENT' ? (s.status !== 'COMPLETED' && s.status !== 'REJECTED') : (s.status === 'COMPLETED' || s.status === 'REJECTED')
  );
});
  
  // Track selected trailer for the right-hand detail panels
  protected selectedTrailer = signal<InboundShipment | null>(null);

  selectTrailer(trailer: InboundShipment) {
    this.selectedTrailer.set(trailer);
    console.log(`ZENTORY_OS // Accessing_Manifest // ${trailer.trailerId}`);
  }

  calculateProgress(unloaded: number, total: number): number {
    return Math.round((unloaded / total) * 100);
  }
}