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
          //Change the date format from "2020-10-24" to "2020/10/24"
          this.newDate = att.date.split("-")[0] + "/" + att.date.split("-")[1] + "/" + att.date.split("-")[2]
          //assigns the "newDate" to the attendance object's date
          att.date = this.newDate;
          //Get time as string value and assigns to "arriveTime"
          this.arriveTime = new Date(att.arriveTime).getUTCHours().toString() + ":" + new Date(att.arriveTime).getUTCMinutes().toString();
          //Get time as string value and assigns to "leaveTime"
          this.leaveTime = new Date(att.leaveTime).getUTCHours().toString() + ":" + new Date(att.arriveTime).getUTCMinutes().toString();
          //Assigns the new "arriveTime" to attendance object's arrive time
          att.arriveTime = this.arriveTime
          //Assigns the new "leaveTime" to attendance object's leave time
          att.leaveTime = this.leaveTime
        }



      }
    );
  }

  //generate repoat
  generateReport() {
    setTimeout(() => {
      html2canvas(document.getElementById("tbl")).then(function (canvas) {
        var img = canvas.toDataURL("image/png");
        var doc = new jsPDF.jsPDF();
        let image = new Image(); //create the object to insert  logo
        image.src = 'assets/images/logo.png';
        var imgHeight = canvas.height * 210 / canvas.width;
        doc.text("Attendance Report", 55, 15);
        doc.addImage(image, 10, 5, 40, 20);
        doc.addImage(img, 0, 30, 210, imgHeight);
        doc.save('attendance-report.pdf'); // save & download the report
      });
    }, 1500)
  }

}
