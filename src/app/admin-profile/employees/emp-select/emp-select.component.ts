import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Employees } from 'models/employees.model';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'service/employees.service';

@Component({
  selector: 'app-emp-select',
  templateUrl: './emp-select.component.html',
  styleUrls: ['./emp-select.component.css']
})
export class EmpSelectComponent implements OnInit{

  constructor(private router: Router, private employeeService: EmployeeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }







}
