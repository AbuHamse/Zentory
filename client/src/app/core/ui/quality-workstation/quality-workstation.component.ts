import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { ReportDataService } from '../../../services/report-data.service';

@Component({
  selector: 'app-quality-workstation',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './quality-workstation.component.html',
  styleUrls: ['./quality-workstation.component.css']
})
export class QualityWorkstationComponent {
  private reportService = inject(ReportDataService);

  // Pulling Data from the Service
  protected businessSummary = this.reportService.reportSummary;
  protected products = this.reportService.productReports;

  // Analysis: Find products with the highest return rate
  protected highRiskProducts = computed(() => {
    return this.products()
      .filter(p => p.returnRate > 8)
      .sort((a, b) => b.returnRate - a.returnRate);
  });

  // Calculate total units lost across all high-risk items
  protected totalReturnVolume = computed(() => {
    return this.products().reduce((acc, p) => acc + (p.unitsSold * (p.returnRate / 100)), 0);
  });
}