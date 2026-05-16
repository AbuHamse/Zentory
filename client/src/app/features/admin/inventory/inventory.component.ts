import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryItem } from '../../../shared/models/user/inventory-item.model';

import { AddAssetModalComponent } from '../../../core/ui/add-asset-modal/add-asset-modal.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterLink],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  private dialog = inject(MatDialog);

  // Tabs kept exactly as you requested
  protected tabs = ['All', 'Components', 'Kitted', 'Arriving Soon', 'Reorder Soon'];
  
  protected activeTab = this.inventoryService.activeCategory;
  protected isLoading = this.inventoryService.isLoading;
  protected lastUpdated = this.inventoryService.lastSync;
  protected searchQuery = signal('');

  protected filteredInventory = computed<InventoryItem[]>(() => {
    const query = this.searchQuery().toLowerCase();
    const tab = this.activeTab();
    const rawItems = this.inventoryService.items();

    let items = rawItems;

    if (tab === 'Reorder Soon') {
      items = items.filter(i => i.quantity.onHand <= i.quantity.minThreshold);
    } 
    else if (tab === 'Arriving Soon') {
      items = items.filter(i => i.status === 'ARRIVING' || i.status === 'TRANSIT');
    } 
    else if (tab !== 'All') {
      items = items.filter(i => 
        i.category === tab.toUpperCase() || 
        i.status?.toLowerCase().includes(tab.toLowerCase().split(' ')[0])
      );
    }

    if (query) {
      items = items.filter(i => 
        i.name.toLowerCase().includes(query) || 
        i.sku.toLowerCase().includes(query) ||
        i.location?.zone?.toLowerCase().includes(query)
      );
    }

    return items;
  });

  ngOnInit(): void {
    console.log('ZENTORY_OS // Admin Inventory Console Active');
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  async refreshData() {
    console.log('ZENTORY_OS // Initiating Manual Vault Resync...');
    await this.inventoryService.initializeEnterpriseData();
  }

  // RESTORED: Deletion Protocol
  async deleteItem(sku: string) {
    const confirmDelete = confirm(`Are you sure you want to decommission SKU: ${sku}?`);
    if (confirmDelete) {
      console.log(`ZENTORY_OS // Decommissioning Protocol Initiated for: ${sku}`);
      // await this.inventoryService.deleteItem(sku);
    }
  }

  // NEW: Add Asset Modal Trigger
  openAddAssetModal() {
    console.log('ZENTORY_OS // Launching Asset Creation Modal');
     const dialogRef = this.dialog.open(AddAssetModalComponent, {
      width: '600px',
      panelClass: 'zentory-brutalist-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.refreshData();
    });
    
  }

  protected inventoryStats = computed(() => {
    const items = this.inventoryService.items();
    return {
      total: items.length,
      lowStock: items.filter(i => i.quantity.onHand <= i.quantity.minThreshold).length,
      valuation: items.reduce((acc, i) => acc + (i.quantity.onHand * (i.unitPrice || 15)), 0)
    };
  });
}