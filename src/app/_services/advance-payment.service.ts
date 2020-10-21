import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AdvancePayment } from "../_models/advancePayment.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AdvancePaymentService {

  constructor(private http: HttpClient) { }

  getAdPays(nic:string){
    return this.http.get<AdvancePayment[]>(`${environment.apiUrl}advancePayment/${nic}`);
  }

  deleteAdPay(adPay: AdvancePayment) {
    return this.http.delete<AdvancePayment>(
      `${environment.apiUrl}advancePayment/${adPay._id}`
    );
  }

  addAdPay(advancePayment: AdvancePayment, nic: string) {
    return this.http.post<any>(
      `${environment.apiUrl}advancePayment/${nic}`,
      advancePayment,
      httpOptions
    );
  }

}
