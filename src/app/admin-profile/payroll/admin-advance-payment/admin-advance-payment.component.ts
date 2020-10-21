import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '../../../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdvancePayment } from "../../../_models/advancePayment.model";
import { AdvancePaymentService } from "../../../_services/advance-payment.service";


@Component({
  selector: 'app-admin-advance-payment',
  templateUrl: './admin-advance-payment.component.html',
  styleUrls: ['./admin-advance-payment.component.css']
})
export class AdminAdvancePaymentComponent implements OnInit {

  adPayments : AdvancePayment[];
  loading:boolean;

  constructor(
    private advancePaymentService : AdvancePaymentService,
    private confirmService: ConfirmService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAdPays()
  }

  getAdPays() {
    this.loading = true;
    this.advancePaymentService.getAll().subscribe((addPay) => {
      this.adPayments = addPay;
      this.loading = false;
    });
  }

  onApprove(adPay:AdvancePayment){
    adPay.status = "Approved"
    this.advancePaymentService.updateAdPay(adPay).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`Payment was Approved!`);
      },
      (err) => {
        console.log(err);
        this.toastr.error(`${err.error}`);
      }
    );
  }
  
  onReject(adPay:AdvancePayment){
    adPay.status = "Rejected"
    this.advancePaymentService.updateAdPay(adPay).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`Payment was Rejected!`);
      },
      (err) => {
        console.log(err);
        this.toastr.error(`${err.error}`);
      }
    );
  }

}
