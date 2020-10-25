import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('changePass', { static: false }) updatePass: NgForm;

  nic: string;
  oldPass: string;
  newPass: string;
  confPass: string;
  pass: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.nic = this.updatePass.value.nic;
    this.oldPass = this.updatePass.value.oldPass;
    this.newPass = this.updatePass.value.newPass;
    this.confPass = this.updatePass.value.confPass;

    if (this.newPass !== this.confPass) {
      return this.toastr.error('Passwords do not match');
    }

    this.pass = { nic: this.nic, oldPass: this.oldPass, newPass: this.newPass };
    this.authService.updatePass(this.pass).subscribe(
      (res) => console.log(res),
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 200) {
            this.toastr.success('Password changed succesfully');
          } else {
            this.toastr.error('Old password is wrong');
          }
        }
      }
    );
  }
}
