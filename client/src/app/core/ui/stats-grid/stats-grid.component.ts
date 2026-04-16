import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-grid.component.html'
})
export class StatsGridComponent {
  @Input() intervals: any[] = [];

  getStatusClass(status: string): string {
    switch (status) {
      case 'OPTIMAL': return 'bg-green-400 text-black';
      case 'LABOR_SHARE': return 'bg-blue-400 text-white';
      case 'DOWNTIME': return 'bg-wham-warn text-black';
      case 'BELOW_EXPECTATION': return 'bg-wham-primary text-white';
      default: return 'bg-wham-white text-black';
    }
  }
}