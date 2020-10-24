import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login-emp',
  templateUrl: './login-emp.component.html',
  styleUrls: ['./login-emp.component.css'],
})
export class LoginEmpComponent implements OnInit {
  @ViewChild('f', { static: false }) empLoginForm: NgForm;
  constructor(private router: Router, private authService: AuthService) {}
  nic: string;
  password: string;
  user: any;

  ngOnInit(): void {}

  showEmpProfile() {
    this.nic = this.empLoginForm.value.nic;
    this.password = this.empLoginForm.value.password;
    this.user = { nic: this.nic, password: this.password };
    console.log(this.user);

    this.authService.loginUser(this.user).subscribe(
      (res) => {
        console.log(res),
          localStorage.setItem('token', res.token),
          localStorage.setItem('nic', res.userNic);
        this.router.navigate(['empProfile/dashboard']);
      },
      (err) => console.log(err)
    );
  }
}
