import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingDock } from './receiving-dock';

describe('ReceivingDock', () => {
  let component: ReceivingDock;
  let fixture: ComponentFixture<ReceivingDock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivingDock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivingDock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
