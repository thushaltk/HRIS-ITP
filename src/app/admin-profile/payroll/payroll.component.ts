import { Component, OnInit } from '@angular/core';
// import { Payroll } from '../../_models/payroll.model';
// import { PayrollService } from '../../_services/payroll.service';

// import { ConfirmService } from '../../shared/confirm.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
})
export class PayrollComponent implements OnInit {
  // payrolls: Payroll[];

  constructor() // private payrollService: PayrollService,
  // private toastr: ToastrService,
  // private confirmService: ConfirmService
  {}

  ngOnInit(): void {}

  // deletePayroll(payroll: Payroll) {
  // this.payrolls = this.payrolls.filter((pay) => pay._id != id);
  // this.confirmService
  //   .confirm(
  //     `Are you sure to delete this ${payroll._id}? this cannot be undone`
  //   )
  //   .then(
  //     (confirm) => {
  //       this.payrollService.deletePayroll(payroll).subscribe(
  //         (res) => {
  //           console.log(res);

  //           if (res) {
  //             this.toastr.success(`Payroll, ${payroll._id} removed`);
  //             this.payrolls = this.payrolls.filter(
  //               (pay) => pay._id != payroll._id
  //             ); //remove deleted item
  //           } else {
  //             this.toastr.error('Can not find the Payroll');
  //           }
  //         }
  //         (error) => {
  //           console.log(error);
  //           this.toastr.error(
  //             'Error Ocurred while trying to delete the Payroll'
  //           );
  //         }
  //       );
  //     },
  //     (reject) => {}
  //   );
  // }
}
