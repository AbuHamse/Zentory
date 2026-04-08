import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module'
import { RouterLink } from '@angular/router';

// Interface for our KPI cards to keep things typed
interface KpiCard {
  label: string;
  value: string;
  trend?: string;
  isWarning?: boolean;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './overview.component.html',
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class OverviewComponent implements OnInit {
  // Using Signals for that high-performance Angular v21 feel
  protected readonly currentDate = signal(new Date());
  
  // KPI Data - mapped to the red boxes in your wireframe
  protected readonly kpiStats = signal<KpiCard[]>([
    { label: 'Total Revenue', value: '$532k', trend: '+12%' },
    { label: 'New Orders', value: '3,432', trend: '+5%' },
    { label: 'Low Stock', value: '1,942', isWarning: true },
    { label: 'Return Customers', value: '33%', trend: '-2%' }
  ]);

  // Mock data for the Best Sellers list
  protected readonly bestSellers = signal([
    { name: 'Kelly Bookshelf', sku: 'BR 8129', units: 124, price: 72931 },
    { name: 'Darcy Side Table', sku: 'BR 3039', units: 107, price: 20116 },
    { name: 'Clarissa Chaise', sku: 'BR 8129', units: 102, price: 99960 }
  ]);

  ngOnInit(): void {
    // This is where we will later call: this.authService.checkRole('ADMIN')
    console.log('Zentory Command Center Initialized...');
  }
}