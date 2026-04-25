import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tier-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tier-selector.component.html'
})
export class TierSelectorComponent {
  @Output() tierChanged = new EventEmitter<'STANDARD' | 'PREMIUM'>();
  
  activeTier: 'STANDARD' | 'PREMIUM' = 'STANDARD';

  setTier(tier: 'STANDARD' | 'PREMIUM') {
    this.activeTier = tier;
    this.tierChanged.emit(tier);
  }
}