import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

// 1. IMPORT YOUR JSON (Make sure path is correct)
import ordersData from '../../../assets/data/orders.json';
import { RouterLink } from '@angular/router';

// 2. DEFINE THE TYPE INTERFACE
export interface OrderLine {
  product: string;
  sku: string;
  qtyOrdered: number;
  qtyPicked: number;
  status: 'Pending' | 'Picked' | 'Short';
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  lines: number;
  totalItems: number;
  urgency: 'Priority' | 'Standard';
  courier: string;
  palletType: 'CHEP' | 'Regular' | 'Plastic';
  status: 'Processing' | 'Picked' | 'Packed' | 'Shipped';
  details: OrderLine[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  // Use the imported JSON as the initial value for the signal
  protected orders = signal<Order[]>(ordersData as Order[]);
  
  protected expandedOrderId = signal<string | null>(null);
  protected statusFilter = signal<'All' | 'Processing' | 'Picked' | 'Packed' | 'Shipped'>('All');
  protected tabs: ('All' | 'Processing' | 'Picked' | 'Packed' | 'Shipped')[] = 
    ['All', 'Processing', 'Picked', 'Packed', 'Shipped'];

  // Filtration logic
  protected filteredOrders = computed(() => {
    const filter = this.statusFilter();
    const allOrders = this.orders();
    
    if (filter === 'All') return allOrders;
    return allOrders.filter(order => order.status === filter);
  });

  setFilter(status: any) {
    this.statusFilter.set(status);
    this.expandedOrderId.set(null);
  }

  toggleOrder(id: string) {
    this.expandedOrderId.update(current => current === id ? null : id);
  }
}