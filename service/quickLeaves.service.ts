import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QuickLeave } from '../models/quickLeave.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class QuickLeavesService{
  quickLeavesChanged = new Subject<QuickLeave[]>();
  private quickLeavesArr: QuickLeave[] = [];

  constructor(private http: HttpClient){}

  getQuickLeave(){
    this.http.get<{message: string, quickLeaves: any}>('http://localhost:3000/api/quickLeaves')
      .pipe(map((quickLeavesData) => {
          return quickLeavesData.quickLeaves.map(quickLeave => {
            return{
              time: quickLeave.time,
              date: quickLeave.date,
              id: quickLeave._id,
              reason: quickLeave.reason
            };
          });
      }))
      .subscribe((transformedQuickLeaves) => {
        this.quickLeavesArr = transformedQuickLeaves;
        this.quickLeavesChanged.next(this.quickLeavesArr.slice());
      });
    return this.quickLeavesArr.slice();
  }

  addQuickLeave(quickLeave: QuickLeave){
    const quickLeaveArray: QuickLeave = {
      id: quickLeave.id,
      time: quickLeave.time,
      date: quickLeave.date,
      reason: quickLeave.reason
    };
    this.http.post<{message: string}>('http://localhost:3000/api/quickLeaves', quickLeaveArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.quickLeavesArr.push(quickLeaveArray);
        this.quickLeavesChanged.next(this.quickLeavesArr.slice());
      });

  }

  deleteQuickLeave(quickLeaveID: string){
    this.http.delete("http://localhost:3000/api/quickLeaves/" + quickLeaveID)
      .subscribe(() => {
        console.log('Deleted');
      })
  }
}
