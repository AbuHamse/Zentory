import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockOutbound } from './dock-outbound';

describe('DockOutbound', () => {
  let component: DockOutbound;
  let fixture: ComponentFixture<DockOutbound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockOutbound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockOutbound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
