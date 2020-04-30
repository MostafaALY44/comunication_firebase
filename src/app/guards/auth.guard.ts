import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from '../services/user/oop/user.service';

@Injectable({
  providedIn: 'root'
})


//@Injectable()
export class AuthGuard implements CanActivateChild   {

  constructor(private authService:AuthenticationService, private router:Router) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return UserService.userObservable.pipe(
      take(1),
      map(user => (!!user && user.emailVerified)),      //map to boolean
      tap(loggedIn => {
        if(AuthenticationService.goVerificate)
          this.router.navigate(['']);

        else if(!loggedIn){
          this.router.navigate(['auth/login']);
        }
      }))
      //return this.AuthService.isEmailVerified()
  }
  
}
