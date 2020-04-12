import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WelcomeService } from 'src/app/services/announcement/welcome.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  announcements;
  announcementId;
  constructor(private service :WelcomeService) { 
    //this.wordSearch= new BehaviorSubject<string>("default");;
    this.service.getAnnouncement().subscribe(announcement=>{  
      this.announcements=announcement});
   
  }
  //wordSearch:BehaviorSubject<string>
  ngOnInit() {
  }
  isFocus:boolean=false;
  resiveIsFocusSearchEvent(event){
    this.isFocus=event;
  }

  /*resiveWordSearchEvent($event){
    this.wordSearch=$event;
  }*/

}
