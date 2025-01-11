import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminMoviesComponent } from './super-admin-movies.component';

describe('SuperAdminMoviesComponent', () => {
  let component: SuperAdminMoviesComponent;
  let fixture: ComponentFixture<SuperAdminMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminMoviesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
