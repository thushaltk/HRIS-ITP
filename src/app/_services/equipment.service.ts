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
}
