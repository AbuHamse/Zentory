import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-automated-insights-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './automated-insights-feed.component.html'
})
export class AutomatedInsightsFeedComponent {
  // Simulated feed of proactive AI insights
  protected alerts = [
    { 
      type: 'PREDICTIVE', 
      time: '0.02s_AGO', 
      msg: 'Station 3 requires replenishment in 18 minutes.',
      severity: 'LOW'
    },
    { 
      type: 'ANOMALY', 
      time: '1.45s_AGO', 
      msg: 'Production dip detected in Bay 04 (Inbound Overflow).',
      severity: 'CRITICAL'
    },
    { 
      type: 'OPTIMIZATION', 
      time: '5.12s_AGO', 
      msg: 'Shift B throughput exceeds benchmark by 12%.',
      severity: 'SUCCESS'
    }
  ];
}