import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from '../services/user/oop/user.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorGuard implements CanActivate {
  constructor(private auth: AuthenticationService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return UserService.userObservable.pipe(
        take(1),
        map(user => user && user.roles.instructor ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Access denied - instructor only')
          }
        }))
  } 
  
}
