import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// SUB-COMPONENT IMPORTS
import { TransmissionBlogComponent } from '../../core/ui/resources/transmission-blog/transmission-blog.component';
import { CompanyLedgerComponent } from '../../core/ui/resources/company-ledger/company-ledger.component';
import { ApiIntegrationIndexComponent } from '../../core/ui/resources/api-integration-index/api-integration-index.component';
import { ContactTerminalComponent } from '../../core/ui/resources/contact-terminal/contact-terminal.component';
import { ResourceArchiveComponent } from '../../core/ui/resources/resource-archive/resource-archive.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonModule,
    TransmissionBlogComponent,
    CompanyLedgerComponent,
    ApiIntegrationIndexComponent,
    ContactTerminalComponent,
    ResourceArchiveComponent
  ],
  templateUrl: './resources.component.html'
})
export class ResourcesComponent {
  // Logic for resource filtering or archive searching can be added here
}