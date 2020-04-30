import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../sb-admin-2.min.css']
})
export class SignupComponent implements OnInit {


  isUserAgree = false;

  constructor(private authenticationService:AuthenticationService,private service: UserService,private _snackBar: MatSnackBar,private router: Router) {}

  ngOnInit() {
  }

  email: string;
  
  
  signUp() {
    

    firebase.auth().fetchSignInMethodsForEmail(this.email).then(methods => {
      if(methods.length>0) {
        this._snackBar.open('Your are Already registered !!!','', { duration: 5000, });
    }
      else this.authenticationService.forgotPassword(this.email);
    }).catch(err=>{
      this._snackBar.open(err,'', { duration: 5000, });
    })
        
    
  }


  signOut() { 
    
    this.authenticationService.SignOut();
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  privacyRedirect(){
    this.router.navigate(['privacy']);
  }
  termsRedirect(){
    this.router.navigate(['terms-and-conditions']);
  }


}
