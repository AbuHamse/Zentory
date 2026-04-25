import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Added for CRUD inputs
import { OutboundDataService } from '../../../services/outbound-data.service';
import { OutboundShipment } from '../../../shared/models/user/outbound-shipment.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manifest-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './manifest-detail.component.html'
})
export class ManifestDetailComponent {
  @Input() shipment: OutboundShipment | null = null;
  protected outboundService = inject(OutboundDataService);

  // Toggle for viewing Manifest vs Trailer Info (CRUD)
  protected activeTab = signal<'MANIFEST' | 'INFO'>('MANIFEST');

  /**
   * Adjust Pallet/Skid counts (CRUD Adjustment)
   */
  updatePallets(amount: number) {
    if (!this.shipment) return;
    const updated = { ...this.shipment, totalPallets: this.shipment.totalPallets + amount };
    if (updated.totalPallets < 0) updated.totalPallets = 0;
    this.outboundService.updateShipment(updated);
  }

  /**
   * Verify units with Service Persistence
   */
  incrementLoad(orderId: string) {
    if (!this.shipment) return;
    
    const updatedManifest = this.shipment.manifest.map(item => {
      if (item.orderId === orderId && item.loadedUnits < item.totalUnits) {
        return { ...item, loadedUnits: item.loadedUnits + 1 };
      }
      return item;
    });

    this.outboundService.updateShipment({
      ...this.shipment,
      manifest: updatedManifest
    });
  }

  /**
   * Manual Discrepancy Adjustment for specific orders
   */
  adjustOrderTotal(orderId: string, amount: number) {
    if (!this.shipment) return;
    const updatedManifest = this.shipment.manifest.map(item => {
      if (item.orderId === orderId) {
        return { ...item, totalUnits: Math.max(0, item.totalUnits + amount) };
      }
      return item;
    });
    this.outboundService.updateShipment({ ...this.shipment, manifest: updatedManifest });
  }

  isManifestComplete(): boolean {
    if (!this.shipment) return false;
    return this.shipment.manifest.every(m => m.loadedUnits === m.totalUnits);
  }

  onDepart() {
    if (this.shipment && this.isManifestComplete()) {
      this.outboundService.departTrailer(this.shipment.id);
      // The parent signal will naturally clear this via the service update
    }
  }
}