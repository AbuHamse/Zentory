import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';

// Import mock data
import returnsData from '../../../assets/data/returns.json';

export interface ReturnReport {
  id: string;
  originalOrderId: string;
  customer: string;
  item: string;
  qty: number;
  reason: 'Damaged' | 'Defective' | 'Wrong Item' | 'Buyer Remorse';
  status: 'Pending Inspection' | 'Restocked' | 'Quarantined' | 'Scrapped';
  disposition?: 'Return to Stock' | 'Write-off' | 'Return to Vendor';
  dateReceived: string;
  images?: string[];
}

@Component({
  selector: 'app-returns-damages',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './returns-damages.component.html',
  styleUrls: ['./returns-damages.css']
})
export class ReturnsDamagesComponent {
  protected allReturns = signal<ReturnReport[]>(returnsData as ReturnReport[]);
  protected selectedReturn = signal<ReturnReport | null>(null);
  protected activeFilter = signal<string>('ALL');

  protected filteredReturns = computed(() => {
    const filter = this.activeFilter();
    const data = this.allReturns();
    const result = filter === 'ALL' ? data : data.filter(r => r.status === filter);
    return result.slice(0, 15);
  });

  // Analytics for the "AI Agent" style stats
  protected totalLoss = computed(() => {
    // Mock calculation: $50 per item scrapped
    return this.allReturns()
      .filter(r => r.status === 'Scrapped')
      .length * 50;
  });

  selectReturn(report: ReturnReport) {
    this.selectedReturn.set(report);
  }
}