import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ConfirmService } from '../shared/confirm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmService: ConfirmService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.confirmService.confirm(`Are you sure you want to logged out?`).then(
      (confirm) => {
        this.authService.logout();
        this.router.navigate(['']);

        this.toastr.success(`Logged out succesfully`);
      },
      (reject) => {}
    );
  }
}
