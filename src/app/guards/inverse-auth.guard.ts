import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from '../services/user/oop/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class InverseAuthGuard   {
  constructor(private AuthService : AuthenticationService, private router:Router,private angularFireAuth: AngularFireAuth){}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.angularFireAuth.authState.pipe(
      take(1),
      map(user => !(!!user && user.emailVerified)),      //map to boolean
      tap(loggedIn => {
        if(!loggedIn){
          this.router.navigate(['']);
        }
      })
     )
  //     return UserService.userObservable.pipe(
  //       take(1),
  //       map(user => !(!!user && user.emailVerified)),      //map to boolean
  //       tap(loggedIn => {
  //         if(!loggedIn){
  //           this.router.navigate(['./user']);
  //         }
  //       }))
  }
  
}
