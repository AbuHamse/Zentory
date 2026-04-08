import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module'
import { RouterLink } from '@angular/router';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  status: 'Ready' | 'Low' | 'Arriving' | 'Kitted';
  qty: number;
  location: string;
  lastUpdated: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterLink],
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  // Tabs definition
  protected tabs = ['All', 'Components', 'Kitted', 'Arriving Soon', 'Reorder Soon'];
  protected activeTab = signal('All');
  protected searchQuery = signal('');

  // Mock Data
  private allInventory = signal<InventoryItem[]>([
    { id: '1', name: 'Zentory Steel Plate', sku: 'ZTN-PL-001', status: 'Ready', qty: 450, location: 'A-12', lastUpdated: '2026-04-01' },
    { id: '2', name: 'Madder Red Dye', sku: 'ZTN-DY-99', status: 'Low', qty: 12, location: 'B-04', lastUpdated: '2026-04-05' },
    { id: '3', name: 'Pivot Bearing Kit', sku: 'ZTN-KIT-05', status: 'Kitted', qty: 85, location: 'C-01', lastUpdated: '2026-04-02' },
    { id: '4', name: 'Wham-Cream Coating', sku: 'ZTN-CH-02', status: 'Arriving', qty: 0, location: 'Dock-2', lastUpdated: 'Pending' },
    // Add more mock items here...
  ]);

  // Combined Filtering Logic (Tab + Search)
  protected filteredInventory = computed(() => {
    let items = this.allInventory();
    
    // Filter by Tab
    if (this.activeTab() === 'Low Stock' || this.activeTab() === 'Reorder Soon') {
      items = items.filter(i => i.status === 'Low');
    } else if (this.activeTab() !== 'All') {
      items = items.filter(i => i.status.toLowerCase().includes(this.activeTab().toLowerCase().split(' ')[0]));
    }

    // Filter by Search
    const query = this.searchQuery().toLowerCase();
    if (query) {
      items = items.filter(i => 
        i.name.toLowerCase().includes(query) || 
        i.sku.toLowerCase().includes(query)
      );
    }

    return items;
  });

  ngOnInit() {}

  setTab(tab: string) {
    this.activeTab.set(tab);
  }
}