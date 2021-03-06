import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/oop/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../sb-admin-2.min.css']
})
export class LoginComponent implements OnInit { 

  login = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('',Validators.required)
  });

  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService, private router:Router) {
    
  }
  ngOnInit() {
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = ''; 
    this.password = '';
  }
  error:string='';
  showSpinner:boolean=false;

  signIn() {
    this.showSpinner=true;
    this.email = this.login.value.email; 
    this.password = this.login.value.password; 
    this.authenticationService.SignIn(this.email, this.password)
    .then(res => {
      
      this.router.navigate(['./user']);
      this.showSpinner=false;
      this.error='';
    })
    .catch(err => {
      
      this.error="the email or password is wrong!";
      this.showSpinner=false;
    });
  }
  
  signOut() {
    this.authenticationService.SignOut();
  }

  

  
}
