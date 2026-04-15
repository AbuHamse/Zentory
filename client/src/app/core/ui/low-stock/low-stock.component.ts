import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { InventoryDataService } from '../../../services/inventory-data.service';

@Component({
  selector: 'app-low-stock',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './low-stock.component.html'
})
export class LowStockComponent {
  protected invService = inject(InventoryDataService);

  // Function to calculate how critical the shortage is (0-100 scale)
  getUrgencyLevel(available: number, threshold: number): number {
    if (available === 0) return 100;
    const ratio = (available / threshold) * 100;
    return Math.max(0, 100 - ratio);
  }
}