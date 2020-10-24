import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// import { EmployeeService } from 'service/employees.service';
// import { EmpLoginService } from 'service/empLogin.service';
// import { EmpLogin } from 'models/empLogin.model';
// import { Subscription } from 'rxjs';

import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.css'],
})
export class LoginEmpComponent implements OnInit {
  // @ViewChild('f', {static: false}) empLoginForm: NgForm;
  // nic : string;
  // password: string;
  // success: boolean = true;
  // empLogins: EmpLogin[] = [];
  // subscription: Subscription;

  // constructor(private router: Router,
  //             private empLoginService: EmpLoginService) { }

  // ngOnInit(): void {

  // }

  @ViewChild('f', { static: false }) empLoginForm: NgForm;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  nic: string;
  password: string;
  user: any;

  ngOnInit(): void {}

  showEmpProfile() {
    this.nic = this.empLoginForm.value.nic;
    this.password = this.empLoginForm.value.password;

    // this.empLogins = this.empLoginService.getLogin(this.nic);
    // this.subscription = this.empLoginService.empLoginChanged.subscribe(
    //   (empLogs: EmpLogin[]) => {
    //     this.empLogins = empLogs;
    //     for(let empLog of this.empLogins){
    //       if(this.nic === empLog.nic && this.password === empLog.password){
    //         this.router.navigate(['empProfile/', this.nic]);

    //       }else{
    //         this.success = false;
    //         console.log("WRONG");
    //         console.log(empLog.nic);
    //       }

    //     }
    //   }
    // );

    this.user = { nic: this.nic, password: this.password };
    console.log(this.user);

    this.authService.loginUser(this.user).subscribe(
      (res) => {
        console.log(res),
          localStorage.setItem('token', res.token),
          localStorage.setItem('nic', res.userNic);
        this.toastr.success('Logged in succesfully');
        this.router.navigate(['empProfile/dashboard']);
      },
      (err) => {
        console.log(err);
        this.toastr.error('Invalid Credentials');
      }
    );
  }
}
