import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingReceiving } from './shipping-receiving';

describe('ShippingReceiving', () => {
  let component: ShippingReceiving;
  let fixture: ComponentFixture<ShippingReceiving>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingReceiving]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingReceiving);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
