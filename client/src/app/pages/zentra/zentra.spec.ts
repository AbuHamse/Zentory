import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zentra } from './zentra';

describe('Zentra', () => {
  let component: Zentra;
  let fixture: ComponentFixture<Zentra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zentra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zentra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
