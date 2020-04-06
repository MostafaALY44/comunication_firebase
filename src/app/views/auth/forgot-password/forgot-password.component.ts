import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../sb-admin-2.min.css']
})
export class ForgotPasswordComponent implements OnInit {

  frmPasswordReset: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  }); 
 
  constructor(private authenticationService: AuthenticationService,  private fb: FormBuilder) { 

  }

  
  sendPasswordResetRequest(){
    const email = this.frmPasswordReset.controls['email'].value;

    this.authenticationService.forgotPassword(email);

  }
  
 
  

  ngOnInit() {
  }



  
}
