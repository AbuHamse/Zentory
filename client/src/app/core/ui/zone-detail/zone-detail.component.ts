import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InventoryDataService } from '../../../services/inventory-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.css']
})
export class ZoneDetailComponent {
  private invService = inject(InventoryDataService);
  private router = inject(Router);

  // Current zone being viewed
  protected activeZone = this.invService.searchTerm;

  // Filtered list of items belonging ONLY to this zone
  protected zoneItems = computed(() => {
    const allItems = this.invService.inventory();
    const currentZone = this.activeZone();
    return allItems.filter(item => item.location.zone === currentZone);
  });

  // Derived stats for the header
  protected zoneStats = computed(() => {
    const items = this.zoneItems();
    return {
      totalItems: items.length,
      totalStock: items.reduce((acc, item) => acc + item.quantity.onHand, 0),
      alerts: items.filter(item => item.quantity.onHand < 20).length
    };
  });

  goBack() {
    // Logic to tell parent Overview component to return to 'HUB'
    // Or navigate via router if it's a separate route
    console.log('ZENTORY_OS // Returning to Overview Hub');
  }

  exportZoneData() {
    console.log(`ZENTORY_OS // Exporting Manifest for ${this.activeZone()}`);
  }
}