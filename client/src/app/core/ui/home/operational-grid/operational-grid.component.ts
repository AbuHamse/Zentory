import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operational-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operational-grid.component.html'
})
export class OperationalGridComponent {
  // 6 intervals representing 2-hour sprints in a 12-hour shift
  protected intervals = [
    { id: 1, start: '00:00', end: '02:00', label: 'PHASE_ALPHA' },
    { id: 2, start: '02:00', end: '04:00', label: 'PHASE_BRAVO' },
    { id: 3, start: '04:00', end: '06:00', label: 'PHASE_CHARLIE' },
    { id: 4, start: '06:00', end: '08:00', label: 'PHASE_DELTA' },
    { id: 5, start: '08:00', end: '10:00', label: 'PHASE_ECHO' },
    { id: 6, start: '10:00', end: '12:00', label: 'PHASE_FOXTROT' }
  ];
}