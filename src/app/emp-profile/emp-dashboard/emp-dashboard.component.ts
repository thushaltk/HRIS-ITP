import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { EmployeeService } from 'service/employees.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {
  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {


  }

}
