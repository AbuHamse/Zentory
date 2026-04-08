import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './widgets.component.html'
  // Styles moved to global styles.css for better performance
})
export class WidgetComponent {
  label = input.required<string>();
  icon = input<string>('analytics');
  value = input<string | number>('--');
  unit = input<string>('');
}