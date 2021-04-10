import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalControlComponent } from './rental-control.component';

describe('RentalControlComponent', () => {
  let component: RentalControlComponent;
  let fixture: ComponentFixture<RentalControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
