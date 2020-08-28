import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'service/employees.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit, OnDestroy {
  employees: Employees[] = [];
  private subscription: Subscription;
  nic: string;
  name: string;
  designation: string;


  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.nic = params['nic'];
      console.log(this.nic);
      this.employees = this.employeeService.getEmployee();
      this.subscription = this.employeeService.employeesChanged.subscribe(
        (employees: Employees[]) => {
          this.employees = employees;
          for(let employee of this.employees){
            if(employee.nic === this.nic){
              this.name = employee.fullName;
              this.designation = employee.empDes;
            }
          }
        }
      );
    });


  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
