import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Payroll } from '../../../_models/payroll.model';
import { PayrollService } from '../../../_services/payroll.service';
import { ConfirmService } from '../../../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.css'],
})
export class PayrollListComponent implements OnInit {
  @Output() deletePayroll: EventEmitter<Payroll> = new EventEmitter();

  payrolls: Payroll[];
  loading: boolean;
  searchText: string;

  constructor(
    private payrollService: PayrollService,
    private toastr: ToastrService,
    private confirmService: ConfirmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPayroll();
  }

  getPayroll() {
    this.loading = true;
    this.payrollService.getPayroll().subscribe((payrolls) => {
      this.payrolls = payrolls;
      this.loading = false;
    });
  }

  onDelete(payroll: Payroll) {
    this.confirmService
      .confirm(
        `Are you sure to delete this ${payroll._id}? this cannot be undone`
      )
      .then(
        (confirm) => {
          this.payrolls = this.payrolls.filter((pay) => pay._id != payroll._id);
          this.payrollService.deletePayroll(payroll).subscribe();
          this.toastr.success(
            `Payroll for ${payroll?.employee?.fullName} removed`
          );
        },
        (reject) => {}
      );
  }

  onUpdate(payroll: Payroll) {
    this.router.navigate(['admin/payroll/updatePayroll'], {
      state: { pay: payroll },
    });
  }

  onViewSalary(payroll: Payroll) {
    this.router.navigate(['admin/salaryList'], {
      state: { pay: payroll },
    });
  }
}
