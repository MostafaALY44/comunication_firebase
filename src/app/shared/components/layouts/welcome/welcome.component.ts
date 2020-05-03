import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { WelcomeService } from 'src/app/services/announcement/welcome.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

interface BannerImage{
  url:string;
  caption:string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnDestroy {

  images:BannerImage[] = [
    {url:'https://4.bp.blogspot.com/-i8fGVSgdNDY/WJMrRqsAbzI/AAAAAAAAA6E/SVEXMGM_kPkgq11ClRPNkMQAWOtQ1nnSgCK4B/s1600/ain-shams.jpg', caption:'كلية العلوم'},
    {url:'https://www.elbalad.news/upload/photo/news/363/2/600x338o/734.jpg', caption:'assignments'},
    {url:'https://lh3.googleusercontent.com/proxy/BtCN-uWLWjerwP67QJChkvky0gaMt_VwBcvPF0D70pdfF8yFutHveh0ZW9hO7BPOeyPACueF0JO5XfhhN3zo4fcB9Vqs-gvtmIAkLx2Sjq4', caption:'جامعة عين شمس كلية العلوم'},
    {url:'https://i1.wp.com/alshrqalawsat.com/wp-content/uploads/2019/11/1.png?fit=995%2C350&ssl=1', caption:'جامعة عين شمس'},
  ];

  announcements;
  announcementId;
  removeSubscribe:Subscription;
  constructor(private service :WelcomeService, config: NgbCarouselConfig) { 
    //this.wordSearch= new BehaviorSubject<string>("default");;
    this.removeSubscribe=this.service.getAnnouncement().subscribe(announcement=>{  
      this.announcements=announcement})


      // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
   
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
