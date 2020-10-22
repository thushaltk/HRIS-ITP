import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Salary } from '../../../_models/salary.model';
import { ConfirmService } from '../../../shared/confirm.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '../../../_services/salary.service';

@Component({
  selector: 'app-salary-report',
  templateUrl: './salary-report.component.html',
  styleUrls: ['./salary-report.component.css'],
})
export class SalaryReportComponent implements OnInit {
  @ViewChild('getMonth', { static: false }) salMonth: NgForm;

  salaries: Salary[];
  filterSalaries: Salary[];
  loading: boolean;
  month: Date;

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
      this.filterSalaries = salaries;
      this.loading = false;
    });
  }

  onSubmit() {
    this.salaries = this.filterSalaries.filter(
      (salary) => salary.month == this.salMonth.value.salaryMonth.split('-')[1]
    );
  }
}
