import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  employeeName: string;
  dateToday: string;
  employeeID : string;
  attendanceID: string;
  empDesignation: string;
  getDetailsBtnClicked: boolean = false;
  mode: string = "create";
  private subscription: Subscription;
  employeeDetails : Employees[] = [];
  attendanceDetails: Attendance;
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


  constructor(private router: Router,
              private employeeDetailsService: EmployeeService,
              private attendanceService: AttendanceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //get all employee names -> from employee collection
    //get all designations -> from employee collection
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    this.dateToday = year+"-"+(month+1)+"-"+day;
    console.log(this.dateToday);
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {
      if (paramMap.has("attid")) {
        this.mode = "edit";
        this.attendanceID = paramMap.get("attid");
        this.attendanceDetails = this.attendanceService.getAttendanceByID(this.attendanceID);
      } else {
        this.mode = "create";
        this.attendanceID = null;
      }

    }))
  }

  onSubmit(){
    this.attendances.id = this.attendanceID;
    this.attendances.fullName = this.addAttendanceForm.value.empName;
    this.attendances.empID = this.addAttendanceForm.value.empID;
    this.attendances.date = this.addAttendanceForm.value.dateAtnd;
    this.attendances.designation = this.addAttendanceForm.value.empDes;
    this.attendances.arriveTime = this.addAttendanceForm.value.arriveTime;
    this.attendances.leaveTime = this.addAttendanceForm.value.leaveTime;
    this.attendances.nic = this.addAttendanceForm.value.nic;

    if (this.mode === "create") {
      this.attendanceService.addAttendance(this.attendances);
      this.router.navigate(['../../attendance'], { relativeTo: this.route });
    } else {
      this.attendanceService.updateAttendance(this.attendances);
      this.router.navigate(['../../../attendance'], { relativeTo: this.route });
    }

  }

  getEmpDetails(nic: string){
    this.getDetailsBtnClicked = true;
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
