import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/oop/user.service';
import { NotificationService } from 'src/app/services/user/oop/notification.service';
import { CourseDetailsComponent } from '../../../course-details/course-details.component';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {

  constructor(private userService:UserService) {
    CourseDetailsComponent.displayCourseName.next(false)
   }
  ngOnDestroy(): void {
    CourseDetailsComponent.displayCourseName.next(true);
  }
  
  ngOnInit() {
  }

}
