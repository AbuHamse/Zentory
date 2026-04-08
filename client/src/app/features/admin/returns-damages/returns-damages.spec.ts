import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsDamages } from './returns-damages';

describe('ReturnsDamages', () => {
  let component: ReturnsDamages;
  let fixture: ComponentFixture<ReturnsDamages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnsDamages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnsDamages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
