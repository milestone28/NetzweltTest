import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { LoginUserRequest } from 'src/app/models/requests/auth/login-user-request';
import { AuthenticationService } from 'src/app/_services/authentication.service';
// import { UserService } from 'src/app/_services/user.service';
// import { ErrorMessage } from 'src/app/_utilities/error-message';
 import { Helper } from 'src/app/_utilities/helper';
// import { ReturnCode } from 'src/app/_utilities/return-code';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  user: any;
  message;

  constructor (
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _authenticationService: AuthenticationService,
    //private _userService: UserService,
    private _spinner: NgxSpinnerService,
    private _router: Router
  ) {
    if (_authenticationService.currentUserValue) {
      this._router.navigate(["/"]);
    }
  }

  get log() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {

    this._spinner.show();
    this.loginForm = this._fb.group({
      Username: [
        "",
        [Validators.required, Validators.pattern(Helper.nonWhitespaceRegExp)],
      ],
      Password: [
        "",
        [Validators.required, Validators.pattern(Helper.nonWhitespaceRegExp)],
      ],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._spinner.hide();
    }, 1000);
  }

  onSubmit() {
    this._spinner.show();
    this.submitted = true;

    this.loginForm = this._fb.group({
      Username: [
        this.loginForm.get("Username").value,
        [Validators.required, Validators.pattern(Helper.nonWhitespaceRegExp)],
      ],
      Password: [
        this.loginForm.get("Password").value,
        [Validators.required, Validators.pattern(Helper.nonWhitespaceRegExp)],
      ],
    });

    if (this.loginForm.invalid) {
      this._toastr.warning("Validation error(s) found.");
      this._spinner.hide();
      return;
    }

    if (this.submitted) {
      let addRequest = new LoginUserRequest(
        this.loginForm.get("Username").value,
        this.loginForm.get("Password").value
      );
     this.postLogin(addRequest);
     console.log(addRequest);
    }
  }

  postLogin(request: any) {
    // this._authenticationService
    //   .postLogin(request)
    //   .pipe(first())
    //   .subscribe(
    //     (result) => {

    //       if (result.result_code == ReturnCode.zero) {
    //        // this._toastr.success(result.result_msg);
    //         // this.messagingService.requestPermission();
    //         // this.messagingService.receiveMessage();
    //         // this.message = this.messagingService.currentMessage

    //       } else {
    //         if (result.result_msg == ErrorMessage.ErrorAuthHeader) {
    //           this._toastr.error(ErrorMessage.ErrorInvalidCredentials);
    //         } else {
    //           this._toastr.error(result.result_msg);
    //         }
    //         this._spinner.hide();
    //       }
    //     },
    //     (error) => {
    //       this._toastr.error(ErrorMessage.ErrorSomethingWent);
    //     },
    //     () => {
    //      this._spinner.hide();
    //     }
    //   );
  }


  hidepassword() {
    $("#password").attr("type", "password");
    $(".hidepassword").hide();
    $(".showpassword").show();
  }
  showpassword() {
    $("#password").attr("type", "text");
    $(".showpassword").hide();
    $(".hidepassword").show();
  }

}
