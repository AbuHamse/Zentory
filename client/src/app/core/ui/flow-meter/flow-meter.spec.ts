import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowMeter } from './flow-meter';

describe('FlowMeter', () => {
  let component: FlowMeter;
  let fixture: ComponentFixture<FlowMeter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowMeter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowMeter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
