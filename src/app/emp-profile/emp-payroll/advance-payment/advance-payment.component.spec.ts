import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentComponent } from './advance-payment.component';

describe('AdvancePaymentComponent', () => {
  let component: AdvancePaymentComponent;
  let fixture: ComponentFixture<AdvancePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
