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
            vehicleNumber: vehicles.vehicleNumber,
            vehicleType: vehicles.vehicleType,
            vehicleChaseNumber: vehicles.vehicleChaseNumber,
            vehicleEngineNumber: vehicles.vehicleEngineNumber,
            manufactureDate: vehicles.manufactureDate,
            vehicleColor: vehicles.vehicleColor,
            vehiclePurchaseDate: vehicles.vehiclePurchaseDate,
            vehicleOpenMileage: vehicles.vehicleOpenMileage,
            insuranceType: vehicles.insuranceType,
            vehicleRegisteredDistrict: vehicles.vehicleRegisteredDistrict,
            nextLicenseRenewalDate: vehicles.nextLicenseRenewalDate,
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

  getVehicleID(id: string){
    return {...this.vehiclesArr.find(vehicleAtt => vehicleAtt.id === id)};

  }

  addVehicle(vehicles: Vehicles) {
    const vehiclesArray: Vehicles = {
      id: vehicles.id,
      vehicleNumber: vehicles.vehicleNumber,
      vehicleType: vehicles.vehicleType,
      vehicleChaseNumber: vehicles.vehicleChaseNumber,
      vehicleEngineNumber: vehicles.vehicleEngineNumber,
      manufactureDate: vehicles.manufactureDate,
      vehicleColor: vehicles.vehicleColor,
      vehiclePurchaseDate: vehicles.vehiclePurchaseDate,
      vehicleOpenMileage: vehicles.vehicleOpenMileage,
      insuranceType: vehicles.insuranceType,
      vehicleRegisteredDistrict: vehicles.vehicleRegisteredDistrict,
      nextLicenseRenewalDate: vehicles.nextLicenseRenewalDate,
      vehiclePreviousOwner: vehicles.vehiclePreviousOwner,
      NIC: vehicles.NIC,
      contactNumber: vehicles.contactNumber,
      address: vehicles.address
    };
    this.http.post<{ message: string }>('http://localhost:3000/api/vehicles', vehiclesArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.vehiclesArr.push(vehiclesArray);
        this.vehicleChanged.next(this.vehiclesArr.slice());
      });

  }

  updateVehicle(vehicles: Vehicles) {
    const vehiclesArray: Vehicles = {
      id: vehicles.id,
      vehicleNumber: vehicles.vehicleNumber,
      vehicleType: vehicles.vehicleType,
      vehicleChaseNumber: vehicles.vehicleChaseNumber,
      vehicleEngineNumber: vehicles.vehicleEngineNumber,
      manufactureDate: vehicles.manufactureDate,
      vehicleColor: vehicles.vehicleColor,
      vehiclePurchaseDate: vehicles.vehiclePurchaseDate,
      vehicleOpenMileage: vehicles.vehicleOpenMileage,
      insuranceType: vehicles.insuranceType,
      vehicleRegisteredDistrict: vehicles.vehicleRegisteredDistrict,
      nextLicenseRenewalDate: vehicles.nextLicenseRenewalDate,
      vehiclePreviousOwner: vehicles.vehiclePreviousOwner,
      NIC: vehicles.NIC,
      contactNumber: vehicles.contactNumber,
      address: vehicles.address
    };
    this.http.put("http://localhost:3000/api/vehicles/" + vehicles.id, vehiclesArray)
      .subscribe(response => {
        const updatedVehicles = [...this.vehiclesArr];
        const oldVehiclesIndex = updatedVehicles.findIndex(veh => veh.id === vehiclesArray.id);
        updatedVehicles[oldVehiclesIndex] = vehiclesArray;
        this.vehiclesArr = updatedVehicles;
        this.vehicleChanged.next([...this.vehiclesArr]);
      });
  }

  deleteVehicle(vehicleID: string) {
    this.http.delete("http://localhost:3000/api/vehicles/" + vehicleID)
      .subscribe(() => {
        console.log('Deleted');
      })
  }
}
