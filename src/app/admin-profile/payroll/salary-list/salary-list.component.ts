import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payroll } from '../../../_models/payroll.model';
import { Salary } from '../../../_models/salary.model';
import { ConfirmService } from '../../../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '../../../_services/salary.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css'],
})
export class SalaryListComponent implements OnInit {
  payroll: Payroll;
  salaries: Salary[];
  loading: boolean;
  searchText: string;

  constructor(
    private router: Router,
    private salaryService: SalaryService,
    private confirmService: ConfirmService,
    private toastr: ToastrService
  ) {
    if (!this.router.getCurrentNavigation().extras.state) {
      this.router.navigate(['../admin/payroll']);
    } else {
      this.loading = true;
      this.payroll = this.router.getCurrentNavigation().extras.state.pay;
      this.salaries = this.payroll.paymentHistory;
      this.loading = false;
    }
  }

  ngOnInit(): void {}

  addSalary(payroll: Payroll) {
    this.router.navigate(['admin/salaryList/addSalary'], {
      state: { pay: payroll },
    });
  }

  onDelete(salary: Salary) {
    this.confirmService
      .confirm(
        `Are you sure to delete this ${salary._id}? this cannot be undone`
      )
      .then(
        (confirm) => {
          this.salaries = this.salaries.filter((sal) => sal._id != salary._id);
          this.salaryService.deleteSalary(salary).subscribe();
          this.toastr.success(`Salary for ${salary.date} was removed`);
        },
        (reject) => {}
      );
  }
}
