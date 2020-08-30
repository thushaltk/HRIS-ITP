import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  store(req) {
    return this.http.post(`${environment.apiUrl}project`, req);
  }

  update(req) {
    return this.http.patch(`${environment.apiUrl}project`, req);
  }

  delete(req) {
    return this.http.delete(`${environment.apiUrl}project/${req._id}`, req);
  }


  getProjects() {
    return this.http.get(`${environment.apiUrl}project`);
  }

  getEmployees() {
    return this.http.get(`${environment.apiUrl}employees`);
  }
}
