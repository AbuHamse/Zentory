import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../../services/performance.service';

// THE THREE SUB-COMPONENTS
import { StatsGridComponent } from '../../../core/ui/stats-grid/stats-grid.component';
import { LeaderboardComponent } from '../../../core/ui/leaderboard/leaderboard.component';
import { RefuteFormComponent } from '../../../core/ui/refute-form/refute-form.component';

@Component({
  selector: 'app-my-performance',
  standalone: true,
  imports: [
    CommonModule, 
    StatsGridComponent, 
    LeaderboardComponent, 
    RefuteFormComponent
  ],
  templateUrl: './my-performance.component.html'
})
export class MyPerformanceComponent {
  protected perfService = inject(PerformanceService);

  // UI State Signals
  protected isModalOpen = signal(false);
  protected showToast = signal(false);

  /**
   * Responds to the child (RefuteFormComponent) (submitted) event
   */
  onClaimSubmitted() {
    this.isModalOpen.set(false);
    this.triggerToast();
  }

  private triggerToast() {
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }
}