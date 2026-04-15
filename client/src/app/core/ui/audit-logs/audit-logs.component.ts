import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryDataService } from '../../../services/inventory-data.service';

interface AuditEntry {
  timestamp: string;
  sku: string;
  user: string;
  action: 'PICKED' | 'RECEIVED' | 'REGISTERED';
  zone: string;
}

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-logs.component.html'
})
export class AuditLogsComponent {
  protected invService = inject(InventoryDataService);

  // COMPUTED: Flattens the inventory into a historical timeline
  public auditTrail = computed(() => {
    const items = this.invService.inventory();
    const logs: AuditEntry[] = [];

    items.forEach(item => {
      // 1. Map 'Received' events
      item.recievedBy.forEach(user => {
        logs.push({
          timestamp: item.lastCounted, // Mocking time for the demo
          sku: item.sku,
          user: user,
          action: 'RECEIVED',
          zone: item.location.zone
        });
      });

      // 2. Map 'Picked' events
      item.pickedBy.forEach(user => {
        logs.push({
          timestamp: new Date().toISOString(), // Mocking current activity
          sku: item.sku,
          user: user,
          action: 'PICKED',
          zone: item.location.zone
        });
      });
    });

    // Sort by timestamp descending (Newest first)
    return logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  });
}