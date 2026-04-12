import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDispatch } from './shipping-dispatch';

describe('ShippingDispatch', () => {
  let component: ShippingDispatch;
  let fixture: ComponentFixture<ShippingDispatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingDispatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingDispatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
