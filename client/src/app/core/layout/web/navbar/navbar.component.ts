import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  // Logic for Auth0 will be injected here later
  login() {
    console.log('ZENTORY_AUTH // Initializing_Login_Sequence...');
  }
}