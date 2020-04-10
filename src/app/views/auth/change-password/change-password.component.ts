import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../sb-admin-2.min.css']
})
export class ChangePasswordComponent implements OnInit {

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
