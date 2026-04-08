import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../shared/components/widgets/widgets.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // IMPORT the widget here so you can use <app-widget> in the HTML
  imports: [CommonModule, WidgetComponent, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}