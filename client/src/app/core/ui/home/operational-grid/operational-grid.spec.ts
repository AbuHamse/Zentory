import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalGrid } from './operational-grid';

describe('OperationalGrid', () => {
  let component: OperationalGrid;
  let fixture: ComponentFixture<OperationalGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
