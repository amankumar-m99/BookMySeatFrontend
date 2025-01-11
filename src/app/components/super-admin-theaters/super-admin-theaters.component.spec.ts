import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminTheatersComponent } from './super-admin-theaters.component';

describe('SuperAdminTheatersComponent', () => {
  let component: SuperAdminTheatersComponent;
  let fixture: ComponentFixture<SuperAdminTheatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminTheatersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminTheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
