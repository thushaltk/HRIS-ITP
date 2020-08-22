import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-emp-update',
  templateUrl: './emp-update.component.html',
  styleUrls: ['./emp-update.component.css']
})
export class EmpUpdateComponent implements OnInit {

  fullNameup = new FormControl();
  dobup = new FormControl();
  nicup = new FormControl();
  genderup = new FormControl();
  addressup = new FormControl();
  cnumberup = new FormControl();
  emailup = new FormControl();
  empDesup = new FormControl();
  dojup = new FormControl();
  commentup = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
