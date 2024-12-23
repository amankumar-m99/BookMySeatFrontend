import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBagMarketplaceComponent } from './my-bag-marketplace.component';

describe('MyBagMarketplaceComponent', () => {
  let component: MyBagMarketplaceComponent;
  let fixture: ComponentFixture<MyBagMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBagMarketplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBagMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
