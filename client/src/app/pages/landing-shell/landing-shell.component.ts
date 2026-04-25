import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Required for router-outlet

// Import the specific components you created
import { NavbarComponent } from '../../core/layout/web/navbar/navbar.component';
import { FooterComponent } from '../../core/layout/web/footer/footer.component';

@Component({
  selector: 'app-landing-shell',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,    // Fixes 'router-outlet' error
    NavbarComponent, // Fixes 'app-navbar' error
    FooterComponent  // Fixes 'app-footer' error
  ],
  templateUrl: './landing-shell.component.html',
  styleUrl: './landing-shell.css' // or .css
})
export class LandingShellComponent {}