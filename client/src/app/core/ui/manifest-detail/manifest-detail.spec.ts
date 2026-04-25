import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestDetail } from './manifest-detail';

describe('ManifestDetail', () => {
  let component: ManifestDetail;
  let fixture: ComponentFixture<ManifestDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
