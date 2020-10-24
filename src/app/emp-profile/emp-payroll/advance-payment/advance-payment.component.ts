import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '../../../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { AdvancePayment } from '../../../_models/advancePayment.model';
import { AdvancePaymentService } from '../../../_services/advance-payment.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.css'],
})
export class AdvancePaymentComponent implements OnInit {
  adPayments: AdvancePayment[];
  loading: boolean;
  nic: string;

  constructor(
    private authSerice: AuthService,
    private advancePaymentService: AdvancePaymentService,
    private toastr: ToastrService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.getAdPays();
  }

  getAdPays() {
    this.loading = true;
    this.nic = this.authSerice.getNic();
    this.advancePaymentService.getAdPays(this.nic).subscribe((addPay) => {
      this.adPayments = addPay;
      this.loading = false;
    });
  }

  onDelete(adPay: AdvancePayment) {
    this.confirmService
      .confirm(`Are you sure to delete this request? this cannot be undone`)
      .then(
        (confirm) => {
          this.adPayments = this.adPayments.filter(
            (adPays) => adPays._id != adPay._id
          );
          this.advancePaymentService.deleteAdPay(adPay).subscribe();
          this.toastr.success(`Advance Payment Request removed`);
        },
        (reject) => {}
      );
  }
}
