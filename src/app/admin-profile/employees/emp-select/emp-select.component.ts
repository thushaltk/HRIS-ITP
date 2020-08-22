import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-select',
  templateUrl: './emp-select.component.html',
  styleUrls: ['./emp-select.component.css']
})
export class EmpSelectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
