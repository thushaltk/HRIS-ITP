import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Payroll } from '../../../_models/payroll.model';
import { PayrollService } from '../../../_services/payroll.service';
@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.component.html',
  styleUrls: ['./add-payroll.component.css'],
})
export class AddPayrollComponent implements OnInit {
  @ViewChild('addPay', { static: false }) addPayroll: NgForm;

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
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.nic = this.addPayroll.value.nic;
    this.payroll.baseSalary = this.addPayroll.value.baseSalary;
    this.payroll.maxLeaves = this.addPayroll.value.maxLeaves;
    this.payroll.payForOTHour = this.addPayroll.value.payForOTHour;
    this.payroll.penaltyForLeaves = this.addPayroll.value.penaltyForLeaves;

    this.payrollService.addPayroll(this.payroll, this.nic).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`Payroll Added for ${this.nic}`);
        this.router.navigate(['admin/payroll']);
      },
      (err) => {
        console.log(err);
        this.toastr.error(`${err.error}`);
      }
    );
  }
}
