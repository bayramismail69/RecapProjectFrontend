import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftNavbarComponent } from './admin-left-navbar.component';

describe('AdminLeftNavbarComponent', () => {
  let component: AdminLeftNavbarComponent;
  let fixture: ComponentFixture<AdminLeftNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeftNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeftNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
