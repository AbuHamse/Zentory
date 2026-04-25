import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Added for navigation
import { OutboundDataService } from '../../../services/outbound-data.service';
import { OutboundShipment } from '../../../shared/models/user/outbound-shipment.model';

// SUB-COMPONENT IMPORTS
import { OutboundBayComponent } from '../../../core/ui/outbound-bay/outbound-bay.component';
import { LoadingQueueComponent } from '../../../core/ui/loading-queue/loading-queue.component';
import { ManifestDetailComponent } from '../../../core/ui/manifest-detail/manifest-detail.component';
import { FlowMeterComponent } from '../../../core/ui/flow-meter/flow-meter.component';

@Component({
  selector: 'app-dock-outbound',
  standalone: true,
  imports: [
    CommonModule,
    OutboundBayComponent,
    LoadingQueueComponent,
    ManifestDetailComponent,
    FlowMeterComponent
  ],
  templateUrl: './dock-outbound.component.html'
})
export class DockOutboundComponent {
  protected outboundService = inject(OutboundDataService);
  private router = inject(Router); // Inject router for the back button

  // We now use the service's signal directly so updates in the orange panel 
  // reflect everywhere in the system instantly.
  protected selectedTrailer = this.outboundService.selectedShipment;

  protected readonly totalBays = Array.from({ length: 14 }, (_, i) => 
    `S-${(i + 1).toString().padStart(2, '0')}`
  );

  getTrailerAtBay(bay: string): OutboundShipment | undefined {
    return this.outboundService.shipments().find(
      s => s.dockDoor === bay && s.status !== 'DEPARTED'
    );
  }

  onTrailerSelected(shipment: OutboundShipment) {
    // Sync with the service so CRUD operations have a target
    this.outboundService.selectedShipment.set(shipment);
    console.log(`ZENTORY_OS // Audit_Focus_Shift // Trailer: ${shipment.trailerId}`);
  }

  // Navigation Logic
  goBack() {
    this.router.navigate(['/user/dashboard/home/USR-1040']); // Or your preferred home route
  }
}