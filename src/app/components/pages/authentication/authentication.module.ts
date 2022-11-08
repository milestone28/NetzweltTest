import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication-components/login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';



@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent
  ],
  imports: [
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
