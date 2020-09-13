import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(
    private payrollService: PayrollService,
    private toastr: ToastrService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.getPayroll();
  }

  getPayroll() {
    this.payrollService.getPayroll().subscribe((payrolls) => {
      this.payrolls = payrolls;
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
}
