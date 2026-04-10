import { Component, signal, inject } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';

// The "Battery"
import { ReportDataService } from '../../../core/services/report-data.service';

// The 5 Rooms (Sub-components)
import { InventoryMatrixComponent } from '../../../core/ui/inventory-matrix/inventory-matrix.component';
import { FinancialWorkstationComponent } from '../../../core/ui/financial-workstation/financial-workstation.component';
import { ServiceInsightsComponent } from '../../../core/ui/service-insights/service-insights.component';
import { QualityWorkstationComponent } from '../../../core/ui/quality-workstation/quality-workstation.component';
import { ReportArchitectComponent } from '../../../core/ui/report-architect/report-architect.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule, 
    RouterModule,
    InventoryMatrixComponent,
    FinancialWorkstationComponent,
    ServiceInsightsComponent,
    QualityWorkstationComponent,
    ReportArchitectComponent
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.css']
})
export class ReportsComponent {
  private reportService = inject(ReportDataService);

  // Global UI State
  protected activeSection = signal<'HUB' | 'INVENTORY' | 'FINANCIAL' | 'SERVICE' | 'QUALITY' | 'ARCHITECT'>('HUB');
  
  // Data for the Overview Hub
  protected summary = this.reportService.reportSummary;
  protected state = this.reportService.businessState;
  protected trends = this.reportService.timePeriodReports;

  navigateTo(section: any) {
    this.activeSection.set(section);
  }

  backToHub() {
    this.activeSection.set('HUB');
  }
}