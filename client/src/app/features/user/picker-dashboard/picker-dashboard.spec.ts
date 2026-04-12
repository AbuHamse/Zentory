import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerDashboard } from './picker-dashboard';

describe('PickerDashboard', () => {
  let component: PickerDashboard;
  let fixture: ComponentFixture<PickerDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickerDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickerDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
