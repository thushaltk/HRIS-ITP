import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvancePaymentComponent } from './admin-advance-payment.component';

describe('AdminAdvancePaymentComponent', () => {
  let component: AdminAdvancePaymentComponent;
  let fixture: ComponentFixture<AdminAdvancePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdvancePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
