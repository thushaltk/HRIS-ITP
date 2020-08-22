import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-emp-reg',
  templateUrl: './emp-reg.component.html',
  styleUrls: ['./emp-reg.component.css']
})
export class EmpRegComponent implements OnInit {
  @ViewChild('empreg', {static: false}) addEmployee: NgForm;
  defaultValue = "choose";

  fullName = new FormControl();
  dob = new FormControl();
  nic = new FormControl();
  gender = new FormControl();
  address = new FormControl();
  cnumber = new FormControl();
  email = new FormControl();
  empDes = new FormControl();
  doj = new FormControl();
  comment = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }
  save(){
    alert (this.fullName.value);
    alert (this.empDes.value);
  }

  onSubmit(){

  }

}
