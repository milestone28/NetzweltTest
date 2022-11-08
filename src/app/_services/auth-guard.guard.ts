import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
constructor(private router: Router, private authenticationService: AuthenticationService){

}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      var user = this.authenticationService.currentUserValue;
      if(user){
        // logged in so return true
        return true;
      }
        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this.router.navigate(['/account/login']);
      return false;
  }
  
}
