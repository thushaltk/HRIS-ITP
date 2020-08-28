import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.css']
})
export class LoginEmpComponent implements OnInit {
  @ViewChild('f', {static: false}) empLoginForm: NgForm;
  constructor(private router: Router) { }
  nic : string;

  ngOnInit(): void {
  }

  showEmpProfile(){
    this.nic = this.empLoginForm.value.nic;
    this.router.navigate(['empProfile/', this.nic]);

  }

}
