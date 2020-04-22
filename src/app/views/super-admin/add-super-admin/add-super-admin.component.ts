import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'add-super-admin',
  templateUrl: './add-super-admin.component.html',
  styleUrls: ['./add-super-admin.component.css']
})
export class AddSuperAdminComponent implements OnInit {

  constructor(router:Router) { 
    AuthenticationService.currentAdminLink= router.url;
  }

  ngOnInit() {
  }

}
