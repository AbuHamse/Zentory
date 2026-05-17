import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../shared/material.module';
import { Shipment } from '../../../shared/models/user/shipment.model';
import { ShippingModalComponent } from '../../../core/ui/shipping-modal/shipping-modal.component';

@Component({
  selector: 'app-shipping-receiving',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  templateUrl: './shipping-receiving.component.html'
})
export class ShippingReceivingComponent implements OnInit {
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);

  // State Management
  protected allShipments = signal<Shipment[]>([]);
  protected selectedShipment = signal<Shipment | null>(null);
  protected activeFilter = signal<'INBOUND' | 'OUTBOUND'>('INBOUND');

  // Logic: Filters data based on the Dock Direction (Inbound/Outbound)
  protected filteredShipments = computed(() => {
    const data = this.allShipments();
    const filter = this.activeFilter();
    return data.filter(s => s.type === filter);
  });

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments() {
    // Note: Ensure your JSON file name matches your folder structure
    this.http.get<Shipment[]>('/data/shipments.json').subscribe({
      next: (data) => this.allShipments.set(data),
      error: (err) => console.error('ZENTORY_OS // Dock Data Link Failed:', err)
    });
  }

  setFilter(mode: 'INBOUND' | 'OUTBOUND') {
    this.activeFilter.set(mode);
    this.selectedShipment.set(null); // Clear selection when switching docks
  }

  selectShipment(shipment: Shipment) {
    this.selectedShipment.set(shipment);
  }

  // Launches the Brutalist Modal we created
  openNewShipmentModal() {
    const dialogRef = this.dialog.open(ShippingModalComponent, {
      width: '700px',
      panelClass: 'zentory-brutalist-modal'
    });

    dialogRef.afterClosed().subscribe((result: Shipment) => {
      if (result) {
        // Append new shipment to the local signal
        this.allShipments.update(prev => [result, ...prev]);
        this.selectShipment(result);
      }
    });
  }

  finalizeIntake(shipment: Shipment) {
    console.log(`ZENTORY_OS // Finalizing Manifest: ${shipment.id}`);
    // Logic for updating the 'received' status would happen here
    const updated = { ...shipment, received: true, status: 'Delivered' as const };
    this.allShipments.update(list => 
      list.map(s => s.id === shipment.id ? updated : s)
    );
    this.selectedShipment.set(updated);
  }
}