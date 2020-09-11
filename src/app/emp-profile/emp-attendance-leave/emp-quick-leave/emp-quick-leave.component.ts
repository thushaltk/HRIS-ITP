import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuickLeave } from 'models/quickLeave.model';
import { QuickLeavesService } from 'service/quickLeaves.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emp-quick-leave',
  templateUrl: './emp-quick-leave.component.html',
  styleUrls: ['./emp-quick-leave.component.css']
})
export class EmpQuickLeaveComponent implements OnInit {
  @ViewChild('qleave', { static: false }) addQuickLeaveForm: NgForm;
  nic : string;
  dateToday: number = Date.now();
  nicValid: boolean = true;
  isNodata: boolean = true;
  viewTable: boolean = false;
  quickLeave: QuickLeave = {
    id: '',
    nic: '',
    time: '',
    date: ''
  }

  getquickLeave: QuickLeave[] = [];
  private subscription: Subscription;

  constructor(private quickLeavesService: QuickLeavesService) { }

  ngOnInit(): void {
    this.getquickLeave = this.quickLeavesService.getQuickLeave();
    this.viewTable = true;
    this.subscription = this.quickLeavesService.quickLeavesChanged.subscribe(
      (quickLeaves : QuickLeave[]) => {
        this.getquickLeave = quickLeaves;
        console.log(this.getquickLeave.length);
        if(this.getquickLeave.length === 0){
          this.isNodata = true;
          console.log(this.getquickLeave);
        }else{
          this.isNodata = false;
          console.log(this.getquickLeave);
        }
      }
    );
  }

  onSubmit() {
    this.nic = this.addQuickLeaveForm.value.nic;
    if(this.nic.endsWith('V') && this.nic.length == 10){
      this.nicValid = true;
    }else{
      this.nicValid = false;
    }
    this.viewTable = true;

    this.quickLeave.id = null;
    this.quickLeave.nic = this.addQuickLeaveForm.value.nic;
    this.quickLeave.time = this.addQuickLeaveForm.value.time;
    this.quickLeave.date = this.addQuickLeaveForm.value.date;

    this.addQuickLeaveForm.reset();

    if(this.nicValid == true){
      this.quickLeavesService.addQuickLeave(this.quickLeave);
      this.isNodata = false;
    }


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
