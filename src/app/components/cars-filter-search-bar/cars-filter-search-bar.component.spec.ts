import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsFilterSearchBarComponent } from './cars-filter-search-bar.component';

describe('CarsFilterSearchBarComponent', () => {
  let component: CarsFilterSearchBarComponent;
  let fixture: ComponentFixture<CarsFilterSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsFilterSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsFilterSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
