import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityWorkstation } from './quality-workstation';

describe('QualityWorkstation', () => {
  let component: QualityWorkstation;
  let fixture: ComponentFixture<QualityWorkstation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityWorkstation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityWorkstation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
