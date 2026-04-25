import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-archive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-archive.component.html'
})
export class ResourceArchiveComponent {
  protected manuals = [
    { name: 'Core_Logic_Reference', size: '4.2MB', type: 'PDF' },
    { name: 'API_Endpoint_Manifest', size: '1.8MB', type: 'DOCX' },
    { name: 'WMS_Installation_Guide', size: '12.4MB', type: 'PDF' },
    { name: 'Zentra_Model_Weights_v4', size: '1.2GB', type: 'BIN' }
  ];
}