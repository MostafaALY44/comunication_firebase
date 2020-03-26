import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InverseAuthGuard implements CanActivateChild {
  constructor(private AuthService : AuthenticationService, private router:Router){}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.userData.pipe(
        take(1),
        map(user => !(!!user)),      //map to boolean
        tap(loggedIn => {
          if(!loggedIn){
            this.router.navigate(['./user']);
          }
        })
      )
  }
  
}
