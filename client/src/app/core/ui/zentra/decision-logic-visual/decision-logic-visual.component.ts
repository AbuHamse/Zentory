import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-decision-logic-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decision-logic-visual.component.html'
})
export class DecisionLogicVisualComponent {
  // Logic nodes for the visualization
  protected logicNodes = [
    { id: 'DATA_INGEST', label: 'WORKER_METRICS', status: 'COMPLETE' },
    { id: 'CROSS_REF', label: 'HISTORICAL_BI', status: 'ACTIVE' },
    { id: 'PREDICTIVE', label: 'THROUGHPUT_MAP', status: 'PENDING' }
  ];
}