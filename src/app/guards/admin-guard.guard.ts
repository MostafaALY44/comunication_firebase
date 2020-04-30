import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { take, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivateChild {
  constructor( private router:Router) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
    return AuthenticationService.isAdmin.asObservable().pipe(
      take(1),
      map(admin => admin),
      tap(loggedIn => {
      
        if(!loggedIn){
          setTimeout(()=>{
            this.router.navigate(['page-not-found'])
          },1000)
        
      
      } 
      })
    );
      //return this.AuthService.isEmailVerified()
  }
  
}
