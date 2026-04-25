import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeuralInterfaceComponent } from '../../core/ui/zentra/neural-interface/neural-interface.component';
import { DecisionLogicVisualComponent } from '../../core/ui/zentra/decision-logic-visual/decision-logic-visual.component';
import { AutomatedInsightsFeedComponent } from '../../core/ui/zentra/automated-insights-feed/automated-insights-feed.component';

@Component({
  selector: 'app-zentra',
  standalone: true,
  imports: [
    CommonModule,
    NeuralInterfaceComponent,
    DecisionLogicVisualComponent,
    AutomatedInsightsFeedComponent
  ],
  templateUrl: './zentra.component.html'
})
export class ZentraComponent {
  // Page logic for the AI Assistant overview
}