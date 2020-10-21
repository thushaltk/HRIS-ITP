import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvancePaymentComponent } from './add-advance-payment.component';

describe('AddAdvancePaymentComponent', () => {
  let component: AddAdvancePaymentComponent;
  let fixture: ComponentFixture<AddAdvancePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdvancePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
