import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingShell } from './landing-shell';

describe('LandingShell', () => {
  let component: LandingShell;
  let fixture: ComponentFixture<LandingShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingShell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
