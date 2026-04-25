import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedInsightsFeed } from './automated-insights-feed';

describe('AutomatedInsightsFeed', () => {
  let component: AutomatedInsightsFeed;
  let fixture: ComponentFixture<AutomatedInsightsFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomatedInsightsFeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomatedInsightsFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
