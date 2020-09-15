import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LongLeave } from '../models/longLeave.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LongLeavesService{
  longLeavesChanged = new Subject<LongLeave[]>();
  private longLeavesArr: LongLeave[] = [];

  constructor(private http: HttpClient){}

  getLongLeave(){
    this.http.get<{message: string, longLeaves: any}>('http://localhost:3000/api/longLeaves')
      .pipe(map((longLeavesData) => {
          return longLeavesData.longLeaves.map(longLeave => {
            return{
              empID: longLeave.empID,
              time: longLeave.time,
              startDate: longLeave.startDate,
              endDate: longLeave.endDate,
              id: longLeave._id,
              reason: longLeave.reason,
              status: longLeave.status
            };
          });
      }))
      .subscribe((transformedLongLeaves) => {
        this.longLeavesArr = transformedLongLeaves;
        this.longLeavesChanged.next(this.longLeavesArr.slice());
      });
    return this.longLeavesArr.slice();
  }

  getLongLeaveByID(id: string){
    this.http.get<{message: string, longLeaves: any}>("http://localhost:3000/api/longLeaves/" + id)
      .pipe(map((longLeavesData) => {
          return longLeavesData.longLeaves.map(longLeave => {
            return{
              empID: longLeave.empID,
              time: longLeave.time,
              startDate: longLeave.startDate,
              endDate: longLeave.endDate,
              id: longLeave._id,
              reason: longLeave.reason,
              status: longLeave.status
            };
          });
      }))
      .subscribe((transformedLongLeaves) => {
        this.longLeavesArr = transformedLongLeaves;
        this.longLeavesChanged.next(this.longLeavesArr.slice());
      });
    return this.longLeavesArr.slice();
  }

  addLongLeave(longLeave: LongLeave){
    const longLeaveArray: LongLeave = {
      id: longLeave.id,
      empID: longLeave.empID,
      time: longLeave.time,
      startDate: longLeave.startDate,
      endDate: longLeave.endDate,
      reason: longLeave.reason,
      status: longLeave.status
    };
    this.http.post<{message: string}>('http://localhost:3000/api/longLeaves', longLeaveArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.longLeavesArr.push(longLeaveArray);
        this.longLeavesChanged.next(this.longLeavesArr.slice());
      });

  }

  deleteLongLeave(longLeaveID: string){
    this.http.delete("http://localhost:3000/api/longLeaves/" + longLeaveID)
      .subscribe(() => {
        console.log('Deleted');
      })
  }

 updateLongLeaveStatus(longLeaveID: string, longLeave: LongLeave){
  const longLeaveArray: LongLeave = {
    id: longLeave.id,
    empID: longLeave.empID,
    time: longLeave.time,
    startDate: longLeave.startDate,
    endDate: longLeave.endDate,
    reason: longLeave.reason,
    status: longLeave.status
  };
  this.http.put("http://localhost:3000/api/longLeaves/" + longLeaveID, longLeaveArray)
  .subscribe(response => console.log(response));
 }
}
