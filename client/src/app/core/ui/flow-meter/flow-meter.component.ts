import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutboundDataService } from '../../../services/outbound-data.service';

@Component({
  selector: 'app-flow-meter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flow-meter.component.html'
})
export class FlowMeterComponent {
  protected outboundService = inject(OutboundDataService);

  // Constants for the "Target" logic
protected readonly HOURLY_TARGET = 500;

  // Logic to calculate units shipped in the current session
  protected currentThroughput = computed(() => {
    return this.outboundService.shipments()
      .filter(s => s.status === 'DEPARTED')
      .reduce((acc, curr) => acc + curr.totalPallets, 0); // Using pallets for flow scale
  });

  protected flowPercentage = computed(() => {
    const pct = (this.currentThroughput() / this.HOURLY_TARGET) * 100;
    return Math.min(pct, 100); // Cap at 100% for the bar
  });

  protected getStatusMessage = computed(() => {
    const pct = this.flowPercentage();
    if (pct >= 90) return 'MAX_CAPACITY // FLOW_OPTIMAL';
    if (pct >= 60) return 'SYSTEM_STABLE // NORMAL_FLOW';
    return 'BOTTLENECK_DETECTED // INCREASE_VELOCITY';
  });
}