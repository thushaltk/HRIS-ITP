import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('f', { static: false }) resetPass: NgForm;

  nic: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  reset() {
    this.nic = this.resetPass.value.nic;
    console.log(this.nic);

    this.authService.resetPass(this.nic).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 200) {
            this.toastr.success('You will recieve a email with the password');
          } else {
            this.toastr.error('User does not exits');
          }
        }
      }
    );
  }
}
