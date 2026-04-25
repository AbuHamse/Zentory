import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// SUB-COMPONENTS
import { TierSelectorComponent } from '../../core/ui/products/tier-selector/tier-selector.component';
import { StandardSpecSheetComponent } from '../../core/ui/products/standard-spec-sheet/standard-spec-sheet.component';
import { PremiumTurboModuleComponent } from '../../core/ui/products/premium-turbo-module/premium-turbo-module.component';
import { ConceptLabPreviewComponent } from '../../core/ui/products/concept-lab-preview/concept-lab-preview.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    TierSelectorComponent,
    StandardSpecSheetComponent,
    PremiumTurboModuleComponent,
    ConceptLabPreviewComponent
  ],
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  selectedTier: 'STANDARD' | 'PREMIUM' = 'STANDARD';

  handleTierChange(tier: any) {
    this.selectedTier = tier;
  }
}