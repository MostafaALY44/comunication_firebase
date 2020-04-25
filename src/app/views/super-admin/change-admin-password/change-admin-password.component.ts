import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'change-admin-password',
  templateUrl: './change-admin-password.component.html',
  styleUrls: ['../../auth/sb-admin-2.min.css']
})
export class ChangeAdminPasswordComponent implements OnInit {

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
