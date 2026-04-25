import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLedger } from './company-ledger';

describe('CompanyLedger', () => {
  let component: CompanyLedger;
  let fixture: ComponentFixture<CompanyLedger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLedger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyLedger);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
