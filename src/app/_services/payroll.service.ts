import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Payroll } from '../_models/payroll.model';

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
}
