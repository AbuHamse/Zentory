import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { RouterLink } from '@angular/router';
import { ReportDataService } from '../../../services/report-data.service';

// Workstation Components
import { InventoryMatrixComponent } from '../../../core/ui/inventory-matrix/inventory-matrix.component';
import { FinancialWorkstationComponent } from '../../../core/ui/financial-workstation/financial-workstation.component';
import { ServiceInsightsComponent } from '../../../core/ui/service-insights/service-insights.component';
import { QualityWorkstationComponent } from '../../../core/ui/quality-workstation/quality-workstation.component';
import { ReportArchitectComponent } from '../../../core/ui/report-architect/report-architect.component';
import { LowStockComponent } from '../../../core/ui/low-stock/low-stock.component';
import { ZoneMapComponent } from '../../../core/ui/zone-map/zone-map.component';
import { ZoneDetailComponent } from '../../../core/ui/zone-detail/zone-detail.component';

interface KpiCard {
  label: string;
  value: string | number;
  isWarning?: boolean;
  sectionKey: string;
}

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule,
    FormsModule, 
    RouterLink,
    InventoryMatrixComponent, // Restored to fix NG8001
    FinancialWorkstationComponent,
    ServiceInsightsComponent,
    QualityWorkstationComponent,
    ReportArchitectComponent,
    LowStockComponent,
    ZoneMapComponent,
    ZoneDetailComponent
  ],
  templateUrl: './overview.component.html',
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class OverviewComponent implements OnInit {
  private reportService = inject(ReportDataService);

  // 1. Navigation & Search State
  protected activeSection = signal('HUB');
  protected searchQuery = signal('');
  protected isModalOpen = signal(false);
  protected modalContext = signal<string>('');

  // 2. Data Streams from Service
  protected summary = this.reportService.reportSummary;
  protected state = this.reportService.businessState;
  protected productReports = this.reportService.productReports; 
  protected trends = this.reportService.timePeriodReports;

  // 3. Dynamic KPI Mapping
  protected readonly kpiStats = computed<KpiCard[]>(() => [
    { 
      label: 'Financial Flux', 
      sectionKey: 'REVENUE',
      value: `$${((this.state()?.summary?.totalRevenue ?? 0) / 1000).toFixed(0)}k` 
    },
    { 
      label: 'Order Velocity', 
      sectionKey: 'ORDERS',
      value: this.trends()[0]?.ordersCount?.toLocaleString() || '0' 
    },
    { 
      label: 'Low Stock', 
      sectionKey: 'STOCK',
      value: '1,942', 
      isWarning: true 
    },
    { 
      label: 'Deficit Rate', 
      sectionKey: 'RISK',
      value: `${this.summary()?.returns?.rate ?? 0}%` 
    }
  ]);

  // 4. Visual Component Data (Warehouse & Regions)
  protected warehouseSections = computed(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: `SEC-${i + 1}`,
      isLoaded: i % 3 !== 0 
    }));
  });

  protected topRegions = computed(() => [
    { name: 'North Sector', value: 80, sectionKey: 'LOGISTICS' },
    { name: 'East Logistics', value: 60, sectionKey: 'LOGISTICS' },
    { name: 'South Receiving', value: 40, sectionKey: 'LOGISTICS' }
  ]);

  // 5. Interaction Methods
  navigateTo(section: string) {
    this.activeSection.set(section);
  }

  backToHub() {
    this.activeSection.set('HUB');
    this.searchQuery.set('');
  }

  openEditor(context: string, event: Event) {
    event.stopPropagation();
    this.modalContext.set(context);
    this.isModalOpen.set(true);
  }

  ngOnInit(): void {
    console.log('Zentory: Intelligence Hub Streaming Active.');
  }
}