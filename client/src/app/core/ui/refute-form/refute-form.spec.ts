import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuteForm } from './refute-form';

describe('RefuteForm', () => {
  let component: RefuteForm;
  let fixture: ComponentFixture<RefuteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefuteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefuteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
