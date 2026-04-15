import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMap } from './zone-map';

describe('ZoneMap', () => {
  let component: ZoneMap;
  let fixture: ComponentFixture<ZoneMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
