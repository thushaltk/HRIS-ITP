import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EmpLogin } from '../models/empLogin.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class EmpLoginService {
  empLoginChanged = new Subject<EmpLogin[]>();
  private empLoginsArr: EmpLogin[] = [];

  constructor(private http: HttpClient) { }

  addLogin(empLogin: EmpLogin) {
    const empLoginArray: EmpLogin = {
      id: empLogin.id,
      nic: empLogin.nic,
      password: empLogin.password,
      confPassword: empLogin.confPassword
    };
    this.http.post<{ message: string }>('http://localhost:3000/api/empLogin', empLoginArray)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.empLoginsArr.push(empLoginArray);
        this.empLoginChanged.next(this.empLoginsArr.slice());
      });

  }

  getLogin(nic: string){
    this.http.get<{message: string, empLogins: any}>('http://localhost:3000/api/empLogin/' + nic)
      .pipe(map((empLoginData) => {
          return empLoginData.empLogins.map(empLogin => {
            return{
              nic: empLogin.nic,
              password: empLogin.password,
              confPassword: empLogin.confPassword,
              id: empLogin._id
            };
          });
      }))
      .subscribe((transformedEmpLogins) => {
        this.empLoginsArr = transformedEmpLogins;
        this.empLoginChanged.next(this.empLoginsArr.slice());
      });
    return this.empLoginsArr.slice();
  }

}
