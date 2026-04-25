import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-matrix.component.html'
})
export class FeatureMatrixComponent {
  protected features = [
    {
      title: 'Warehouse_Management',
      code: 'WMS',
      id_hex: '0x4A1',
      description: 'End-to-end stock oversight via high-density CRUD operations and real-time inventory reconciliation.',
      specs: ['BIN_LOCATION_MAPPING', 'SKU_VELOCITY_TRACKING', 'LIFO_FIFO_COMPLIANCE']
    },
    {
      title: 'Business_Intelligence',
      code: 'BI',
      id_hex: '0x8B2',
      description: 'Data-driven decision making powered by historical trend analysis and shift production heatmaps.',
      specs: ['THROUGHPUT_ANALYTICS', 'INTERVAL_REPORTING', 'ERROR_RATE_MONITORING']
    },
    {
      title: 'Workforce_Tracking',
      code: 'WFT',
      id_hex: '0x2C9',
      description: 'Granular accountability for personnel across 12-hour windows using interval production benchmarks.',
      specs: ['LABOR_ALLOCATION', 'PERFORMANCE_LEADERBOARDS', 'REFUTE_CLAIM_LOGIC']
    },
    {
      title: 'Logistics_Network',
      code: 'NET',
      id_hex: '0xE31',
      description: 'Seamless integration with carrier gateways and real-time manifest synchronization for outbound gates.',
      specs: ['CARRIER_API_HOOKS', 'MANIFEST_AUTO_GEN', 'SEAL_PROTOCOL_VERIFICATION']
    }
  ];
}