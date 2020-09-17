import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  selectValue: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  onDelete(){

  }

  navigate(e){
    if(e.target.value === "Allocated Vehicles"){
      this.router.navigate(['allocated'], {relativeTo: this.route});
    }else if(e.target.value === "Unallocated Vehicles"){
      this.router.navigate(['unallocated'], {relativeTo: this.route});
    }else{
      this.router.navigate(['all'], {relativeTo: this.route});
    }

  }
}
