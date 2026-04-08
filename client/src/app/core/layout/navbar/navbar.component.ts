// src/app/core/layout/navbar/navbar.component.ts
import { Component, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // Use v21 outputs for the toggle
  onToggleSidenav = output<void>();
  
  // Use inputs if you want to pass the username or title from the parent
  title = input('Zentory');
}