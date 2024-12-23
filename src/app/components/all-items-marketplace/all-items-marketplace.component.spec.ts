import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItemsMarketplaceComponent } from './all-items-marketplace.component';

describe('AllItemsMarketplaceComponent', () => {
  let component: AllItemsMarketplaceComponent;
  let fixture: ComponentFixture<AllItemsMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllItemsMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllItemsMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
