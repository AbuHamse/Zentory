import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDataService } from '../../../services/inventory-data.service';
import { MatIconModule } from '@angular/material/icon';

// Define capacity constants for each zone based on the layout density
const ZONE_CAPACITIES = {
  'NORTH-WING': 500,  // Large Dynamic Storage
  'SOUTH-WING': 500,  // Large Dynamic Storage
  'EAST-WING': 300,   // Middle Static Storage
  'WEST-WING': 200,   // Side Storage
  'RETURN-WING': 150, // Small Staging
  'DOCKED-WING': 400  // Receiving/Shipping (Image layout shows 8 trucks)
};

@Component({
  selector: 'app-zone-map',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './zone-map.component.html'
})
export class ZoneMapComponent {
  protected invService = inject(InventoryDataService);

  // 1. COMPUTED: Create an object mapping each Zone name to its current fullness %
  // This is highly efficient; it only updates when the master inventory signal changes.
  public zoneHeatmap = computed(() => {
  const items = this.invService.inventory();
  
  // 1. Explicitly type the accumulator object
  const map: Record<string, number> = {};

  items.forEach(item => {
    const zoneName = item.location.zone;
    if (!map[zoneName]) map[zoneName] = 0;
    map[zoneName] += item.quantity.onHand;
  });

  // 2. Explicitly type the final heatmap object
  const heatmap: Record<string, number> = {};
  
  for (const [zoneName, capacity] of Object.entries(ZONE_CAPACITIES)) {
    const onHand = map[zoneName] || 0;
    heatmap[zoneName] = Math.min(100, Math.round((onHand / capacity) * 100));
  }
  
  return heatmap;
});

  // 2. ACTION: Set the search term based on the zone clicked (to filter 'ALL_SKUS' later)
  focusZone(zone: string) {
    this.invService.searchTerm.set(zone);
    console.log(`ZENTORY_OS // Focusing Geography // ${zone}`);
  }

  // 3. VISUAL: Return a Brutalist background color based on fullness %
  getZoneColor(percentage: number): string {
    if (percentage > 90) return '#D11D27'; // Madder Red (Almost Full)
    if (percentage > 70) return '#E53C38'; // Vermillion (Warning)
    if (percentage > 40) return '#E7C84B'; // Yellow Warn (Medium)
    return '#A3B899'; // Green/Cream (Available Space)
  }
}