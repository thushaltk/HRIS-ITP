import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(user) {
    return this.http.post<any>(`${environment.apiUrl}login`, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getNic() {
    return localStorage.getItem('nic');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nic');
    this.router.navigate[''];
  }

  resetPass(nic: string) {
    return this.http.post<any>(
      `${environment.apiUrl}employees/resetPassword/${nic}`,
      nic
    );
  }
}
