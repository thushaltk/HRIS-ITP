import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
}
