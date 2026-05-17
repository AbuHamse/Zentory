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
    :host { 
      display: block; 
      height: 100%; 
      background-color: #FFFBF7; 
    }
    
    /* Custom scrollbar for that clean enterprise look */
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #334155;
    }
  `]
})
export class AnalyticsComponent {
  // Injecting the Intelligence Hub Data Stream
  protected reportService = inject(ReportDataService);

  /**
   * Standardizes numeric output for the UI.
   * Ensures large financial figures are readable.
   */
  formatValue(val: number | undefined): string {
    if (val === undefined || val === null) return '0';
    return val.toLocaleString();
  }

  /**
   * Returns a color grade based on inventory turnover velocity.
   * Useful for quick visual scanning of SKU performance.
   */
  getVelocityColor(velocity: number): string {
    if (velocity >= 8) return '#22c55e'; // High Velocity
    if (velocity >= 5) return '#3b82f6'; // Steady
    return '#A90011'; // Low Velocity / Stagnant
  }
}