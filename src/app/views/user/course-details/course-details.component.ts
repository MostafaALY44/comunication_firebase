import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/services/user/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
//course_id;
  constructor(ser:CoursesService, route:ActivatedRoute) {
    route.paramMap.subscribe((params : ParamMap) => ser.setCurrentId( params.get('id') ) );
   }

  ngOnInit() {
  }

}
