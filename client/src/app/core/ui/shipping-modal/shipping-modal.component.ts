import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material.module';
import { Shipment } from '../../../shared/models/user/shipment.model';

@Component({
  selector: 'app-shipping-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './shipping-modal.component.html'
})
export class ShippingModalComponent {
  private dialogRef = inject(MatDialogRef<ShippingModalComponent>);

  // Default structure following your Shipment interface
  protected shipment: Partial<Shipment> = {
    id: `MANIFEST-${Math.floor(1000 + Math.random() * 9000)}`,
    company: '',
    type: 'INBOUND',
    carrier: '',
    tracking: '',
    status: 'Pending',
    itemsExpected: 0,
    origin_destination: '',
    eta: new Date().toISOString().split('T')[0], // Defaults to today
    received: false,
    damages: { hasDamage: false, damagedItems: 0, notes: '' }
  };

  save() {
    if (this.shipment.company && this.shipment.tracking) {
      this.dialogRef.close(this.shipment);
    }
  }

  close() {
    this.dialogRef.close();
  }
}