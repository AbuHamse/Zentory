import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportArchitect } from './report-architect';

describe('ReportArchitect', () => {
  let component: ReportArchitect;
  let fixture: ComponentFixture<ReportArchitect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportArchitect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportArchitect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
