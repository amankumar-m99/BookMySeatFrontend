import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterAdminComponent } from './theater-admin.component';

describe('TheaterAdminComponent', () => {
  let component: TheaterAdminComponent;
  let fixture: ComponentFixture<TheaterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
