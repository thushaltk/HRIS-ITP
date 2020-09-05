import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'service/employees.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-emp-registry',
  templateUrl: './emp-registry.component.html',
  styleUrls: ['./emp-registry.component.css']
})
export class EmpRegistryComponent implements OnInit, OnDestroy {
  employees: Employees[] = [];
  private subscription: Subscription;
  designation: string;
  title: string;
  isLoading = false;

  constructor(private router: Router, private employeeService: EmployeeService,
    private route: ActivatedRoute ) { }

  ngOnInit(){
    this.isLoading=true;
    this.route.params.subscribe((params: Params) => {
      this.designation = params['designation'];
      if(this.designation == 'manager'){
        this.title="Manager's";
      }else if(this.designation == 'engineer'){
        this.title="Engineer's";
      }else if(this.designation == 'itoperator'){
        this.title="IT Operator's";
      }else if(this.designation == 'accountant'){
        this.title="Accountant's";
      }else if(this.designation == 'supervisor'){
        this.title="Supervisor's";
      }else if(this.designation == 'labor'){
        this.title="Labor's";
      }else if(this.designation == 'driver'){
        this.title="Driver's";
      }else if(this.designation == 'cleaningstaff'){
        this.title="Cleaning Staff's";
      }else if(this.designation == 'securitystaff'){
        this.title="Security Staff's";
      }
      this.employees = this.employeeService.getEmployeeByDesignation(this.designation);
      this.subscription = this.employeeService.employeesChanged.subscribe(
        (employees: Employees[]) => {
          this.employees = employees;
          this.isLoading = false;
        }
      );
    });
  }

  onDelete(id: string){
    this.employeeService.deleteEmployee(id);
    window.location.reload();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
