import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'edit-persons',
  templateUrl: './edit-persons.component.html',
  styleUrls: ['./edit-persons.component.css']
})
export class EditPersonsComponent implements OnInit {

  constructor(router:Router) { 
    AuthenticationService.currentAdminLink= router.url;
  }
isClicked:boolean=false;
  showPersons(event){
    if(event.index===1){
      this.isClicked=true;
    }else this.isClicked=false;
    
  }
  ngOnInit() {
  }

}
