import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionLogicVisual } from './decision-logic-visual';

describe('DecisionLogicVisual', () => {
  let component: DecisionLogicVisual;
  let fixture: ComponentFixture<DecisionLogicVisual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecisionLogicVisual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionLogicVisual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
