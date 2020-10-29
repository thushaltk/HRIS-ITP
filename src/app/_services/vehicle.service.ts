import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class VehiclesServices {

  constructor(private http: HttpClient) {}

  store(req) {
    return this.http.post(`${environment.apiUrl}vehicles`, req);
  }

  getVehicles(){
    return this.http.get(`${environment.apiUrl}vehicles`);
  }

  update(req) {
    return this.http.patch(`${environment.apiUrl}vehicles`, req);
  }
  
  getEmployees() {
    return this.http.get(`${environment.apiUrl}employees`);
  }

  delete(req) {
    const options = {
      headers: {},
      body: req
    }
    return this.http.delete(`${environment.apiUrl}vehicles`, options);
  }
}
