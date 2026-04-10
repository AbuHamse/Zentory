import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInsights } from './service-insights';

describe('ServiceInsights', () => {
  let component: ServiceInsights;
  let fixture: ComponentFixture<ServiceInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
