import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { ReportDataService } from '../../../services/report-data.service';
import { CustomReportConfig } from '../../../shared/models/performance-analytics.model';

@Component({
  selector: 'app-report-architect',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './report-architect.component.html',
  styleUrls: ['./report-architect.css']
})
export class ReportArchitectComponent {
  private reportService = inject(ReportDataService);

  // Available options for the builder
  protected sources: CustomReportConfig['dataSource'][] = ['Sales', 'Inventory', 'Returns', 'Complaints'];
  protected frames: CustomReportConfig['timeFrame'][] = ['7D', '30D', '90D', '1Y'];
  protected visuals: CustomReportConfig['visualType'][] = ['Bar', 'Line', 'Pie', 'Table'];

  // The active configuration being built
  protected config = signal<CustomReportConfig>({
    title: 'NEW ANALYTICS REPORT',
    dataSource: 'Sales',
    timeFrame: '30D',
    visualType: 'Bar',
    metrics: ['Total Revenue', 'Profit Margin']
  });

  onSaveConfig() {
    console.log('Zentory: Saving Architect Configuration...', this.config());
    // This would eventually push to a "Saved Reports" array in your service
  }
}