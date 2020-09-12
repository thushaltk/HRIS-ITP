import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.nic = this.addPayroll.value.nic;
    console.log(`Hello${this.addPayroll.value.baseSalary}`);

    this.payroll.baseSalary = this.addPayroll.value.baseSalary;
    this.payroll.maxLeaves = this.addPayroll.value.maxLeaves;
    this.payroll.payForOTHour = this.addPayroll.value.payForOTHour;
    this.payroll.penaltyForLeaves = this.addPayroll.value.penaltyForLeaves;
    console.log(this.payroll);

    this.payrollService.addPayroll(this.payroll, this.nic).subscribe();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
