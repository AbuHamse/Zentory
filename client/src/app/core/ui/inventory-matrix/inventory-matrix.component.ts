import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';
import { ReportDataService } from '../../../services/report-data.service';

@Component({
  selector: 'app-inventory-matrix',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './inventory-matrix.component.html',
  styleUrls: ['./inventory-matrix.component.css']
})
export class InventoryMatrixComponent {
  private reportService = inject(ReportDataService);

  // UI State for the searching functionality
  protected searchQuery = signal('');

  // Accessing the specific ProductReport object array from the service
  protected products = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const allProducts = this.reportService.productReports();
    
    if (!query) return allProducts;

    return allProducts.filter(p => 
      p.sku.toLowerCase().includes(query) || 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  });

  // Archiving functionality
  onArchive(sku: string) {
    // This calls the specific archive method we built in the service
    this.reportService.archiveProduct(sku);
  }

  onExport() {
    console.log('Zentory: Processing Inventory Matrix Export (CSV)...');
  }
}