import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class AttendanceComponent implements OnInit, OnDestroy {
  attendanceDetails : Attendance[] = [];
  longLeaveDetails: LongLeave[] = [];
  arriveTime: string;
  leaveTime: string;
  search: string;
  private subscription: Subscription;


  constructor(private attendanceService: AttendanceService,
              private longLeaveService: LongLeavesService) { }

  ngOnInit(): void {
    this.attendanceDetails = this.attendanceService.getAttendance();
    this.subscription = this.attendanceService.attendanceChanged.subscribe(
      (attendance: Attendance[]) => {
        this.attendanceDetails = attendance;
        setTimeout(() => {
          for(let i of this.attendanceDetails){
            this.arriveTime = new Date(i.arriveTime).getUTCHours().toString() + ":" + new Date(i.arriveTime).getUTCMinutes().toString();
            this.leaveTime = new Date(i.leaveTime).getUTCHours().toString() + ":" + new Date(i.arriveTime).getUTCMinutes().toString();
            i.arriveTime = this.arriveTime
            i.leaveTime = this.leaveTime
          }
        },300)

      }
    );

    this.longLeaveDetails = this.longLeaveService.getLongLeave();
    this.subscription = this.longLeaveService.longLeavesChanged.subscribe(
      (longLeave: LongLeave[]) => {
        this.longLeaveDetails = longLeave;
      }
    );
  }

  //attendnace delete
  onDelete(id: string){
    this.attendanceService.deleteAttendance(id); //this method call in the service fill and request a delete
    window.location.reload();

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
