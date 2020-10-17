import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Attendance } from 'models/attendance.model';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'service/attendance.service';
import { EmployeeService } from 'service/employees.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {
  @ViewChild('atdnce', { static: false }) addAttendanceForm: NgForm;
  dateToday: number = Date.now();
  employeeName: string;
  employeeID : string;
  empDesignation: string;
  private subscription: Subscription;
  employeeDetails : Employees[] = [];
  attendances: Attendance = {
    id: '',
    fullName: '',
    empID: '',
    date: '',
    designation: '',
    arriveTime: '',
    leaveTime: '',
    nic: ''
  }


  constructor(private employeeDetailsService: EmployeeService,
              private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    //get all employee names -> from employee collection
    //get all designations -> from employee collection
  }

  onSubmit(){
    this.attendances.id = null;
    this.attendances.fullName = this.addAttendanceForm.value.empName;
    this.attendances.empID = this.addAttendanceForm.value.empID;
    this.attendances.date = this.addAttendanceForm.value.dateAtnd;
    this.attendances.designation = this.addAttendanceForm.value.empDes;
    this.attendances.arriveTime = this.addAttendanceForm.value.arriveTime;
    this.attendances.leaveTime = this.addAttendanceForm.value.leaveTime;
    this.attendances.nic = this.addAttendanceForm.value.nic;

    this.addAttendanceForm.reset();

    this.attendanceService.addAttendance(this.attendances);


  }

  getEmpDetails(nic: string){
    this.employeeDetails = this.employeeDetailsService.getEmployee();
    this.subscription = this.employeeDetailsService.employeesChanged.subscribe(
      (employees: Employees[]) => {
        this.employeeDetails = employees;
        for(let emp of this.employeeDetails){
          if(emp.nic === nic){
            this.employeeName = emp.fullName;
            this.empDesignation = emp.empDes;
            this.employeeID = emp.empID;
            console.log(emp.nic);
          }else{
            continue;
          }

        }
      }
    );


  }

}
