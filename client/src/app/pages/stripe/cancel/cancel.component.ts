import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cancel.component.html',
  styleUrl: './cancel.css'
})
export class CancelComponent {}