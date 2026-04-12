import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingStation } from './packing-station';

describe('PackingStation', () => {
  let component: PackingStation;
  let fixture: ComponentFixture<PackingStation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingStation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackingStation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
