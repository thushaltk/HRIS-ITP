import { Component, OnInit } from '@angular/core';
import { Attendance } from 'models/attendance.model';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'service/attendance.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {
  attendanceDetails: Attendance[] = [];
  newDate: string;
  arriveTime: string;
  num: number;
  leaveTime: string;
  subscription: Subscription;

  constructor(private attendanceService: AttendanceService) {
   }

  ngOnInit(): void {
    this.attendanceDetails = this.attendanceService.getAttendance();
    this.subscription = this.attendanceService.attendanceChanged.subscribe(
      (attendances: Attendance[]) => {
        this.attendanceDetails = attendances;
        for (let att of this.attendanceDetails) {
          this.newDate = att.date.split("-")[0] + "/" + att.date.split("-")[1] + "/" + att.date.split("-")[2]
          att.date = this.newDate;
          this.arriveTime = new Date(att.arriveTime).getUTCHours().toString() + ":" + new Date(att.arriveTime).getUTCMinutes().toString();
          this.leaveTime = new Date(att.leaveTime).getUTCHours().toString() + ":" + new Date(att.arriveTime).getUTCMinutes().toString();
          att.arriveTime = this.arriveTime
          att.leaveTime = this.leaveTime
        }



      }
    );
  }

  generateReport() {
    setTimeout(() => {
      html2canvas(document.getElementById("tbl")).then(function (canvas) {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF.jsPDF();
        var imgHeight = canvas.height * 210 / canvas.width;
        doc.text("Attendance Report", 15, 15);
        doc.addImage(img, 0, 20, 210, imgHeight);
        doc.save('testCanvas.pdf');
      });
    }, 1500)
  }

}
