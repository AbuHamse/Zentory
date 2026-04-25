import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumTurboModule } from './premium-turbo-module';

describe('PremiumTurboModule', () => {
  let component: PremiumTurboModule;
  let fixture: ComponentFixture<PremiumTurboModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumTurboModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumTurboModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
