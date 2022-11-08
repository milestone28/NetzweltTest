import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    ) { }
}
