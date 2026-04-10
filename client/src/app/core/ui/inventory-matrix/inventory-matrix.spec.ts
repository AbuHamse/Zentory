import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMatrix } from './inventory-matrix';

describe('InventoryMatrix', () => {
  let component: InventoryMatrix;
  let fixture: ComponentFixture<InventoryMatrix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryMatrix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryMatrix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
