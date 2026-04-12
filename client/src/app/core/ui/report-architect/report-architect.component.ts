import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { ArchitectEngineService } from '../../../services/architect-engine.service';
import { CustomReportConfig } from '../../../shared/models/performance-analytics.model';

@Component({
  selector: 'app-report-architect',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './report-architect.component.html',
  styleUrls: ['./report-architect.css']
})
export class ReportArchitectComponent {
  // Inject the Engine
  protected engine = inject(ArchitectEngineService);

  // Options remain in UI for selection
  protected sources: CustomReportConfig['dataSource'][] = ['Sales', 'Inventory', 'Returns', 'Complaints'];
  protected frames: CustomReportConfig['timeFrame'][] = ['7D', '30D', '90D', '6M', '1Y'];
  protected visuals: CustomReportConfig['visualType'][] = ['Bar', 'Line', 'Pie', 'Table'];

  // Link local helpers to the engine's signals
  protected config = this.engine.config;
  protected graphData = this.engine.graphData;
  protected isDeployed = this.engine.isDeployed;
  protected selectedPoint = this.engine.activeTab;

  onSaveConfig() {
    this.engine.isDeployed.set(true);
    console.log('Zentory: Architect Deployment Active.');
  }

  downloadGraph() {
    alert(`Exporting ${this.config().title} as high-res PNG...`);
  }

  applyPreset(type: 'AUDIT' | 'SCORECARD') {
  this.engine.applyPreset(type);
}
}