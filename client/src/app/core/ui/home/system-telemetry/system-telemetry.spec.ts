import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTelemetry } from './system-telemetry';

describe('SystemTelemetry', () => {
  let component: SystemTelemetry;
  let fixture: ComponentFixture<SystemTelemetry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemTelemetry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemTelemetry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
