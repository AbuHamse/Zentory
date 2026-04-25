import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPulse } from './hero-pulse';

describe('HeroPulse', () => {
  let component: HeroPulse;
  let fixture: ComponentFixture<HeroPulse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPulse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroPulse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
