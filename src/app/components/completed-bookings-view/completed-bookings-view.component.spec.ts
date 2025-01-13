import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedBookingsViewComponent } from './completed-bookings-view.component';

describe('CompletedBookingsViewComponent', () => {
  let component: CompletedBookingsViewComponent;
  let fixture: ComponentFixture<CompletedBookingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedBookingsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedBookingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
