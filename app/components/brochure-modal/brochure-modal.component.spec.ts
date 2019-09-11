import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrochureModalComponent } from './brochure-modal.component';

describe('BrochureModalComponent', () => {
  let component: BrochureModalComponent;
  let fixture: ComponentFixture<BrochureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrochureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrochureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
