import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-neural-interface',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './neural-interface.component.html'
})
export class NeuralInterfaceComponent {
  // Mock conversation data for visual representation
  protected chatLogs = [
    { 
      origin: 'OPERATOR_01', 
      content: 'Identify the production dip in Interval 4 at Station B.',
      isUser: true 
    },
    { 
      origin: 'ZENTRA_CORE', 
      content: 'ANALYSIS_COMPLETE: Dip attributed to material replenishment delay (Seal_Protocol_Mismatch). Recommending runner reallocation to Bay 04.',
      isUser: false 
    }
  ];
}