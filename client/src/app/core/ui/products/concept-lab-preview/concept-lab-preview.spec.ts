import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptLabPreview } from './concept-lab-preview';

describe('ConceptLabPreview', () => {
  let component: ConceptLabPreview;
  let fixture: ComponentFixture<ConceptLabPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConceptLabPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptLabPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
