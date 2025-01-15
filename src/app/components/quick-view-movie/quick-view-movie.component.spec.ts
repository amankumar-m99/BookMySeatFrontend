import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewMovieComponent } from './quick-view-movie.component';

describe('QuickViewMovieComponent', () => {
  let component: QuickViewMovieComponent;
  let fixture: ComponentFixture<QuickViewMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickViewMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickViewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
