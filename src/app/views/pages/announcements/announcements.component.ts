import { Component, OnInit } from '@angular/core';
import { SearchInputService } from 'src/app/services/announcement/search-input.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { LocalAnnouncementService } from 'src/app/services/announcement/local-announcement.service';
import { GlobalAnnouncementService } from 'src/app/services/announcement/global-announcement.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  localTags :Observable<Tags[]>
  globalTags:Observable<Tags[]>
  constructor(private searchService:SearchInputService, route:Router,
    private authenticationService:AuthenticationService,
    localAnnouncementService:LocalAnnouncementService,
    globalAnnouncementService:GlobalAnnouncementService) { 
    let routers: string[] = route.url.split('/')
    if(routers.length >2){
      if(routers[2] == 'local')
        this.changeGlobalAngle();
    }else
      route.navigate(['announcements/global'])

      this.localTags=localAnnouncementService.getLocalTags("SH9s5fwOcaSswkeF7KMH");
      this.globalTags=globalAnnouncementService.getGlobalTags();
   }
  word:string
  globalAngleBottom:boolean=true;
  globalAngleRight:boolean=false;
  localAngleRight:boolean=true;

  //localAngleLeft:boolean=true;
 // globalAngleLeft:boolean=true;
  ngOnInit() {
    this.searchService.isFocus=true;
    this.searchService.currentWord.subscribe((word)=>this.word=word);
  }

  ngOnDestroy() {
    this.searchService.isFocus=false;
  }

  /*changeLocalAngle():void{
    this.localAngleLeft=!this.localAngleLeft;
    if(!this.localAngleLeft)
      this.globalAngleLeft=true;
  }*/

  changeGlobalAngle():void{
    this.globalAngleBottom=!this.globalAngleBottom;
    this.globalAngleRight = !this.globalAngleRight;
    this.localAngleRight = !this.globalAngleRight;
    /*if(this.globalAngleRight)
      this.localAngleRight=false;*/
  }


}
