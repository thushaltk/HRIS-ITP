import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Attendance } from '../models/attendance.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class AttendanceService {
  attendanceChanged = new Subject<Attendance[]>();
  private attendanceArr: Attendance[] = [];

  constructor(private http: HttpClient) { }

  getAttendance() {
    this.http.get<{ message: string, attendances: any }>('http://localhost:3000/api/attendance')
      .pipe(map((attendanceData) => {
        return attendanceData.attendances.map(attendance => {
          return {
            fullName: attendance.fullName,
            nic: attendance.nic,
            empID: attendance.empID,
            date: attendance.date,
            designation: attendance.designation,
            arriveTime: attendance.arriveTime,
            leaveTime: attendance.leaveTime,
            id: attendance._id
          };
        });
      }))
      .subscribe((transformedAttendances) => {
        this.attendanceArr = transformedAttendances;
        this.attendanceChanged.next(this.attendanceArr.slice());
      });
    return this.attendanceArr.slice();
  }

  getAttendanceByID(id: string) {
    return {...this.attendanceArr.find(attID => attID.id === id)};
  }

  addAttendance(attendance: Attendance) {
    const attendanceArray: Attendance = {
      id: attendance.id,
      fullName: attendance.fullName,
      nic: attendance.nic,
      date: attendance.date,
      empID: attendance.empID,
      designation: attendance.designation,
      arriveTime: attendance.arriveTime,
      leaveTime: attendance.leaveTime
    };
    this.http.post<{ message: string }>('http://localhost:3000/api/attendance', attendanceArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.attendanceArr.push(attendanceArray);
        this.attendanceChanged.next(this.attendanceArr.slice());
      });

  }

  updateAttendance(attendance: Attendance) {
    const attendanceArray: Attendance = {
      id: attendance.id,
      fullName: attendance.fullName,
      nic: attendance.nic,
      date: attendance.date,
      empID: attendance.empID,
      designation: attendance.designation,
      arriveTime: attendance.arriveTime,
      leaveTime: attendance.leaveTime
    };
    this.http.put('http://localhost:3000/api/attendance/' + attendance.id, attendanceArray)
      .subscribe(response => {
        const updatedAttendances = [...this.attendanceArr];
        const oldAttendanceIndex = updatedAttendances.findIndex(att => att.id === attendanceArray.id);
        updatedAttendances[oldAttendanceIndex] = attendanceArray;
        this.attendanceArr = updatedAttendances;
        this.attendanceChanged.next([...this.attendanceArr]);
      });
  }

  deleteAttendance(attendanceID: string) {
    this.http.delete("http://localhost:3000/api/attendance/" + attendanceID)
      .subscribe(() => {
        const updatedAttendance = this.attendanceArr.filter(attendances => attendances.id !== attendanceID);
        this.attendanceArr = updatedAttendance;
        this.attendanceChanged.next(this.attendanceArr.slice());
      })
  }




}
