import { Component, OnInit } from '@angular/core';

export interface Employee {
  id: string;
  fullName: string;
  dob: string;
  nic: string;
  gender: string;
  address: string;
  cnumber: string;
  email: string;
  //empDes: string;
  doj: string;
  comment: string;
}

@Component({
  selector: 'app-emp-registry',
  templateUrl: './emp-registry.component.html',
  styleUrls: ['./emp-registry.component.css']
})
export class EmpRegistryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
