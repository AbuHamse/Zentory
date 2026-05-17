import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { ReportDataService } from '../../../services/report-data.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './analytics.component.html',
  styles: [`
    :host { display: block; height: 100%; background-color: #f8fafc; }
    .chart-placeholder { 
      background: linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 100%);
      border-bottom: 2px solid #33415510;
    }
  `]
})
export class AnalyticsComponent {
  protected reportService = inject(ReportDataService);

  // Helper to format large numbers for the enterprise view
  formatValue(val: number | undefined): string {
    return val ? val.toLocaleString() : '0';
  }
}