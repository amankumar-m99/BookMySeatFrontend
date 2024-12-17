import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTheatresComponent } from './all-theatres.component';

describe('AllTheatresComponent', () => {
  let component: AllTheatresComponent;
  let fixture: ComponentFixture<AllTheatresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTheatresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
