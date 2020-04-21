import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import { CoursesService } from 'src/app/services/user/courses.service';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { element } from 'protractor';
import { NotificationService } from 'src/app/services/user/oop/notification.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit,OnDestroy {
//course_id;
removeSubscribe;notificationKey:string="";
  constructor( route:ActivatedRoute, course:CourseService,routUser:Router) {
    //route.paramMap.subscribe((params : ParamMap) => ser.setCurrentId( params.get('id') ) );
   let flag:boolean=false;
    this.removeSubscribe=route.paramMap.subscribe((params : ParamMap) =>{
      //UserService.hasGroups= UserService.user.univeristy
        /*for(let university=0;university<UserService.hasGroups.length;university++){
          for(let college=0;college<UserService.hasGroups[university].colleges.length;college++){
            if(UserService.hasGroups[university].colleges[college].courseCodes
                .find(course=> (course.code===params.get('id3')
                && UserService.hasGroups[university].colleges[college].id===params.get('id2')
                && UserService.hasGroups[university].id===params.get('id1')))){
              flag=true;
              break;
            }

          }
          if(flag) break;
        }*/
       // { if(college.courseCodes.find(course=> course===params.get('id')))  }
          
       Object.keys(UserService.hasGroups).forEach((universityKey :any)=>{
         
         if(universityKey!=params.get('id1'))
          flag=true;
        if(!flag)
        Object.keys(UserService.hasGroups[universityKey].colleages).forEach(( collegeKey: any) => {
          if(collegeKey!=params.get('id2'))
            flag=true;
          if(!flag)
          Object.keys(UserService.hasGroups[universityKey].colleages[collegeKey].courses).forEach(( courseKey: any) => {
            if(collegeKey!=params.get('id3'))
            flag=true;
          })
        })
       }) 

         if(!flag){; routUser.navigate(['page-not-found']);
         return;
        }
        this.notificationKey=params.get('id1')+params.get('id2')+params.get('id3');
        UserService.indexNotification="univeristy."+params.get('id1')+
          ".colleages."+params.get('id2')+".courses."+params.get('id3')
     course.setUrl( "universities/"+params.get('id1')+"/colleges/"+params.get('id2')+"/courses/"+params.get('id3'))
     })
     
    // routUser.navigate(['page-not-found'])
   }

   getPostNotification(){
      NotificationService.currNotification=NotificationService.notification.get(this.notificationKey)
      if( !NotificationService.currNotification)
        return ;
      if(NotificationService.currNotification.postsNumber)
         return  NotificationService.currNotification.postsNumber;
   }
   getAssignmentNotification(){
    NotificationService.currNotification=NotificationService.notification.get(this.notificationKey)
    if( !NotificationService.currNotification)
      return ;
    if(NotificationService.currNotification.assignmentsNumber)  
      return  NotificationService.currNotification.assignmentsNumber;
   }

   getCatrgoriesNotification(){
    NotificationService.currNotification=NotificationService.notification.get(this.notificationKey)
    if( !NotificationService.currNotification)
      return ;
      let counter=0;
     NotificationService.currNotification.categoriesNumber.forEach((value:number, key:string)=>{
      counter+=value;
    });
    if(counter)
        return counter;
   }

  ngOnDestroy(): void {
    if(this.removeSubscribe)
        this.removeSubscribe.unsubscribe();
  }

  ngOnInit() {
  }

}
