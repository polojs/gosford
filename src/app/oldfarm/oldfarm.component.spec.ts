import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldfarmComponent } from './oldfarm.component';

describe('OldfarmComponent', () => {
  let component: OldfarmComponent;
  let fixture: ComponentFixture<OldfarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldfarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldfarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
