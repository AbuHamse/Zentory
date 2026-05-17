import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingModal } from './shipping-modal';

describe('ShippingModal', () => {
  let component: ShippingModal;
  let fixture: ComponentFixture<ShippingModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
