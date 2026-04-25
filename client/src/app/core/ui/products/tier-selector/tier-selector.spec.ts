import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierSelector } from './tier-selector';

describe('TierSelector', () => {
  let component: TierSelector;
  let fixture: ComponentFixture<TierSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TierSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TierSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
