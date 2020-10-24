import { Component, OnInit } from '@angular/core';
import { Salary } from '../../_models/salary.model';
import { SalaryService } from '../../_services/salary.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-emp-payroll',
  templateUrl: './emp-payroll.component.html',
  styleUrls: ['./emp-payroll.component.css'],
})
export class EmpPayrollComponent implements OnInit {
  salaries: Salary[];
  nic: string;
  loading: boolean;
  searchText: string;

  constructor(
    private authService: AuthService,
    private salaryService: SalaryService
  ) {}

  ngOnInit(): void {
    this.nic = this.authService.getNic();
    this.getSalary();
  }

  getSalary() {
    this.loading = true;
    console.log(this.nic);

    this.salaryService.getSalary(this.nic).subscribe((salaries) => {
      this.salaries = salaries;
      this.loading = false;
    });
  }
}
