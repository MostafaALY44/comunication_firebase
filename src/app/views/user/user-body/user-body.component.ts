import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/user/courses.service';



@Component({
  selector: 'user-body',
  templateUrl: './user-body.component.html',
  styleUrls: ['./user-body.component.css']
})
export class UserBodyComponent implements OnInit {

  courses: Observable<any[]>;
  constructor(ser: CoursesService) {
    this.courses = ser.getCourses();
  }

  ngOnInit() {
  }

}
