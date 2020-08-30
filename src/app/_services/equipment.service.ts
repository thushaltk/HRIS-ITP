import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private http: HttpClient) {}

  store(req) {
    return this.http.post(`${environment.apiUrl}equipment`, req);
  }

  getEquipments(){
    return this.http.get(`${environment.apiUrl}equipment`);
  }

  update(req) {
    return this.http.patch(`${environment.apiUrl}equipment`, req);
  }

  delete(req) {
    return this.http.delete(`${environment.apiUrl}equipment/${req._id}`, req);
  }
}
