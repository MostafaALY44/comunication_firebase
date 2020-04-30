import { Injectable, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { CourseFirebaseService } from './firebaseService/course-firebase.service';
import { NotificationModel } from './models/CourseMode';
import { Subscription } from 'rxjs';
import { Category } from './class/category';
import 'firebase/firestore';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy{
  static notification:Map<string,NotificationModel>=new Map<string,NotificationModel>()
  static currNotification:NotificationModel={"postsNumber":0, "assignmentsNumber":0,
                                             "categoriesNumber":new Map<string,number>(), "pollingsNumber":0};
  private userService:UserService=new UserService(this.firestore)
  constructor(private courseFirebaseService:CourseFirebaseService, private firestore: AngularFirestore) { }
 
  private getCourseFromDB(url:string, courseId:string){
    return this.courseFirebaseService.read(url,courseId);
  }
  //"universities/"+"/colleges/"+params.get('id2')+"/courses/"+params.get('id3')
  removeSubscribe:Subscription[]= [];
  setNotificationMap(){
    let url:string, url2:string;
    
    let university= UserService.user.univeristy
    
    Object.keys(UserService.user.univeristy).forEach(( universityKey: any) => {
      
      Object.keys(university[universityKey].colleages).forEach(( collegeKey: any) => {
        
        Object.keys(university[universityKey].colleages[collegeKey].courses).forEach(( courseKey: any) => {

      });
    });
  });
 
  Object.keys(UserService.user.univeristy).forEach(( universityKey: any) => {
    url="universities/"+universityKey;
    Object.keys(university[universityKey].colleages).forEach(( collegeKey: any) => {
      url2=url+'/colleges/'+collegeKey;
      Object.keys(university[universityKey].colleages[collegeKey].courses).forEach(( courseKey: any) => {
        this.removeSubscribe.push(this.getCourseFromDB(url2, courseKey).subscribe(course=>{
          let x= course.postsNumber - UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].postNumber
          let y=course.assignmentsNumber -  UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].assignmentNumber
          let z=course.pollingsNumber -  UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].pollingNumber
          let temp=UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].categoriesNumber;
          let tempMap=new Map<string, number>()

            if(temp)
            Object.keys(temp).forEach(categoryId=>{
              tempMap.set(categoryId, temp[categoryId]);
            })
            
        
           let object={};
            let notification=NotificationService.notification.get(universityKey+collegeKey+courseKey)
            if(!notification){
              NotificationService.notification.set(universityKey+collegeKey+courseKey, {"postsNumber":0, "assignmentsNumber":0,
                                                                             "categoriesNumber":new Map<string,number>(), "pollingsNumber":0})
              notification=NotificationService.notification.get(universityKey+collegeKey+courseKey)
            }
            
            Object.keys(course.categoriesNumber).forEach(categoryKey=>{
              
              if(tempMap.has(categoryKey)){
                notification.categoriesNumber.set(categoryKey, course.categoriesNumber[categoryKey] - tempMap.get(categoryKey));
                tempMap.delete(categoryKey)
              }else{
                notification.categoriesNumber.set(categoryKey, course.categoriesNumber[categoryKey]);
                
              }
            })
            
            tempMap.forEach((value:number, key:string)=>{
              let obj={["univeristy."+universityKey+
              ".colleages."+collegeKey+
              ".courses."+courseKey+
              ".categoriesNumber."+key]:firebase.firestore.FieldValue.delete()}
              //let obj={[UserService.indexNotification+".categoryNumber."+key]:firebase.firestore.FieldValue.delete()}
              this.userService.update( obj)
            })
            
            if(x){
              x=(x<0)?0:x;
              object={"postsNumber":x};
              notification.postsNumber=x;
            }
            if(y){
              y=(y<0)?0:y;
              object={...object, ...{"assignmentsNumber":y}}
              notification.assignmentsNumber=y
            }
            if(z){
              z=(z<0)?0:z;
              object={...object, ...{"pollingsNumber":z}}
              notification.pollingsNumber=z
            }
        }))
        
    });
  });
});

  
   }


  dounsubscribe(){
    this.removeSubscribe.forEach(element => {
      element.unsubscribe();
    });
    this.removeSubscribe=[];
  }

  ngOnDestroy(): void {
      this.dounsubscribe();
  }

}
