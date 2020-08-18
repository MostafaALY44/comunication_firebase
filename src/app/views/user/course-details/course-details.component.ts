import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import { CoursesService } from 'src/app/services/user/courses.service';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { UserService } from 'src/app/services/user/oop/user.service';
import { element } from 'protractor';
import { NotificationService } from 'src/app/services/user/oop/notification.service';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Course } from 'src/app/services/user/oop/models/CourseMode';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { User } from 'src/app/services/auth/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionComponent } from './description/description.component';
import { DoctorContactsComponent } from './doctor-contacts/doctor-contacts.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit,OnDestroy {
course_id:string;
routerLink;
 mycourse:Observable<Course>;
 
static displayCourseName:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);
displayCourseName:boolean=true;
removeSubscribe2:Subscription;
CurrentUser;

removeSubscribe1;notificationKey:string="";
  constructor( route:ActivatedRoute, course:CourseService,private routUser:Router,private courseFirebaseService:CourseFirebaseService,private dialog:MatDialog) {
    this.CurrentUser=UserService.getUser();
    // console.log( this.routUser.url.slice(this.routUser.url.lastIndexOf("/")+1))
    CourseDetailsComponent.displayCourseName.next(true);
    this.removeSubscribe2=CourseDetailsComponent.displayCourseName.subscribe(can=>{
      this.displayCourseName=can;
    })
    //route.paramMap.subscribe((params : ParamMap) => ser.setCurrentId( params.get('id') ) );
   let flag:boolean=false;
    this.removeSubscribe1=route.paramMap.subscribe((params : ParamMap) =>{
      
      
        this.course_id=params.get('id3');
        this.routerLink="universities/"+params.get('id1')+"/colleges/"+params.get('id2')
        this.mycourse= this.courseFirebaseService.read(this.routerLink,this.course_id)
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
    if(!NotificationService.currNotification){
      NotificationService.currNotification={"postsNumber":0, "assignmentsNumber":0,
                                             "categoriesNumber":new Map<string,number>(), "pollingsNumber":0};
    }
   }

   getPostNotification(){
      NotificationService.currNotification=NotificationService.notification.get(this.notificationKey)
      if( !NotificationService.currNotification){
        NotificationService.currNotification={"postsNumber":0, "assignmentsNumber":0,
        "categoriesNumber":new Map<string,number>(), "pollingsNumber":0};
        return ;
      }
        
      if(NotificationService.currNotification.postsNumber)
         return  NotificationService.currNotification.postsNumber;
   }
   getAssignmentNotification(){
    NotificationService.currNotification=NotificationService.notification.get(this.notificationKey)
    if( !NotificationService.currNotification){
      NotificationService.currNotification={"postsNumber":0, "assignmentsNumber":0,
      "categoriesNumber":new Map<string,number>(), "pollingsNumber":0};
      return ;
    }
    if(NotificationService.currNotification.assignmentsNumber)  
      return  NotificationService.currNotification.assignmentsNumber;
   }

   getCatrgoriesNotification(){
    NotificationService.currNotification=NotificationService.notification.get(this.notificationKey)
    if( !NotificationService.currNotification){
      NotificationService.currNotification={"postsNumber":0, "assignmentsNumber":0,
      "categoriesNumber":new Map<string,number>(), "pollingsNumber":0};
      return ;
    }
      let counter=0;
     NotificationService.currNotification.categoriesNumber.forEach((value:number, key:string)=>{
      counter+=value;
    });
    counter=(counter<0) ? 0 : counter; 
    if(counter)
        return counter;
   }

   getBollingsNotification(){
    NotificationService.currNotification=NotificationService.notification.get(this.notificationKey)
    if( !NotificationService.currNotification){
      NotificationService.currNotification={"postsNumber":0, "assignmentsNumber":0,
      "categoriesNumber":new Map<string,number>(), "pollingsNumber":0};
      return ;
    }
    if(NotificationService.currNotification.pollingsNumber)  
      return  NotificationService.currNotification.pollingsNumber;
   }

  ngOnDestroy(): void {
    if(this.removeSubscribe1)
        this.removeSubscribe1.unsubscribe();
    if(this.removeSubscribe2)
        this.removeSubscribe2.unsubscribe();
  }

  ngOnInit() {
   
  }
  editDescription(){
    this.dialog.open(DescriptionComponent, {data:{"course":this.mycourse,"id":this.course_id,"link":this.routerLink},
    height: '300px',
    width: '400px',
  })
  }

  editContacts(){
    this.dialog.open(DoctorContactsComponent, {data:{"course":this.mycourse,"id":this.course_id,"link":this.routerLink},
    height: '300px',
    width: '400px',
  })
  }
}
