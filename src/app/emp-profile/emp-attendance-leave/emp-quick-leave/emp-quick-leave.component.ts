import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuickLeave } from 'models/quickLeave.model';
import { QuickLeavesService } from 'service/quickLeaves.service';
import { Subscription } from 'rxjs';
import { Employees } from 'models/employees.model';
import { EmployeeService } from 'service/employees.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-emp-quick-leave',
  templateUrl: './emp-quick-leave.component.html',
  styleUrls: ['./emp-quick-leave.component.css']
})
export class EmpQuickLeaveComponent implements OnInit {
  @ViewChild('qleave', { static: false }) addQuickLeaveForm: NgForm;
  nic : string;
  dateToday: number = Date.now();
  isNodata: boolean = true;
  viewTable: boolean = false;
  quickLeave: QuickLeave = {
    id: '',
    time: '',
    date: '',
    reason: ''
  }
  getEmployee: Employees[] = [];
  getquickLeave: QuickLeave[] = [];
  private subscription: Subscription;

  constructor(private quickLeavesService: QuickLeavesService, private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getquickLeave = this.quickLeavesService.getQuickLeave();
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

    this.route.params.subscribe((params: Params) => {
      this.nic = params['nic'];
      console.log(this.nic);
      this.getEmployee = this.employeeService.getEmployee();
      this.subscription = this.employeeService.employeesChanged.subscribe(
        (employees: Employees[]) => {
          this.getEmployee = employees;
        }
      );
    });
  };

  onSubmit() {

    this.quickLeave.id = null;
    this.quickLeave.time = this.addQuickLeaveForm.value.time;
    this.quickLeave.date = this.addQuickLeaveForm.value.date;
    this.quickLeave.reason = this.addQuickLeaveForm.value.reason;

    this.addQuickLeaveForm.reset();

    this.quickLeavesService.addQuickLeave(this.quickLeave);
    this.isNodata = false;


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string){
    this.quickLeavesService.deleteQuickLeave(id);
    window.location.reload();
  }

}
