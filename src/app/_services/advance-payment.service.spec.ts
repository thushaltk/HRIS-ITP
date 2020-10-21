import { TestBed } from '@angular/core/testing';

import { AdvancePaymentService } from './advance-payment.service';

describe('AdvancePaymentService', () => {
  let service: AdvancePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
