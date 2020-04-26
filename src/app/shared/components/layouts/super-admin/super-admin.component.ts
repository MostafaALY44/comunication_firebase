import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  link;
  constructor(private authenticationService:AuthenticationService) { 
   this.link= AuthenticationService.adminIdLink;
  }

  ngOnInit() {
  }
  logout(){
    this.authenticationService.SignOut();
  }
}
