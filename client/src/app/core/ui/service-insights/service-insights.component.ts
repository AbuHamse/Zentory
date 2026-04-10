import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { ReportDataService } from '../../../services/report-data.service';

@Component({
  selector: 'app-service-insights',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './service-insights.component.html',
  styleUrls: ['./service-insights.css']
})
export class ServiceInsightsComponent {
  private reportService = inject(ReportDataService);

  // Pulling the split feedback data from our service
  protected summaries = this.reportService.userFeedbackSummary;
  protected logs = this.reportService.complaintsReports;

  // Analysis: Determining the most critical category based on resolution time
  protected criticalCategory = computed(() => {
    return [...this.summaries()].sort((a, b) => b.averageResolutionTimeHrs - a.averageResolutionTimeHrs)[0];
  });

  getSentimentColor(score: number): string {
    if (score > 70) return 'text-green-500';
    if (score > 40) return 'text-wham-primary';
    return 'text-wham-warn';
  }
}