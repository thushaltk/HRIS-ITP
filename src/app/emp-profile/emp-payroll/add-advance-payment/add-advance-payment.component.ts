import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdvancePaymentService } from '../../../_services/advance-payment.service';
import { AdvancePayment } from '../../../_models/advancePayment.model';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-add-advance-payment',
  templateUrl: './add-advance-payment.component.html',
  styleUrls: ['./add-advance-payment.component.css'],
})
export class AddAdvancePaymentComponent implements OnInit {
  @ViewChild('addAddPay', { static: false }) addAdvancePayment: NgForm;

  advancePayment: AdvancePayment = {
    _id: '',
    employee: '',
    requestingDate: null,
    amount: null,
    reason: null,
    status: null,
  };
  nic: string;

  constructor(
    private authService: AuthService,
    private advancePaymentService: AdvancePaymentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.nic = this.authService.getNic();
  }

  onSubmit() {
    this.advancePayment.requestingDate = this.addAdvancePayment.value.requestingDate;
    this.advancePayment.amount = this.addAdvancePayment.value.amount;
    this.advancePayment.reason = this.addAdvancePayment.value.reason;

    if (
      !this.advancePayment.requestingDate ||
      !this.advancePayment.amount ||
      !this.advancePayment.reason
    ) {
      return this.toastr.error('Fill the form');
    }

    this.advancePaymentService
      .addAdPay(this.advancePayment, this.nic)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success(`Advance Payment Requested! Wait for Approval.`);
          this.router.navigate(['empProfile/payroll/advancePayment']);
        },
        (err) => {
          console.log(err);
          this.toastr.error(`${err.error}`);
        }
      );
  }
}
