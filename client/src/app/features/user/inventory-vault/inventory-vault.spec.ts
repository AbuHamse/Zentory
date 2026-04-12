import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryVault } from './inventory-vault';

describe('InventoryVault', () => {
  let component: InventoryVault;
  let fixture: ComponentFixture<InventoryVault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryVault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryVault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
