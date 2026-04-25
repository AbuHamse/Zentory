import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTerminal } from './contact-terminal';

describe('ContactTerminal', () => {
  let component: ContactTerminal;
  let fixture: ComponentFixture<ContactTerminal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTerminal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTerminal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
