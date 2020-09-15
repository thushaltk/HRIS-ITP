import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Payroll } from '../.././../_models/payroll.model';
import { PayrollService } from '../../../_services/payroll.service';

@Component({
  selector: 'app-update-payroll',
  templateUrl: './update-payroll.component.html',
  styleUrls: ['./update-payroll.component.css'],
})
export class UpdatePayrollComponent implements OnInit {
  @ViewChild('addPay', { static: false }) updatePayroll: NgForm;
  payroll: Payroll = {
    _id: '',
    employee: '',
    baseSalary: null,
    maxLeaves: null,
    payForOTHour: null,
    penaltyForLeaves: null,
    paymentHistory: null,
  };

  nic: string;

  constructor(
    private payrollService: PayrollService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (!this.router.getCurrentNavigation().extras.state) {
      this.router.navigate(['../admin/payroll']);
    } else {
      this.payroll = this.router.getCurrentNavigation().extras.state.pay;
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    this.nic = this.updatePayroll.value.nic;
    this.payroll.baseSalary = this.updatePayroll.value.baseSalary;
    this.payroll.maxLeaves = this.updatePayroll.value.maxLeaves;
    this.payroll.payForOTHour = this.updatePayroll.value.payForOTHour;

    this.payrollService.updatePayroll(this.payroll, this.nic).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`Payroll Updated for ${this.nic}`);
        this.router.navigate(['admin/payroll']);
      },
      (err) => {
        console.log(err);
        this.toastr.error(`${err.error}`);
      }
    );
  }
}
