import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Employees } from '../../../../../models/employees.model';
import { EmployeeService } from 'service/employees.service';

@Component({
  selector: 'app-emp-reg',
  templateUrl: './emp-reg.component.html',
  styleUrls: ['./emp-reg.component.css']
})
export class EmpRegComponent implements OnInit {
  @ViewChild('empreg', {static: false}) addEmployee: NgForm;
  empID: string;
  mode : string = "create";
  employeeID: string;
  demoBtnClicked: boolean = false;
  nicInvalid: boolean = true;
  nic : string;
  employeeDetails: Employees[] = [];
  empDetails: Employees;

  employees: Employees = {
    id: '',
    fullName: '',
    dob: '',
    nic: '',
    empID: '',
    gender: '',
    address: '',
    cnumber: '',
    email: '',
    empDes: '',
    doj: '',
    comment: ''
  };
  submitted=false;

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private route: ActivatedRoute) { }



  ngOnInit(): void {
    //Below condition checks whether the URL has an ID
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {
      //Checks whether the ID is in the URL
      if (paramMap.has("id")) {
        this.mode = "edit";
        this.employeeID = paramMap.get("id");
        this.employeeDetails = this.employeeService.getEmployee();
        for(let emp of this.employeeDetails){
          if(emp.id === this.employeeID){
            this.empDetails = emp;
            this.empID = emp.empID;
          }else{
            continue;
          }

        }
      } else {
        this.mode = "create";
        this.employeeID = null;
        this.empID = "EMP"+Math.floor((Math.random() * 99999) + 10000).toString();
      }

    }))


  }

  //NIC validation method
  nicValidate(nic: string){
    if(nic.endsWith("V") && nic.length == 10){
      this.nicInvalid = false;
      console.log(this.nicInvalid);
    }else{
      this.nicInvalid = true;
    }

  }


  //When the "submit" is clicked, it runs the below function which takes data from form
  //and assign data to the "employees" object.
  onSubmit(){
    console.log(this.addEmployee);
    this.submitted = true;
    this.employees.id = this.employeeID;
    this.employees.empID = this.empID;
    this.employees.fullName = this.addEmployee.value.fullName;
    this.employees.dob = this.addEmployee.value.dob;
    this.employees.nic = this.addEmployee.value.nic;
    this.employees.gender = this.addEmployee.value.gender;
    this.employees.address = this.addEmployee.value.address;
    this.employees.cnumber = this.addEmployee.value.cnumber;
    this.employees.email = this.addEmployee.value.email;
    this.employees.empDes = this.addEmployee.value.empDes;
    this.employees.doj = this.addEmployee.value.doj;
    this.employees.comment = this.addEmployee.value.comment;

    if (this.mode === "create") {
      this.employeeService.addEmployee(this.employees);
      this.router.navigate(['../view'], {relativeTo: this.route});
    } else {
      this.employeeService.updateEmployees(this.employees);
      this.router.navigate(['../../', this.employees.empDes], {relativeTo: this.route});
    }

  }


  //DEMO button function
  fillDate(){
    this.employees.fullName = "Eishan Weerasinghe";
    this.employees.dob = "1997-06-12";
    this.employees.nic = "978884563V";
    this.employees.address = "35/A, Temple Road, Matara.";
    this.employees.cnumber = "0765788756";
    this.employees.email = "eish@gmail.com";
    this.employees.empDes = "manager";
    this.employees.doj = "2020-06-26";
    this.employees.comment = "None";
    this.demoBtnClicked = true;
  }

}
