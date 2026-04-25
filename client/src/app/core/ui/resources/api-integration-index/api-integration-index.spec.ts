import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiIntegrationIndex } from './api-integration-index';

describe('ApiIntegrationIndex', () => {
  let component: ApiIntegrationIndex;
  let fixture: ComponentFixture<ApiIntegrationIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiIntegrationIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiIntegrationIndex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
