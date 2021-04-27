import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobilComponent } from './automobil.component';

describe('AutomobilComponent', () => {
  let component: AutomobilComponent;
  let fixture: ComponentFixture<AutomobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomobilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
