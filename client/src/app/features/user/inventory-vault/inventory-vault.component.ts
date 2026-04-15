import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventoryDataService } from '../../../services/inventory-data.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { InventoryItem } from '../../../shared/models/user/inventory-item.model';

// NEW: Component Imports for the Tabs
import { AllSkusComponent } from '../../../core/ui/all-skus/all-skus.component';
import { LowStockComponent } from '../../../core/ui/low-stock/low-stock.component';
import { ZoneMapComponent } from '../../../core/ui/zone-map/zone-map.component';
import { AuditLogsComponent } from '../../../core/ui/audit-logs/audit-logs.component';

@Component({
  selector: 'app-inventory-vault',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule, 
    MaterialModule,
    // Add the new tab components here
    AllSkusComponent,
    LowStockComponent,
    ZoneMapComponent,
    AuditLogsComponent
  ],
  templateUrl: './inventory-vault.component.html'
})
export class InventoryVaultComponent {
  protected invService = inject(InventoryDataService);
  private fb = inject(FormBuilder);

  protected isFormOpen = signal(false);

  // Initialize the Reactive Form
  inventoryForm = this.fb.group({
    sku: ['', [Validators.required, Validators.minLength(4)]],
    name: ['', Validators.required],
    category: ['OTHER'],
    zone: ['NORTH-WING'],
    onHand: [0, Validators.min(0)],
    minThreshold: [5, Validators.min(1)],
    supplier: ['', Validators.required]
  });

  updateSearch(event: any) {
    this.invService.searchTerm.set(event.target.value);
  }

  toggleForm() {
    this.isFormOpen.update(v => !v);
  }

  submitNewItem() {
    if (this.inventoryForm.valid) {
      const f = this.inventoryForm.value;
      
      const newItem: InventoryItem = {
        id: `SKU-${Math.floor(Math.random() * 10000)}`,
        sku: f.sku!,
        name: f.name!,
        category: f.category as any,
        quantity: {
          onHand: f.onHand!,
          allocated: 0,
          available: f.onHand!,
          minThreshold: f.minThreshold!
        },
        location: {
          zone: f.zone as any,
          aisle: 'A01', 
          rack: '01',
          bin: 'A-1'
        },
        dimensions: { length: 0, width: 0, height: 0, unit: 'in' },
        weight: { value: 0, unit: 'lb' },
        status: 'IN_STOCK',
        lastCounted: new Date().toISOString(),
        supplier: f.supplier!,
        pickedBy: [],
        recievedBy: []
      };

      this.invService.addItem(newItem);
      this.inventoryForm.reset({ category: 'OTHER', zone: 'NORTH-WING' });
      this.isFormOpen.set(false);
    }
  }
}