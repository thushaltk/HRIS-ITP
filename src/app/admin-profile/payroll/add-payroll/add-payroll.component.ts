import { Component, OnInit } from '@angular/core';
import { Payroll } from '../../../_models/payroll.model';
import { PayrollService } from '../../../_services/payroll.service';
@Component({
  selector: 'app-add-payroll',
  templateUrl: './add-payroll.component.html',
  styleUrls: ['./add-payroll.component.css'],
})
export class AddPayrollComponent implements OnInit {
  payroll: Payroll;
  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {}

  onSubmit() {}
}
