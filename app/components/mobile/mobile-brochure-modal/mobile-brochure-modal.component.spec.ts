import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBrochureModalComponent } from './mobile-brochure-modal.component';

describe('MobileBrochureModalComponent', () => {
  let component: MobileBrochureModalComponent;
  let fixture: ComponentFixture<MobileBrochureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBrochureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBrochureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
