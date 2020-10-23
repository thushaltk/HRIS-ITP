import { Component, OnInit, ViewChild } from '@angular/core';
import { Salary } from '../../../_models/salary.model';
import { NgForm } from '@angular/forms';
import { SalaryService } from '../../../_services/salary.service';
import { DatePipe } from '@angular/common';
// declare let jsPDF;
// import * as jsPDF from 'jspdf';
// import * as autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  searchText: string;

  constructor(
    private salaryService: SalaryService,
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
    let doc = new jsPDF('l', 'mm', [305, 250]);
    doc.text('UK Engineering Services (PVT) Ltd', 35, 10);
    doc.text(
      `Salary Report ${this.datePipe.transform(
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

    // let finalY = doc.lastAutoTable.finalY;
    // doc.setFontSize(12);
    // doc.text(`Net Amount Paid Rs: ${netAmount}/=`, 10, finalY + 10);

    doc.save(
      `Salary Report - ${this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm'
      )}`
    );
  }
}
