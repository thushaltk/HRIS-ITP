import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Employees } from 'models/employees.model';
import { LongLeave } from 'models/longLeave.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'service/employees.service';
import { LongLeavesService } from 'service/longLeaves.service';

@Component({
  selector: 'app-emp-long-leave',
  templateUrl: './emp-long-leave.component.html',
  styleUrls: ['./emp-long-leave.component.css']
})
export class EmpLongLeaveComponent implements OnInit, OnDestroy {
  @ViewChild('lleave', { static: false}) addLongLeaveForm: NgForm;
  isNodata: boolean = true;
  viewTable: boolean = false;
  empID: string;
  nic: string;

  longLeave: LongLeave = {
    id: '',
    empID: '',
    time: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: ''
  }
  getEmployee: Employees[] = [];
  getlongLeave: LongLeave[] = [];
  getlongLeave2: LongLeave[] = [];
  private subscription: Subscription;
  dateToday: number = Date.now();

  constructor(private longLeaveService: LongLeavesService, private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.nic = params['nic'];
      console.log(this.nic);
      this.getEmployee = this.employeeService.getEmployee();
      this.subscription = this.employeeService.employeesChanged.subscribe(
        (employees: Employees[]) => {
          this.getEmployee = employees;
          for(let employee of this.getEmployee){
            if(employee.nic === this.nic){
              this.empID = employee.empID;
            }
          }
        }
      );
    });

    this.getlongLeave = this.longLeaveService.getLongLeave();
    this.subscription = this.longLeaveService.longLeavesChanged.subscribe(
      (longLeaves : LongLeave[]) => {
        this.getlongLeave = longLeaves;
        console.log(this.getlongLeave.length);
        if(this.getlongLeave.length === 0){
          this.isNodata = true;
          console.log(this.getlongLeave);
          console.log(this.nic);

        }else{
          this.isNodata = false;
          for(let longLeave of this.getlongLeave){
            if(longLeave.empID === this.empID){
              this.getlongLeave2.push(longLeave);
              console.log(this.getlongLeave2)
            }else{
              continue;
            }
          }
        }

      }
    );


  }

  onSubmit(){
    this.longLeave.id = null;
    this.longLeave.empID = this.addLongLeaveForm.value.empID,
    this.longLeave.time = this.addLongLeaveForm.value.time;
    this.longLeave.startDate = this.addLongLeaveForm.value.startdate;
    this.longLeave.endDate = this.addLongLeaveForm.value.enddate;
    this.longLeave.reason = this.addLongLeaveForm.value.reason;
    this.longLeave.status = "PENDING";

    this.longLeaveService.addLongLeave(this.longLeave);
    window.location.reload();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string){
    this.longLeaveService.deleteLongLeave(id);
    window.location.reload();

  }

}
