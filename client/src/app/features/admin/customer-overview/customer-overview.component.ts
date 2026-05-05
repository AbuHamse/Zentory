import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../shared/material.module';

// 1. IMPORT THE INTERFACES
import { Customer, CustomerOverview } from '../../../shared/models/customer.model';

@Component({
  selector: 'app-customer-overview',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.css']
})
export class CustomerOverviewComponent implements OnInit {
  private http = inject(HttpClient);

  // Initialize signals with empty arrays
  private customers = signal<Customer[]>([]);
  private overviews = signal<CustomerOverview[]>([]);

  // State for the Notes UI
  protected isAddingNote = signal(false);
  protected editingNoteIndex = signal<number | null>(null);
  protected noteInput = signal('');

  protected searchQuery = signal('');
  protected selectedCustomerId = signal<string | null>(null);

  ngOnInit(): void {
    // Fetch both datasets from the new public/data path
    this.http.get<Customer[]>('/data/customers.json').subscribe({
      next: (data) => this.customers.set(data),
      error: (err) => console.error('Failed to load customers:', err)
    });

    this.http.get<CustomerOverview[]>('/data/customeroverviews.json').subscribe({
      next: (data) => this.overviews.set(data),
      error: (err) => console.error('Failed to load customer overviews:', err)
    });
  }

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
    
    if (!profile || !text) return;
    
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

    return { ...identity, ...overview };
  });

  selectCustomer(id: string) {
    this.selectedCustomerId.set(id);
    this.cancelNote();
  }
}