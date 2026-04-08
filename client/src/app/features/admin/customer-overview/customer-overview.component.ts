import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material.module';

// 1. IMPORT THE INTERFACES
import { Customer, CustomerOverview } from '../../../shared/models/customer.model';

// 2. IMPORT MOCK DATA
import customersData from '../../../assets/data/customers.json';
import overviewData from '../../../assets/data/customeroverviews.json';

@Component({
  selector: 'app-customer-overview',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.css']
})
export class CustomerOverviewComponent {
  // Signals casted to our new interfaces
  private customers = signal<Customer[]>(customersData as Customer[]);
  private overviews = signal<CustomerOverview[]>(overviewData as CustomerOverview[]);

  // State for the Notes UI
  protected isAddingNote = signal(false);
  protected editingNoteIndex = signal<number | null>(null);
  protected noteInput = signal('');

  protected searchQuery = signal('');
  protected selectedCustomerId = signal<string | null>(null);

  // NOTE ACTIONS
  startAddNote() {
    this.noteInput.set('');
    this.isAddingNote.set(true);
    this.editingNoteIndex.set(null);
  }

  startEditNote(index: number, text: string) {
    this.noteInput.set(text);
    this.editingNoteIndex.set(index);
    this.isAddingNote.set(false);
  }

  cancelNote() {
    this.isAddingNote.set(false);
    this.editingNoteIndex.set(null);
    this.noteInput.set('');
  }

saveNote() {
    const profile = this.activeProfile();
    const text = this.noteInput().trim();
    
    // Safety check: ensure profile exists and has an internalNotes array
    if (!profile || !text) return;
    
    // Initialize array if it somehow doesn't exist
    if (!profile.internalNotes) {
      profile.internalNotes = [];
    }

    if (this.isAddingNote()) {
      profile.internalNotes.unshift({
        author: 'System Admin',
        date: new Date().toISOString(),
        text: text
      });
    } else if (this.editingNoteIndex() !== null) {
      profile.internalNotes[this.editingNoteIndex()!].text = text;
    }

    this.cancelNote();
  }

  deleteNote(index: number) {
    const profile = this.activeProfile();
    // Safety check: ensure array exists before splicing
    if (profile && profile.internalNotes) {
      profile.internalNotes.splice(index, 1);
    }
  }

  // Filter logic for sidebar
  protected filteredList = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const list = this.customers().filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.id.toLowerCase().includes(query)
    );
    return list.slice(0, 15);
  });

  // Combined profile logic
  protected activeProfile = computed(() => {
    const id = this.selectedCustomerId();
    if (!id) return null;

    const identity = this.customers().find(c => c.id === id);
    const overview = this.overviews().find(o => o.customerId === id);

    if (!identity) return null;

    // Returns a combined object for the UI
    return { ...identity, ...overview };
  });

  selectCustomer(id: string) {
    this.selectedCustomerId.set(id);
      this.cancelNote();
  }
}