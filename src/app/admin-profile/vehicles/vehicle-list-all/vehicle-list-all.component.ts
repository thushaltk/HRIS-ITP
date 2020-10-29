import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../../../_models/vehicle.model';
import { Subscription } from 'rxjs';
import { VehiclesServices } from 'src/app/_services/vehicle.service';

@Component({
  selector: 'app-vehicle-list-all',
  templateUrl: './vehicle-list-all.component.html',
  styleUrls: ['./vehicle-list-all.component.css']
})
export class VehicleListAllComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[] = [];
  private subscription: Subscription;
  constructor(private router: Router, private vehicleService: VehiclesServices) { }


  ngOnInit(): void {
    // this.vehicles = this.vehicleService.getVehicles();
    // this.subscription = this.vehicleService.vehicleChanged.subscribe(
    //   (vehicles: Vehicles[]) => {
    //     this.vehicles = vehicles;
    //   }
    // );
    // console.log(this.vehicles);


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }




  // onDelete(id: string){
  //   this.vehicleService.deleteVehicle(id);
  //   window.location.reload();

  // }
}
