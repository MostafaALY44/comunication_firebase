import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'courses-body',
  templateUrl: './courses-body.component.html',
  styleUrls: ['./courses-body.component.css']
})
export class CoursesBodyComponent implements OnInit {

  constructor(router:Router) { 
    AuthenticationService.currentAdminLink= router.url;
  }

  ngOnInit() {
  }

}
