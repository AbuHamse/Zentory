import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { InventoryDataService } from '../../../services/inventory-data.service';

@Component({
  selector: 'app-floor-plan',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './floor-plan.component.html',
  styles: [`
    :host { display: block; height: 100%; width: 100%; }
    .zone { transition: all 0.2s ease; cursor: pointer; fill-opacity: 0.15; stroke-width: 1px; stroke: #334155; }
    .zone:hover { fill-opacity: 0.4; stroke-width: 3px; }
    .emergency-exit { fill: #22c55e; stroke: #166534; stroke-width: 2px; }
    .active-zone { fill-opacity: 0.6 !important; stroke-width: 4px !important; stroke: #A90011 !important; }
  `]
})
export class FloorPlanComponent {
  // Inject your service
  protected inventoryService = inject(InventoryDataService);

  // Local UI State
  protected selectedZone = signal<string | null>(null);

  // Computed: Get stats for the selected zone from real inventory data
  protected zoneStats = computed(() => {
    const zoneId = this.selectedZone();
    if (!zoneId) return null;

    const inventory = this.inventoryService.inventory();
    const zoneItems = inventory.filter(item => item.location.zone === zoneId);
    
    return {
      skuCount: zoneItems.length,
      totalUnits: zoneItems.reduce((acc, item) => acc + item.quantity.available, 0),
      lowStock: zoneItems.filter(i => i.status === 'LOW_STOCK').length
    };
  });

  protected alerts = signal([
    { type: 'CRITICAL', msg: 'CONGESTION DETECTED IN PACK_STATION_ALPHA.', time: '14:05' },
    { type: 'WARNING', msg: 'FORKLIFT T-219 OFFLINE AT NODE 7.', time: '14:22' },
    { type: 'SECURITY', msg: 'EMERGENCY EXIT DOOR B-2 SECURED.', time: '14:45' }
  ]);

  selectZone(zoneId: string) {
    this.selectedZone.set(zoneId);
  }
}