import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialWorkstation } from './financial-workstation';

describe('FinancialWorkstation', () => {
  let component: FinancialWorkstation;
  let fixture: ComponentFixture<FinancialWorkstation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialWorkstation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialWorkstation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
