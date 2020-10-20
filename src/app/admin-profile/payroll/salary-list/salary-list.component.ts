import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payroll } from '../../../_models/payroll.model';
import { Salary } from '../../../_models/salary.model';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {

  payroll: Payroll;
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

  addSalary(payroll:Payroll){
    this.router.navigate(['admin/salaryList/addSalary'], {
      state: { pay: payroll },
    });
  }

}
