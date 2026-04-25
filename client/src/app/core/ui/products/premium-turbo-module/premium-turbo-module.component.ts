import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium-turbo-module',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './premium-turbo-module.component.html'
})
export class PremiumTurboModuleComponent {
  @Input() visible = true;

  protected turboFeatures = [
    { label: 'Zentra_AI_Core', detail: 'Natural language bottleneck detection and neural assistance.' },
    { label: 'Predictive_Analytics', detail: 'AI-driven labor allocation forecasting and risk mitigation.' },
    { label: 'Automated_Claims', detail: 'Instant refute-claim logic for worker performance disputes.' },
    { label: 'Multi_Hub_Sync', detail: 'Real-time synchronization across global warehouse nodes.' }
  ];
}