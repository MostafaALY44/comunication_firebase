import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../sb-admin-2.min.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) {}

  ngOnInit() {
  }

  email: string;
  password: string;
  signUp() {
    this.authenticationService.SignUp(this.email, this.password)
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password)    
  }

  signOut() { 
    this.authenticationService.SignOut();
  }

}
