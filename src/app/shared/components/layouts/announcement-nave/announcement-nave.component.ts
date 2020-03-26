import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchInputService } from 'src/app/services/announcement/search-input.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-announcement-nave',
  templateUrl: './announcement-nave.component.html',
  styleUrls: ['./announcement-nave.component.css']
})
export class AnnouncementNaveComponent implements OnInit {
 // @Output() isFocusSearchEvent =new EventEmitter<any>();
  constructor(private router:Router, private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  /*isFocus:boolean=false;
  urlBeforeNavigate:string='';
  resiveIsFocusSearchEvent(event:boolean){
    this.isFocus=event;
    this.isFocusSearchEvent.emit(event);
    console.log(this.router.url+"++++++++++++++"+event)
    
    if(event){
      this.router.navigate(['announcements/local']);
      this.urlBeforeNavigate=this.router.url;
    }
    else
      this.router.navigate([this.urlBeforeNavigate])
  }*/

}
