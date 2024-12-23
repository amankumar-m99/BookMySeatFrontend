import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMarketplaceComponent } from './movie-marketplace.component';

describe('MovieMarketplaceComponent', () => {
  let component: MovieMarketplaceComponent;
  let fixture: ComponentFixture<MovieMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
