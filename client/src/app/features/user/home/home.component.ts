import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute)
  private router = inject(Router);

ngOnInit() {
    // This is like req.params.id in Express
    // We look for the 'id' parameter in the URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.engine.loginAsUser(id);
    }
  }

  navigateToAlerts() {
    this.router.navigate(['/user/system-logs']);
  }
}