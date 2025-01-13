import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingsViewComponent } from './all-bookings-view.component';

describe('AllBookingsViewComponent', () => {
  let component: AllBookingsViewComponent;
  let fixture: ComponentFixture<AllBookingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBookingsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBookingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
