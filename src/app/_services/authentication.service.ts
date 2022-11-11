import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Loginuserdetails } from '../models/db/auth/loginuserdetails';
import { LoginUserRequest } from '../models/requests/auth/login-user-request';
import { environment } from './../../environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  private currentUserSubject: BehaviorSubject<Loginuserdetails>;
  public currentUser: Observable<Loginuserdetails>;

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService
  ) {
    super();

    this.currentUserSubject = new BehaviorSubject<Loginuserdetails>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Loginuserdetails {
    return this.currentUserSubject.value;
  }


  public postLogin(LoginUserRequest: LoginUserRequest): Observable<any> {
    return this._http
      .post(
        this.GenerateUrl(environment.apiUrl, environment.loginUrl),
        LoginUserRequest,
        { observe: 'response' }
      )
      .pipe(
        map((data) => {
        
          if (data.status === 200) {
            let _tmp = [];
            let _tmpRoles = [];
            _tmp.push(data.body);
            _tmpRoles.push(_tmp[0].roles[0]);


            let user = new Loginuserdetails(
              _tmp[0].username,
              _tmp[0].displayName,
              _tmpRoles
            );
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          } else {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
           }

          return data;
        })
      );
  }

}
