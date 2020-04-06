import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import { CoursesService } from 'src/app/services/user/courses.service';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { element } from 'protractor';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit,OnDestroy {
//course_id;
removeSubscribe;
  constructor( route:ActivatedRoute, course:CourseService,routUser:Router) {
    //route.paramMap.subscribe((params : ParamMap) => ser.setCurrentId( params.get('id') ) );
   let flag:boolean=false;
    this.removeSubscribe=route.paramMap.subscribe((params : ParamMap) =>{
      UserService.hasGroups
        for(let university=0;university<UserService.hasGroups.length;university++){
          for(let college=0;college<UserService.hasGroups[university].colleges.length;college++){
            if(UserService.hasGroups[university].colleges[college].courseCodes.find(course=> course===params.get('id'))){
              flag=true;
              break;
            }

          }
          if(flag) break;
        }
       // { if(college.courseCodes.find(course=> course===params.get('id')))  }
          
         if(!flag){ routUser.navigate(['page-not-found']);
         return;
        }
       // console.log("------------------");
     course.setCouserId( params.get('id'))
     
     })
     
    // routUser.navigate(['page-not-found'])
   }

  ngOnDestroy(): void {
    if(this.removeSubscribe)
        this.removeSubscribe.unsubscribe();
  }

  ngOnInit() {
  }

}
