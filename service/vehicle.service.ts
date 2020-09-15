import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vehicles } from '../models/vehicles.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VehiclesServices {
  vehicleChanged = new Subject<Vehicles[]>();
  private vehiclesArr: Vehicles[] = [];

  constructor(private http: HttpClient) { }

  getVehicles() {
    this.http.get<{ message: string, vehicles: any }>('http://localhost:3000/api/vehicles')
      .pipe(map((vehicleData) => {
        return vehicleData.vehicles.map(vehicles => {
          return {
            vehicleNo: vehicles.vehicleNo,
            vehicleType: vehicles.vehicleType,
            vehicleChaseNo: vehicles.vehicleChaseNo,
            vehicleEngineNo: vehicles.vehicleEngineNo,
            vehicleManufactureNo: vehicles.vehicleManufactureNo,
            vehicleColor: vehicles.vehicleColor,
            vehiclePurchaseDate: vehicles.vehiclePurchaseDate,
            vehicleOpenMileage: vehicles.vehicleOpenMileage,
            insuranceType: vehicles.insuranceType,
            vehicleRegistedDistrict: vehicles.vehicleRegistedDistrict,
            nextLicenceRenewalDate: vehicles.nextLicenceRenewalDate,
            vehiclePreviousOwner: vehicles.vehiclePreviousOwner,
            NIC: vehicles.NIC,
            contactNumber: vehicles.contactNumber,
            address: vehicles.address,
            id: vehicles._id
          };
        });
      }))
      .subscribe((transformedVehicles) => {
        this.vehiclesArr = transformedVehicles;
        this.vehicleChanged.next(this.vehiclesArr.slice());
      });
    return this.vehiclesArr.slice();
  }

  addVehicle(vehicles: Vehicles) {
    const vehiclesArray: Vehicles = {
      id: vehicles.id,
      vehicleNo: vehicles.vehicleNo,
      vehicleType: vehicles.vehicleType,
      vehicleChaseNo: vehicles.vehicleChaseNo,
      vehicleEngineNo: vehicles.vehicleEngineNo,
      vehicleManufactureNo: vehicles.vehicleManufactureNo,
      vehicleColor: vehicles.vehicleColor,
      vehiclePurchaseDate: vehicles.vehiclePurchaseDate,
      vehicleOpenMileage: vehicles.vehicleOpenMileage,
      insuranceType: vehicles.insuranceType,
      vehicleRegistedDistrict: vehicles.vehicleRegistedDistrict,
      nextLicenceRenewalDate: vehicles.nextLicenceRenewalDate,
      vehiclePreviousOwner: vehicles.vehiclePreviousOwner,
      NIC: vehicles.NIC,
      contactNumber: vehicles.contactNumber,
      address: vehicles.address,
    };
    this.http.post<{ message: string }>('http://localhost:3000/api/vehicles', vehiclesArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.vehiclesArr.push(vehiclesArray);
        this.vehicleChanged.next(this.vehiclesArr.slice());
      });

  }

  deleteVehicle(vehicleID: string) {
    this.http.delete("http://localhost:3000/api/vehicles/" + vehicleID)
      .subscribe(() => {
        console.log('Deleted');
      })
  }
}
