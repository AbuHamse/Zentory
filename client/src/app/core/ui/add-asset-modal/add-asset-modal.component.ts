import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material.module';
import { InventoryItem } from '../../../shared/models/user/inventory-item.model';

@Component({
  selector: 'app-add-asset-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './add-asset-modal.component.html'
})
export class AddAssetModalComponent {
  private dialogRef = inject(MatDialogRef<AddAssetModalComponent>);

  // Initialize with defaults to satisfy the InventoryItem model
  protected newItem: Partial<InventoryItem> = {
    name: '',
    sku: '',
    category: 'OTHER',
    status: 'IN_STOCK',
    quantity: { onHand: 0, allocated: 0, available: 0, minThreshold: 5 },
    location: { zone: 'RECEIVING', aisle: '', rack: '', bin: '' },
    unitPrice: 0,
    currency: 'USD',
    supplier: '',
    pickedBy: [],
    recievedBy: []
  };

  save() {
    // Logic to pass data back to the parent inventory component
    if (this.newItem.name && this.newItem.sku) {
      this.dialogRef.close(this.newItem);
    }
  }

  close() {
    this.dialogRef.close();
  }
}