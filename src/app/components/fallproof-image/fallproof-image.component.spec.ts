import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallproofImageComponent } from './fallproof-image.component';

describe('FallproofImageComponent', () => {
  let component: FallproofImageComponent;
  let fixture: ComponentFixture<FallproofImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallproofImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FallproofImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
