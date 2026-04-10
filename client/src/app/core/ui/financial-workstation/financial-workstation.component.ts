import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { ReportDataService } from '../../../services/report-data.service';

@Component({
  selector: 'app-financial-workstation',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './financial-workstation.component.html',
  styleUrls: ['./financial-workstation.css']
})
export class FinancialWorkstationComponent {
  private reportService = inject(ReportDataService);

  // Pulling specific Financial objects from the service
  protected summary = this.reportService.reportSummary;
  protected timeReports = this.reportService.timePeriodReports;
  protected trendData = this.reportService.trendData;

  // Analysis Logic: Calculating Net Profit Margin for the current period
  protected profitMargin = computed(() => {
    const current = this.timeReports()[0];
    if (!current) return 0;
    return ((current.netProfit / current.revenue) * 100).toFixed(1);
  });

  onGenerateP_L() {
    console.log('Zentory: Generating Profit & Loss Statement...');
  }
}