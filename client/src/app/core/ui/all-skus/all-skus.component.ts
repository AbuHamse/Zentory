import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { InventoryDataService } from '../../../services/inventory-data.service';

@Component({
  selector: 'app-all-skus',
  standalone: true,
  imports: [CommonModule,MaterialModule],
  templateUrl: './all-skus.component.html'
})
export class AllSkusComponent {
  protected invService = inject(InventoryDataService);
}