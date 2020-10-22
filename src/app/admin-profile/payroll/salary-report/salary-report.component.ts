import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Salary } from '../../../_models/salary.model';
import { ConfirmService } from '../../../shared/confirm.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalaryService } from '../../../_services/salary.service';
import jsPDF from 'jspdf';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

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
    private toastr: ToastrService,
    private datePipe: DatePipe
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

  report() {
    let netAmount = 0;
    let data = this.salaries.map((item) => {
      netAmount += item.amount;
      return [
        item.employee?.fullName,
        this.datePipe.transform(item.date, 'yyyy-MM-dd') || '-',
        item.amountOfLeaves,
        item.penaltyForLeaves,
        item.otHours,
        item.otPay,
        item.amount,
        netAmount,
      ];
    });
    const doc = new jsPDF();
    doc.text('UK Engineering Services (PVT) Ltd', 10, 10);
    doc.text(
      `Salary Report ${this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm'
      )}`,
      10,
      20
    );

    let img = new Image();
    img.src = 'assets/images/logo.png';
    doc.addImage(img, 150, 0, 20, 20);

    autoTable(doc, {
      head: [
        [
          'Name',
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

    let finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(`Net Amount Paid Rs: ${netAmount}/=`, 10, finalY + 10);

    doc.save(
      `Salary Report - ${this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm'
      )}`
    );
  }
}
