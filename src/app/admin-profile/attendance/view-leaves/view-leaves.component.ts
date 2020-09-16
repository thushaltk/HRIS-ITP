import { Component, OnInit } from '@angular/core';
import { LongLeave } from 'models/longLeave.model';
import { Subscription } from 'rxjs';
import { LongLeavesService } from 'service/longLeaves.service';

@Component({
  selector: 'app-view-leaves',
  templateUrl: './view-leaves.component.html',
  styleUrls: ['./view-leaves.component.css']
})
export class ViewLeavesComponent implements OnInit {
  getlongLeave: LongLeave[] = [];
  getlongLeave2: LongLeave[] = [];
  isNodata: boolean = true;
  private subscription: Subscription;

  constructor(private longLeaveService: LongLeavesService) { }

  ngOnInit(): void {
    this.getlongLeave = this.longLeaveService.getLongLeave();
    this.subscription = this.longLeaveService.longLeavesChanged.subscribe(
      (longLeaves : LongLeave[]) => {
        this.getlongLeave = longLeaves;
        console.log(this.getlongLeave.length);
        if(this.getlongLeave.length === 0){
          this.isNodata = true;
          console.log(this.getlongLeave);
        }else{
          this.isNodata = false;
          console.log(this.getlongLeave);
        }

      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  approve(id :string){
    this.getlongLeave2 = this.longLeaveService.getLongLeaveByID(id);
    for(let longLeave2 of this.getlongLeave2){
      if(longLeave2.id === id){
        longLeave2.status = "APPROVED";
        this.longLeaveService.updateLongLeaveStatus(id, longLeave2);
        window.location.reload();
      }
    }

  }

  reject(id: string){
    this.getlongLeave2 = this.longLeaveService.getLongLeaveByID(id);
    for(let longLeave2 of this.getlongLeave2){
      if(longLeave2.id === id){
        longLeave2.status = "REJECTED";
        this.longLeaveService.updateLongLeaveStatus(id, longLeave2);
        window.location.reload();
      }
    }


  }

}
