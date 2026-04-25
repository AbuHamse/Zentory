import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralInterface } from './neural-interface';

describe('NeuralInterface', () => {
  let component: NeuralInterface;
  let fixture: ComponentFixture<NeuralInterface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeuralInterface]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeuralInterface);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
