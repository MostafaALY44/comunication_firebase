import { Component, OnInit, OnDestroy } from '@angular/core';
import { Polling } from 'src/app/services/user/oop/class/Polling';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { NotificationService } from 'src/app/services/user/oop/notification.service';
import { PollingModel } from 'src/app/services/user/oop/models/PollingModel';
import { Subscription } from 'rxjs';
import { CourseDetailsComponent } from '../../../course-details/course-details.component';

@Component({
  selector: 'polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit, OnDestroy {

  coursepolls:PollingModel[]=[];

  removeSubscribe:Subscription;
  constructor(private userService:UserService) { 
    CourseDetailsComponent.displayCourseName.next(false)
   this.removeSubscribe=CourseService.polls.polles.subscribe(poll=>{
     
      this.coursepolls = poll;
      let obj={[UserService.indexNotification+".pollingNumber"]:poll.length}  
      this.userService.update( obj)
      if(NotificationService.currNotification)
        NotificationService.currNotification.pollingsNumber=0
    });
    
  }
  ngOnDestroy(): void {
    if(this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
    CourseDetailsComponent.displayCourseName.next(true);
  }

  ngOnInit() {
  }
  
  trackByPolling(index,poll){
   
    return poll? poll.id:undefined;
  }

  
  
}
