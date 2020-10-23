import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpLogin } from 'models/empLogin.model';
import { EmpLoginService } from 'service/empLogin.service';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css']
})
export class RegisterEmpComponent implements OnInit {
  @ViewChild('newLogin', {static:false}) newLoginForm: NgForm;
  empLogins: EmpLogin = {
    id: '',
    nic: '',
    password: '',
    confPassword: ''
  };

  constructor(private router: Router,
              private empLoginService: EmpLoginService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.newLoginForm.value.password !== this.newLoginForm.value.confpassword){

    }else{
      this.empLogins.id = null;
      this.empLogins.nic = this.newLoginForm.value.nic;
      this.empLogins.password = this.newLoginForm.value.password;
      this.empLogins.confPassword = this.newLoginForm.value.confpassword;

      this.empLoginService.addLogin(this.empLogins);

      this.router.navigate(['../emp'], { relativeTo: this.route });
    }





  }

}
