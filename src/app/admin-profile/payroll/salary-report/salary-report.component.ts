import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payroll } from '../../../_models/payroll.model';
import { Salary } from '../../../_models/salary.model';
import { ConfirmService } from '../../../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '../../../_services/salary.service';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css'],
})
export class SalaryReportComponent implements OnInit {
  salaries: Salary[];
  loading: boolean;

  constructor(
    private router: Router,
    private salaryService: SalaryService,
    private confirmService: ConfirmService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSalary();
  }

  getSalary() {
    this.loading = true;
    this.salaryService.getAllSalary().subscribe((salaries) => {
      this.salaries = salaries;
      this.loading = false;
    });
  }
}
