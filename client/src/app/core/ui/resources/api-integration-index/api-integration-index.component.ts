import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-integration-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-integration-index.component.html'
})
export class ApiIntegrationIndexComponent {
  protected partners = [
    { name: 'STRIPE_COMMERCE', status: 'ACTIVE_PORT', type: 'PAYMENT_GATEWAY' },
    { name: 'FEDEX_MANIFEST', status: 'ACTIVE_PORT', type: 'CARRIER_API' },
    { name: 'UPS_LOGISTICS', status: 'ACTIVE_PORT', type: 'CARRIER_API' },
    { name: 'AUTH0_IDENTITY', status: 'ENCRYPTED', type: 'AUTH_LAYER' },
    { name: 'AWS_CLOUD_SYNC', status: 'SYNCHRONIZED', type: 'INFRASTRUCTURE' },
    { name: 'STATION_B_TERMINAL', status: 'CONNECTED', type: 'HARDWARE_LINK' }
  ];
}