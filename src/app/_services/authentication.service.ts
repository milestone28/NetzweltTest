import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseService } from "./base.service";
import { BehaviorSubject, Observable } from 'rxjs';
import { Loginuserdetails } from '../models/db/auth/loginuserdetails';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService{

  private currentUserSubject: BehaviorSubject<Loginuserdetails>;
  public currentUser: Observable<Loginuserdetails>;
  
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    ) { 
      super();
      this.currentUserSubject = new BehaviorSubject<Loginuserdetails>(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Loginuserdetails {
      return this.currentUserSubject.value;
  }

  
}
