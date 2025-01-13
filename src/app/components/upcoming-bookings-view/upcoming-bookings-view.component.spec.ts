import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingBookingsViewComponent } from './upcoming-bookings-view.component';

describe('UpcomingBookingsViewComponent', () => {
  let component: UpcomingBookingsViewComponent;
  let fixture: ComponentFixture<UpcomingBookingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingBookingsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingBookingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
