import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
      (err) => {
        console.log(err);
        this.toastr.success('You will recieve a email with the password');
      },
      (res) => {
        console.log(res);
        this.toastr.success('You will recieve a email with the password');
      }
    );
  }
}
