import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../../services/performance.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent {
  protected perfService = inject(PerformanceService);
  
  // Tab control for roles
  protected activeRole = signal<'PICKER' | 'PACKER' | 'SHIPPER'>('PICKER');

  // Filtered list based on the selected tab
  protected filteredLeaderboard = computed(() => {
    return this.perfService.leaderboard()
      .filter(staff => staff.role === this.activeRole());
  });

  setRole(role: any) {
    this.activeRole.set(role);
    console.log(`ZENTORY_OS // Switching_Leaderboard_View // ${role}S`);
  }
}