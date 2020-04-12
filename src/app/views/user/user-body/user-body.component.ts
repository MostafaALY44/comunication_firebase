import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/oop/user.service';
import { User } from 'src/app/services/auth/user.model';
import { MessagingService } from 'src/app/services/auth/messaging.service';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { NotificationModel } from 'src/app/services/user/oop/models/CourseMode';
import { NotificationService } from 'src/app/services/user/oop/notification.service';



@Component({
  selector: 'user-body',
  templateUrl: './user-body.component.html',
  styleUrls: ['./user-body.component.css']
})
export class UserBodyComponent implements OnInit { 
 
  courses : User;
  notification: NotificationModel;
  constructor( private userService:UserService, private messag:MessagingService, 
    private notificationService:NotificationService) {//UserService

    this.notificationService.setNotificationMap();
    
      UserService.userObservable.subscribe(user=>{
        
        this.courses=user;
        //this.testMap=user.
      }
    )
    
  }

  getNotification(id1:string, id2:string, id3:string){
    let notification=NotificationService.notification.get(id1+id2+id3)
    if(!notification)
      return ;
    return notification.postsNumber+notification.categoriesNumber+notification.assignmentsNumber;
  }
  


  ngOnInit() {
  }

}
