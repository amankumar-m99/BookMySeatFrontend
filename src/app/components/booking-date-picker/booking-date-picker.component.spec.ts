import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDatePickerComponent } from './booking-date-picker.component';

describe('BookingDatePickerComponent', () => {
  let component: BookingDatePickerComponent;
  let fixture: ComponentFixture<BookingDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
