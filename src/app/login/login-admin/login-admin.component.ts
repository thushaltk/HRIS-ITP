import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent implements OnInit {
  @ViewChild('f', { static: false }) adminLoginForm: NgForm;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  nic: string;
  password: string;
  user: any;

  ngOnInit(): void {}

  showAdminProfile() {
    this.nic = this.adminLoginForm.value.nic;
    this.password = this.adminLoginForm.value.password;
    this.user = { nic: this.nic, password: this.password };
    this.authService.loginUser(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res.token),
          localStorage.setItem('nic', res.userNic);
        this.toastr.success('Logged in succesfully');
        this.router.navigate(['admin/dashboard']);
      },
      (err) => {
        console.log(err);
        this.toastr.error('Invalid credentials');
      }
    );
  }
}
