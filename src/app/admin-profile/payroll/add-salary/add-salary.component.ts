import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Payroll } from '../../../_models/payroll.model';
import { SalaryService } from '../../../_services/salary.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.css'],
})
export class AddSalaryComponent implements OnInit {
  @ViewChild('addSal', { static: false }) addSalary: NgForm;

  payroll: Payroll;

  // salary: Salary = {
  //   _id: '',
  //   amount: null,
  //   date: null,
  //   month: null,
  //   employee: '',
  //   amountOfLeaves: null,
  //   otHours: null,
  //   otPay: null,
  //   penaltyForLeaves: null,
  // }

  salary: any = {
    date: null,
    otStart: null,
  };

  nic: string;

  constructor(
    private salaryService: SalaryService,
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
    this.nic = this.addSalary.value.nic;
    this.salary.date = this.addSalary.value.date;
    this.salary.otStart = this.addSalary.value.otStart;

    console.log(this.salary.employee);

    this.salaryService.addSalary(this.salary, this.nic).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(`Salary Added for ${this.nic}`);
        this.router.navigate(['admin/payroll']);
      },
      (err) => {
        console.log(err);
        this.toastr.error(`${err.error}`);
      }
    );
  }
}
