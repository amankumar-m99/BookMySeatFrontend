import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterActionsComponent } from './theater-actions.component';

describe('TheaterActionsComponent', () => {
  let component: TheaterActionsComponent;
  let fixture: ComponentFixture<TheaterActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaterActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
