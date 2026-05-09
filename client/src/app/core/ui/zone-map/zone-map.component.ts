import { Component, inject, computed, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDataService } from '../../../services/inventory-data.service';
import { MatIconModule } from '@angular/material/icon';

const ZONE_CAPACITIES = {
  'DYNAMIC-LEFT': 600,
  'DYNAMIC-RIGHT': 600,
  'STATIC-CENTER': 400,
  'RECEIVING': 300,
  'SHIPPING': 300
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
  
  // Output to tell the Overview component to switch cases/tabs
  @Output() zoneSelected = new EventEmitter<string>();

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

  toggleMapMode(event?: Event) {
    if (event) event.stopPropagation();
    this.isFullscreen.update(val => !val);
  }

  // Navigation Logic for Red Widgets
  navigateToZoneDetail(zone: string, event: Event) {
    event.stopPropagation();
    this.invService.searchTerm.set(zone);
    this.zoneSelected.emit('ZONE_DETAIL'); // Tell Overview to show the detail case
    console.log(`ZENTORY_OS // Navigation Triggered // ${zone}`);
  }

  focusZone(zone: string, event: Event) {
    event.stopPropagation();
    this.invService.searchTerm.set(zone);
    const stats = this.zoneHeatmap()[zone];
    this.selectedZoneDetail.set({ name: zone, ...stats });
  }

  getZoneColor(percentage: number): string {
    if (percentage > 85) return '#A90011';
    if (percentage > 50) return '#D11D27';
    return '#FBE9D9';
  }
}