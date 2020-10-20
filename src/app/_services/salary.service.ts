import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Salary } from '../_models/salary.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) { }

  // getSalary(){
  //   return this.http.get<Salary[]>(`${environment.apiUrl}salary`);
  // }

  addSalary(salary: any, nic: string) {
    return this.http.post<any>(
      `${environment.apiUrl}salary/${nic}`,
      salary,
      httpOptions
    );
  }

}
