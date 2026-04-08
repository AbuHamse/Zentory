import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Layout & Navigation
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

// Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

// Data Display (The Green Blocks in your wireframe)
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

// Forms (For later Asset/Inventory entry)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MaterialComponents = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  imports: [CommonModule, ...MaterialComponents],
  exports: [...MaterialComponents] // Exporting is key so components can use them
})
export class MaterialModule { }
