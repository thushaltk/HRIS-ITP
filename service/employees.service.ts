import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employees } from '../models/employees.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeeService{
  employeesChanged = new Subject<Employees[]>();
  private employeesArr: Employees[] = [];

  constructor(private http: HttpClient){}

  getEmployee(){
    this.http.get<{message: string, employees: any}>('http://localhost:3000/api/employees')
      .pipe(map((employeeData) => {
          return employeeData.employees.map(employee => {
            return{
              fullName: employee.fullName,
              dob: employee.dob,
              nic: employee.nic,
              empID: employee.empID,
              gender: employee.gender,
              address: employee.address,
              cnumber: employee.cnumber,
              email: employee.email,
              empDes: employee.empDes,
              doj: employee.doj,
              comment: employee.comment,
              id: employee._id
            };
          });
      }))
      .subscribe((transformedEmployees) => {
        this.employeesArr = transformedEmployees;
        this.employeesChanged.next(this.employeesArr.slice());
      });
    return this.employeesArr.slice();
  }

  getEmployeeByDesignation(employeeDesignation: string){
    this.http.get<{message: string, employees: any}>('http://localhost:3000/api/employees/' + employeeDesignation)
      .pipe(map((employeeData) => {
          return employeeData.employees.map(employee => {
            return{
              fullName: employee.fullName,
              dob: employee.dob,
              nic: employee.nic,
              empID: employee.empID,
              gender: employee.gender,
              address: employee.address,
              cnumber: employee.cnumber,
              email: employee.email,
              empDes: employee.empDes,
              doj: employee.doj,
              comment: employee.comment,
              id: employee._id
            };
          });
      }))
      .subscribe((transformedEmployees) => {
        this.employeesArr = transformedEmployees;
        this.employeesChanged.next(this.employeesArr.slice());
      });
    return this.employeesArr.slice();
  }

  // getEmployeeByNIC(employeeNIC: string){
  //   this.http.get<{message: string, employees: any}>('http://localhost:3000/api/employees/' + employeeNIC)
  //     .pipe(map((employeeData) => {
  //         return employeeData.employees.map(employee => {
  //           return{
  //             fullName: employee.fullName,
  //             dob: employee.dob,
  //             nic: employee.nic,
  //             gender: employee.gender,
  //             address: employee.address,
  //             cnumber: employee.cnumber,
  //             email: employee.email,
  //             empDes: employee.empDes,
  //             doj: employee.doj,
  //             comment: employee.comment,
  //             id: employee._id
  //           };
  //         });
  //     }))
  //     .subscribe((transformedEmployees) => {
  //       this.employeesArr = transformedEmployees;
  //       this.employeesChanged.next(this.employeesArr.slice());
  //     });
  //     return this.employeesArr.slice();
  // }

  addEmployee(employee: Employees){
    const employeeArray: Employees = {
      id: employee.id,
      fullName: employee.fullName,
      dob: employee.dob,
      nic: employee.nic,
      empID: employee.empID,
      gender: employee.gender,
      address: employee.address,
      cnumber: employee.cnumber,
      email: employee.email,
      empDes: employee.empDes,
      doj: employee.doj,
      comment: employee.comment
    };
    this.http.post<{message: string}>('http://localhost:3000/api/employees', employeeArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.employeesArr.push(employeeArray);
        this.employeesChanged.next(this.employeesArr.slice());
      });

  }

  deleteEmployee(employeeID: string){
    this.http.delete("http://localhost:3000/api/employees/" + employeeID)
      .subscribe(() => {
        console.log('Deleted');
      })
  }
}
