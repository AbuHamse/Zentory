import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofOfLogic } from './proof-of-logic';

describe('ProofOfLogic', () => {
  let component: ProofOfLogic;
  let fixture: ComponentFixture<ProofOfLogic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProofOfLogic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofOfLogic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
