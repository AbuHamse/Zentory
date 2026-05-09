import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDataService } from '../../../services/inventory-data.service';
import { MatIconModule } from '@angular/material/icon';

const ZONE_CAPACITIES = {
  'DYNAMIC-LEFT': 600,   // Left Green Wing
  'DYNAMIC-RIGHT': 600,  // Right Green Wing
  'STATIC-CENTER': 400,  // Blue Center Block
  'STAGING-IN': 200,     // Pink Left Staging
  'STAGING-OUT': 200,    // Purple Right Staging
  'RECEIVING': 300,      // Gray Bottom Left (Trucks)
  'SHIPPING': 300        // Brown Bottom Right (Trucks)
};

@Component({
  selector: 'app-zone-map',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './zone-map.component.html',
  styleUrls: ['./zone-map.css']
})
export class ZoneMapComponent {
  protected invService = inject(InventoryDataService);
  protected isFullscreen = signal(false);
  protected selectedZoneDetail = signal<any>(null);

  public zoneHeatmap = computed(() => {
    const items = this.invService.inventory();
    const map: Record<string, number> = {};

    items.forEach(item => {
      const zoneName = item.location.zone;
      if (!map[zoneName]) map[zoneName] = 0;
      map[zoneName] += item.quantity.onHand;
    });

    const heatmap: Record<string, any> = {};
    for (const [zoneName, capacity] of Object.entries(ZONE_CAPACITIES)) {
      const onHand = map[zoneName] || 0;
      heatmap[zoneName] = {
        percentage: Math.min(100, Math.round((onHand / capacity) * 100)),
        onHand: onHand,
        capacity: capacity
      };
    }
    return heatmap;
  });

  toggleMapMode(event: Event) {
    event.stopPropagation();
    this.isFullscreen.update(val => !val);
  }

  focusZone(zone: string, event: Event) {
    event.stopPropagation();
    this.invService.searchTerm.set(zone);
    this.selectedZoneDetail.set({ name: zone, ...this.zoneHeatmap()[zone] });
  }

  getZoneColor(percentage: number): string {
    if (percentage > 90) return '#A90011'; // High Intensity Red
    if (percentage > 60) return '#D11D27'; // Medium Intensity
    if (percentage > 30) return '#FBE9D9'; // Low Intensity Cream
    return '#FFFBF7'; // Available
  }
}