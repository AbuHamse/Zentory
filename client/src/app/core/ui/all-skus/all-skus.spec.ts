import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSkus } from './all-skus';

describe('AllSkus', () => {
  let component: AllSkus;
  let fixture: ComponentFixture<AllSkus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSkus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSkus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
