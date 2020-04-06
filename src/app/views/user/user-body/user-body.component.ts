import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/user/courses.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { User } from 'src/app/services/auth/user.model';
import { MessagingService } from 'src/app/services/auth/messaging.service';



@Component({
  selector: 'user-body',
  templateUrl: './user-body.component.html',
  styleUrls: ['./user-body.component.css']
})
export class UserBodyComponent implements OnInit { 
 
  courses : User;
  constructor(ser: CoursesService, private userService:UserService, private messag:MessagingService) {//UserService
    //this.courses = ser.getCourses();  
      UserService.userObservable.subscribe(
      user=>{this.courses=user}
    )
    
  }


  ngOnInit() {
  }

}
