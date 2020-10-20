import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Payroll } from '../../../_models/payroll.model';
import { Salary } from '../../../_models/salary.model';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.css']
})
export class AddSalaryComponent implements OnInit {
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

  // payroll: Payroll;
  salaries : Salary[];

  constructor(
    // private payrollService: PayrollService,
    private router: Router,
    // private toastr: ToastrService
  ) 
  {
    if (!this.router.getCurrentNavigation().extras.state) {
      this.router.navigate(['../admin/payroll']);
    } else {
      this.payroll = this.router.getCurrentNavigation().extras.state.pay;
      this.salaries = this.payroll.paymentHistory;
    }
  }


  ngOnInit(): void {
  }

  onSubmit(){}

}
