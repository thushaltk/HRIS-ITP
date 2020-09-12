import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Payroll } from '../_models/payroll.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  constructor(private http: HttpClient) {}

  getPayroll() {
    return this.http.get<Payroll[]>(`${environment.apiUrl}payroll`);
  }

  deletePayroll(payroll: Payroll) {
    return this.http.delete<Payroll>(
      `${environment.apiUrl}payroll/${payroll._id}`
    );
  }

  addPayroll(payroll: Payroll) {
    return this.http.post<Payroll>(
      `${environment.apiUrl}payroll/${payroll._id}`,
      httpOptions
    );
  }
}
