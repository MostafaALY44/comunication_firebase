import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
//import { CoursesService } from 'src/app/services/user/courses.service';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit,OnDestroy {
//course_id;
removeSubscribe;
  constructor( route:ActivatedRoute, course:CourseService) {
    //route.paramMap.subscribe((params : ParamMap) => ser.setCurrentId( params.get('id') ) );
    this.removeSubscribe=route.paramMap.subscribe((params : ParamMap) =>{
      
     course.setCouserId( params.get('id'))
     
     })
     
    
   }
  ngOnDestroy(): void {
    this.removeSubscribe.unsubscribe();
  }

  ngOnInit() {
  }

}
