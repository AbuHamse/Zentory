import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogisticsEngineService } from '../../../services/logistics-engine.service';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-picker-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './picker-dashboard.component.html',
  styleUrls: ['./picker-dashboard.css']
})
export class PickerDashboardComponent {
  protected engine = inject(LogisticsEngineService);

  // local action handlers
  onConfirmPick(orderId: string, sku: string) {
    this.engine.confirmPick(orderId, sku);
  }

  onReportIssue(sku: string, bin: string) {
    this.engine.reportStockIssue(sku, bin);
  }
}