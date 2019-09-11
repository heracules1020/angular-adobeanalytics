import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProductDetailComponent } from './mobile-product-detail.component';

describe('MobileProductDetailComponent', () => {
  let component: MobileProductDetailComponent;
  let fixture: ComponentFixture<MobileProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
