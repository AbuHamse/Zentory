import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetModal } from './add-asset-modal';

describe('AddAssetModal', () => {
  let component: AddAssetModal;
  let fixture: ComponentFixture<AddAssetModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssetModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssetModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
