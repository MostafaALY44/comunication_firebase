import { Component, OnInit, OnDestroy } from '@angular/core';
import { Polling } from 'src/app/services/user/oop/class/Polling';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { NotificationService } from 'src/app/services/user/oop/notification.service';
import { PollingModel } from 'src/app/services/user/oop/models/PollingModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit, OnDestroy {

  coursepolls:PollingModel[]=[];

  removeSubscribe:Subscription;
  constructor(private userService:UserService) { 
   this.removeSubscribe=CourseService.polls.polles.subscribe(poll=>{
      this.coursepolls = poll;
      let obj={[UserService.indexNotification+".pollingNumber"]:this.coursepolls.length}  
      this.userService.update( obj)
      NotificationService.currNotification.pollingsNumber=0
    });
    
  }
  ngOnDestroy(): void {
    if(this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
  }

  ngOnInit() {
  }
  
  trackByPolling(index){
    if(this.coursepolls)
      return (index < (this.coursepolls.length-1))? index:undefined
    return undefined;
  }

  // getOptionsMap(pollId){
  //   this.coursepolls.polles..forEach((element)=>{
  //     if(this.optionsVoting.has(element.idOption))
  //       this.optionsVoting.set(element.idOption, this.optionsVoting.get(element.idOption) +1);
  //     else
  //       this.optionsVoting.set(element.idOption, 1);
  //   })
  // }
  
  
}
