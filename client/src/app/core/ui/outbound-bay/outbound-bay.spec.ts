import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundBay } from './outbound-bay';

describe('OutboundBay', () => {
  let component: OutboundBay;
  let fixture: ComponentFixture<OutboundBay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutboundBay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutboundBay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
