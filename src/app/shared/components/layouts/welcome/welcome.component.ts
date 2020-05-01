import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { WelcomeService } from 'src/app/services/announcement/welcome.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnDestroy {

  announcements;
  announcementId;
  removeSubscribe:Subscription;
  constructor(private service :WelcomeService) { 
    //this.wordSearch= new BehaviorSubject<string>("default");;
    this.removeSubscribe=this.service.getAnnouncement().subscribe(announcement=>{  
      this.announcements=announcement})
   
  }
  ngOnDestroy(): void {
    if(this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
  }
  //wordSearch:BehaviorSubject<string>

  isFocus:boolean=false;
  resiveIsFocusSearchEvent(event){
    this.isFocus=event;
  }

  /*resiveWordSearchEvent($event){
    this.wordSearch=$event;
  }*/

}
