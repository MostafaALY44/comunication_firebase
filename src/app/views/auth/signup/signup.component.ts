import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../sb-admin-2.min.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private service: UserService,private _snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  email: string;
  //name: string;
  //password:string;
  signUp() {
    
      
      this.authenticationService.forgotPassword(this.email);
   
    this._snackBar.open('please check your Email to continue this process!' ,'', { duration: 3000, });
    
  }

  // signIn() {
  //   this.authenticationService.SignIn(this.email, this.password)    
  // }

  signOut() { 
    this.authenticationService.SignOut();
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

}
