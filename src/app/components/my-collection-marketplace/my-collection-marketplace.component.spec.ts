import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionMarketplaceComponent } from './my-collection-marketplace.component';

describe('MyCollectionMarketplaceComponent', () => {
  let component: MyCollectionMarketplaceComponent;
  let fixture: ComponentFixture<MyCollectionMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCollectionMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCollectionMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
