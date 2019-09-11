import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVideoModalComponent } from './mobile-video-modal.component';

describe('MobileVideoModalComponent', () => {
  let component: MobileVideoModalComponent;
  let fixture: ComponentFixture<MobileVideoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileVideoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
