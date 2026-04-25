import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingQueue } from './loading-queue';

describe('LoadingQueue', () => {
  let component: LoadingQueue;
  let fixture: ComponentFixture<LoadingQueue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingQueue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingQueue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
