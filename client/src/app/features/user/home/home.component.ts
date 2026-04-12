import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../../shared/components/widgets/widgets.component';
import { Router, RouterLink } from '@angular/router';
import { LogisticsEngineService } from '../../../services/logistics-engine.service';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, WidgetComponent, RouterLink, MaterialModule],
  templateUrl: './home.component.html',
})
export class UserHomeComponent {
  protected engine = inject(LogisticsEngineService);
  private router = inject(Router);

  navigateToAlerts() {
    this.router.navigate(['/user/system-logs']);
  }
}