import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPerformance } from './my-performance';

describe('MyPerformance', () => {
  let component: MyPerformance;
  let fixture: ComponentFixture<MyPerformance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPerformance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPerformance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
