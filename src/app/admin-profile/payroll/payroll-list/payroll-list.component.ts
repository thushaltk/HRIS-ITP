import { Component, OnInit } from '@angular/core';
import { Payroll } from '../../../_models/payroll.model';
import { PayrollService } from '../../../_services/payroll.service';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.css'],
})
export class PayrollListComponent implements OnInit {
  payrolls: Payroll[];

  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.getPayroll();
  }

  getPayroll() {
    this.payrollService.getPayroll().subscribe((payrolls) => {
      this.payrolls = payrolls;
    });
  }
}
