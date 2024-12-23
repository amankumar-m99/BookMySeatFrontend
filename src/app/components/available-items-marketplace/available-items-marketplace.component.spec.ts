import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableItemsMarketplaceComponent } from './available-items-marketplace.component';

describe('AvailableItemsMarketplaceComponent', () => {
  let component: AvailableItemsMarketplaceComponent;
  let fixture: ComponentFixture<AvailableItemsMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableItemsMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableItemsMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
