import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../../shared/components/widgets/widgets.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  // IMPORT the widget here so you can use <app-widget> in the HTML
  imports: [CommonModule, WidgetComponent,RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {}