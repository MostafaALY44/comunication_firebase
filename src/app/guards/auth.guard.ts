import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/*class UserToken {}
class Permissions {
  canLoadChildren(user: UserToken, id: string, segments: UrlSegment[]): boolean {
    return true;
  }
}*/

//@Injectable()
export class AuthGuard    {

  constructor(private AuthService : AuthenticationService, private router:Router) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.AuthService.userData.pipe(
      take(1),
      map(user => !!user),      //map to boolean
      tap(loggedIn => {
        if(!loggedIn){
          this.router.navigate(['auth/login']);
        }
      }))
      //return this.AuthService.isEmailVerified()
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.AuthService.userData.pipe(
      take(1),
      map(user => !!user),      //map to boolean
      tap(loggedIn => {
        if(!loggedIn){
          this.router.navigate(['auth/login']);
        }
      })
    )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.AuthService.userData.pipe(
        take(1),
        map(user => !!user),      //map to boolean
        tap(loggedIn => {
          if(!loggedIn){
            this.router.navigate(['auth/login']);
          }
        })
      )
     // return this.AuthService.isEmailVerified()
    }
}
