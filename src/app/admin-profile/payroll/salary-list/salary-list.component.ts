import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payroll } from '../../../_models/payroll.model';
import { Salary } from '../../../_models/salary.model';
import { ConfirmService } from '../../../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '../../../_services/salary.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

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
    private datePipe: DatePipe,
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


  report() {
    let netAmount = 0;
    let data = this.salaries.map((item) => {
      netAmount += item.amount;
      return [
        this.datePipe.transform(item.date, 'yyyy-MM-dd') || '-',
        item.amountOfLeaves,
        item.penaltyForLeaves,
        item.otHours,
        item.otPay,
        item.amount,
        netAmount,
      ];
    });
    let doc = new jsPDF('l', 'mm', [305, 250]);
    doc.text('UK Engineering Services (PVT) Ltd', 35, 10);
    doc.text(
      `Salary Report of ${this.payroll?.employee?.fullName} ${this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm'
      )}`,
      35,
      20
    );

    let img = new Image();
    img.src = 'assets/images/logo.png';
    doc.addImage(img, 10, 5, 20, 20);

    autoTable(doc, {
      head: [
        [
          'Date',
          'Amount of Leaves',
          'Penalty for Leaves',
          'OT Hours',
          'OT Pay',
          'Amount',
        ],
      ],
      body: data,
      margin: { top: 40 },
    });

    // let finalY = doc.lastAutoTable.finalY;
    // doc.setFontSize(12);
    // doc.text(`Net Amount Paid Rs: ${netAmount}/=`, 10, finalY + 10);

    doc.save(
      `Salary Report - ${this.payroll?.employee?.fullName} - ${this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm'
      )}`
    );
  }

}
