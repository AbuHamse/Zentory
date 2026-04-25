import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-terminal.component.html'
})
export class ContactTerminalComponent {
  // Logic for form submission to be handled via your backend later
  submitRequest() {
    console.log('ZENTORY_COMMS // Transmission_Sent');
  }
}