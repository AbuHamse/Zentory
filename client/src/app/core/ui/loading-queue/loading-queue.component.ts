import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutboundDataService } from '../../../services/outbound-data.service';

@Component({
  selector: 'app-loading-queue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-queue.component.html'
})
export class LoadingQueueComponent {
  protected outboundService = inject(OutboundDataService);

  // Filter for trailers that are still in 'STAGING'
  protected stagingList = computed(() => 
    this.outboundService.shipments().filter(s => s.status === 'STAGING')
      .sort((a, b) => new Date(a.scheduledDeparture).getTime() - new Date(b.scheduledDeparture).getTime())
  );

  // Quick stats for the header
  protected totalPalletsWaiting = computed(() => 
    this.stagingList().reduce((acc, curr) => acc + curr.totalPallets, 0)
  );

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'CRITICAL_CUTOFF': return 'border-wham-primary text-wham-primary animate-pulse';
      case 'HOT_LOAD': return 'border-orange-500 text-orange-500';
      default: return 'border-black text-black opacity-60';
    }
  }
}