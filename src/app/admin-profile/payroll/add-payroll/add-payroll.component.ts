import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toArray } from 'rxjs/operators';

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

  userNic: string;

  constructor(
    private payrollService: PayrollService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userNic = this.addPayroll.value.nic;
    this.payroll.baseSalary = this.addPayroll.value.baseSalary;
    this.payroll.maxLeaves = this.addPayroll.value.maxLeaves;
    this.payroll.payForOTHour = this.addPayroll.value.payForOTHour;
    this.payroll.penaltyForLeaves = this.addPayroll.value.penaltyForLeaves;

    if (
      !this.userNic ||
      !this.payroll.baseSalary ||
      !this.payroll.maxLeaves ||
      !this.payroll.payForOTHour ||
      !this.payroll.penaltyForLeaves
    ) {
      return this.toastr.error('Please fill the form');
    }

    this.payrollService.addPayroll(this.payroll, this.userNic).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`Payroll Added for ${this.userNic}`);
        this.router.navigate(['admin/payroll']);
      },
      (err) => {
        console.log(err);
        this.toastr.error(`${err.error}`);
      }
    );
  }

  demo() {
    let nicList: string[];
    let salaryList: number[] = [];
    let leavesList: number[] = [];
    let otPayList: number[] = [];
    let penaltyList: number[] = [];
    // let i;

    nicList = [
      '971361913V',
      '873456345V',
      '862324444V',
      '701232485V',
      '983456789V',
      '981457557V',
      '993056235V',
      '981441524V',
      '997160797V',
      '972141844V',
    ];

    for (let i = 0; i < 10; i++) {
      leavesList[i] = Math.floor(Math.random() * 10) + 1;
    }

    for (let i = 0; i < 10; i++) {
      salaryList[i] = Math.floor(Math.random() * 100000) + 1;
    }

    for (let i = 0; i < 10; i++) {
      otPayList[i] = Math.floor(Math.random() * 1000) + 1;
    }

    for (let i = 0; i < 10; i++) {
      penaltyList[i] = Math.floor(Math.random() * 1000) + 1;
    }

    let random = Math.floor(Math.random() * 10);

    this.userNic = nicList[random];
    this.payroll.baseSalary = salaryList[random];
    this.payroll.maxLeaves = leavesList[random];
    this.payroll.payForOTHour = otPayList[random];
    this.payroll.penaltyForLeaves = penaltyList[random];
  }
}
