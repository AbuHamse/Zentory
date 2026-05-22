import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecoveryDataService, ReturnItem } from '../../../services/recovery-data.service';
import { LogisticsEngineService } from '../../../services/logistics-engine.service';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-recovery-center',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './recovery-center.component.html',
  styles: [`
    :host { display: block; height: 100%; background-color: #FFFBF7; }
    .active-card { 
      background-color: #A90011 !  important; 
      color: white !important;
      transform: translateX(10px);
    }
    .active-card p, .active-card span { color: white !important; }
  `]
})
export class RecoveryCenterComponent {
  protected recoveryService = inject(RecoveryDataService);
  protected engine = inject(LogisticsEngineService);

  protected userId = this.engine.currentUser()?.id;

  onSelectItem(item: ReturnItem) {
    this.recoveryService.selectItem(item);
  }
}