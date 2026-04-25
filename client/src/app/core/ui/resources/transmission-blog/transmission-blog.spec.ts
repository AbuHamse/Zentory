import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionBlog } from './transmission-blog';

describe('TransmissionBlog', () => {
  let component: TransmissionBlog;
  let fixture: ComponentFixture<TransmissionBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransmissionBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmissionBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
