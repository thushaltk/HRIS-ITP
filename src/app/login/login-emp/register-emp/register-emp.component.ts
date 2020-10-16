import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css']
})
export class RegisterEmpComponent implements OnInit {
  @ViewChild('newLogin', {static:false}) newLoginForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

}
