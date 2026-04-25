import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSpecSheet } from './standard-spec-sheet';

describe('StandardSpecSheet', () => {
  let component: StandardSpecSheet;
  let fixture: ComponentFixture<StandardSpecSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardSpecSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardSpecSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
