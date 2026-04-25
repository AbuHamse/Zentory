import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// SUB-COMPONENT IMPORTS
import { HeroPulseComponent } from '../../core/ui/home/hero-pulse/hero-pulse.component';
import { OperationalGridComponent } from '../../core/ui/home/operational-grid/operational-grid.component';
import { FeatureMatrixComponent } from '../../core/ui/home/feature-matrix/feature-matrix.component';
import { ProofOfLogicComponent } from '../../core/ui/home/proof-of-logic/proof-of-logic.component';
import { SystemTelemetryComponent } from '../../core/ui/home/system-telemetry/system-telemetry.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroPulseComponent,
    OperationalGridComponent,
    FeatureMatrixComponent,
    ProofOfLogicComponent,
    SystemTelemetryComponent
  ],
  templateUrl: './home.component.html'
})
export class Home {
  // The parent component acts as the scroll-container and layout manager
}