import { Component, OnInit } from '@angular/core';
import { Attendance } from 'models/attendance.model';
import { LongLeave } from 'models/longLeave.model';
import { QuickLeave } from 'models/quickLeave.model';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'service/attendance.service';
import { LongLeavesService } from 'service/longLeaves.service';
import { QuickLeavesService } from 'service/quickLeaves.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceDetails : Attendance[] = [];
  longLeaveDetails: LongLeave[] = [];
  private subscription: Subscription;


  constructor(private attendanceService: AttendanceService,
              private longLeaveService: LongLeavesService) { }

  ngOnInit(): void {
    this.attendanceDetails = this.attendanceService.getAttendance();
    this.subscription = this.attendanceService.attendanceChanged.subscribe(
      (attendance: Attendance[]) => {
        this.attendanceDetails = attendance;
      }
    );

    this.longLeaveDetails = this.longLeaveService.getLongLeave();
    this.subscription = this.longLeaveService.longLeavesChanged.subscribe(
      (longLeave: LongLeave[]) => {
        this.longLeaveDetails = longLeave;
      }
    );
  }

  onDelete(id: string){

  }

}
