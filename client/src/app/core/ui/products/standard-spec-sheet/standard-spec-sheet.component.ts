import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standard-spec-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standard-spec-sheet.component.html'
})
export class StandardSpecSheetComponent {
  // Input allows the parent to potentially hide/show this based on the toggle
  @Input() visible = true;

  protected coreFeatures = [
    { label: 'Inventory_Control', detail: 'Full CRUD operations for warehouse stock management.' },
    { label: 'Shift_Accountability', detail: 'Manual 12-hour interval tracking & reporting.' },
    { label: 'Basic_BI', detail: 'End-of-day throughput summary exports.' },
    { label: 'Carrier_Sync', detail: 'Manual manifest entry for outbound gates.' }
  ];
}