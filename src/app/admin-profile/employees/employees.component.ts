import { Component, OnInit } from '@angular/core';
import { Employees } from 'models/employees.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employees[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
