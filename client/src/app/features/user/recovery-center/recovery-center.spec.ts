import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryCenter } from './recovery-center';

describe('RecoveryCenter', () => {
  let component: RecoveryCenter;
  let fixture: ComponentFixture<RecoveryCenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryCenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryCenter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
