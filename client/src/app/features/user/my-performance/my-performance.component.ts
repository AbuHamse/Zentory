import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../../services/performance.service';

// UI COMPONENT LAYERS
import { StatsGridComponent } from '../../../core/ui/stats-grid/stats-grid.component';
import { LeaderboardComponent } from '../../../core/ui/leaderboard/leaderboard.component';
import { RefuteFormComponent } from '../../../core/ui/refute-form/refute-form.component';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-my-performance',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule,
    StatsGridComponent, 
    LeaderboardComponent, 
    RefuteFormComponent
  ],
  templateUrl: './my-performance.component.html',
  styles: [`
    :host { 
      display: block; 
      height: 100%; 
      background-color: #FFFBF7; 
    }
    .zentory-toast {
      animation: slideInUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes slideInUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class MyPerformanceComponent {
  protected perfService = inject(PerformanceService);

  // UI State Management
  protected isModalOpen = signal(false);
  protected showToast = signal(false);

  /**
   * Orchestrates the UI response after a performance claim is filed.
   */
  onClaimSubmitted() {
    this.isModalOpen.set(false);
    this.triggerNotification();
  }

  private triggerNotification() {
    this.showToast.set(true);
    // Standard system timeout for user feedback
    setTimeout(() => this.showToast.set(false), 4000);
  }

  /**
   * Logic for manual refresh of performance metrics
   */
  refreshMetrics() {
    console.log('ZENTORY_OS // Re-calculating performance nodes...');
    // If your service has an init/refresh method, call it here
  }
}