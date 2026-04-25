import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceArchive } from './resource-archive';

describe('ResourceArchive', () => {
  let component: ResourceArchive;
  let fixture: ComponentFixture<ResourceArchive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceArchive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceArchive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
