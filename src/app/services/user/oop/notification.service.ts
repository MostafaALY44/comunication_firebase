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
    console.log(university)
    //console.log(Object.keys(university))
    Object.keys(UserService.user.univeristy).forEach(( universityKey: any) => {
      console.log(universityKey);
      console.log(university[universityKey].name);
      Object.keys(university[universityKey].colleages).forEach(( collegeKey: any) => {
        console.log(collegeKey);
        console.log(university[universityKey].colleages[collegeKey].name);
        Object.keys(university[universityKey].colleages[collegeKey].courses).forEach(( courseKey: any) => {
          console.log(courseKey);
      });
    });
  });
 
  Object.keys(UserService.user.univeristy).forEach(( universityKey: any) => {
    url="universities/"+universityKey;
    console.log(university[universityKey].name);
    Object.keys(university[universityKey].colleages).forEach(( collegeKey: any) => {
      url2=url+'/colleges/'+collegeKey;
      console.log(university[universityKey].colleages[collegeKey].name);
      Object.keys(university[universityKey].colleages[collegeKey].courses).forEach(( courseKey: any) => {
        this.removeSubscribe.push(this.getCourseFromDB(url2, courseKey).subscribe(course=>{
          console.log(course)
          let x= course.postsNumber - UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].postNumber
          let y=course.assignmentsNumber -  UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].assignmentNumber
          let z=course.pollingsNumber -  UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].pollingNumber
          let temp=UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].categoriesNumber;
          let tempMap=new Map<string, number>()

            if(temp)
            Object.keys(temp).forEach(categoryId=>{
              tempMap.set(categoryId, temp[categoryId]);
            })
            //let z=course.assignmentsNumber -  UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].categoriesNumber
            //console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||| ",x)
           // console.log("course.postsNumber - courseCode.postsNumber "+course.postsNumber+" - "+UserService.user.univeristy[universityKey].colleages[collegeKey].courses[courseKey].postNumber)
        
           let object={};
            let notification=NotificationService.notification.get(universityKey+collegeKey+courseKey)
            if(!notification){
              NotificationService.notification.set(universityKey+collegeKey+courseKey, {"postsNumber":0, "assignmentsNumber":0,
                                                                             "categoriesNumber":new Map<string,number>(), "pollingsNumber":0})
              notification=NotificationService.notification.get(universityKey+collegeKey+courseKey)
            }
            console.log("course ",course.categoriesNumber)
            
            Object.keys(course.categoriesNumber).forEach(categoryKey=>{
              //console.log(" course.categoriesNumber[categoryKey] ", course.categoriesNumber[categoryKey])
              //const xxx= tempMap.get(categoryKey)
              if(tempMap.has(categoryKey)){
                console.log("xxxx ", course.categoriesNumber[categoryKey] - tempMap.get(categoryKey))
                notification.categoriesNumber.set(categoryKey, course.categoriesNumber[categoryKey] - tempMap.get(categoryKey));
                tempMap.delete(categoryKey)
              }else{
                notification.categoriesNumber.set(categoryKey, course.categoriesNumber[categoryKey]);
                // let obj={[UserService.indexNotification+".categoryNumber."+categoryKey]:firebase.firestore.FieldValue.delete()}
                // this.userService.update( obj)
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

  //   UserService.user.univeristy.forEach((universityValue: any, universityKey: any)=>{
  //     url="universities/"+universityKey;
  //     universityValue.colleages.forEach((collegeValue: any, collegeKey: any)=>{
  //       url2=url+'/colleges/'+collegeKey;
  //       collegeValue.courses.forEach((courseValue: any, courseKey: any)=>{
  //         this.removeSubscribe.push(this.getCourseFromDB(url2, courseKey.code).subscribe(course=>{

            
  //           let x= course.postsNumber - courseValue.postNumber
  //           let y=course.assignmentsNumber - courseValue.assignmentNumber
  //           console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||| ",x)
  //           console.log("course.postsNumber - courseCode.postsNumber "+course.postsNumber+" - "+courseValue.postNumber)
  //           let object={};
  //           let notification=NotificationService.notification.get(universityKey+collegeKey+courseKey)
  //           if(!notification){
  //             NotificationService.notification.set(universityKey+collegeKey+courseKey, {"postsNumber":0, "assignmentsNumber":0, "categoriesNumber":0})
  //             notification=NotificationService.notification.get(universityKey+collegeKey+courseKey)
  //           }
            
  //           if(x){
  //             object={"postsNumber":x};
  //             notification.postsNumber=x;
  //           }
  //           if(y){
  //             object={...object, ...{"assignmentsNumber":y}}
  //             notification.assignmentsNumber=y
  //           }
  //         }))
  //       })
  //     })
  //   })
   }

  /*setNotificationMap(){
    let url:string, url2:string;
    UserService.user.universities.forEach(university=>{
      url="universities/"+university.id;
      university.colleges.forEach(college=>{
        url2=url+'/colleges/'+college.id;
        college.courseCodes.forEach(courseCode=>{
          this.removeSubscribe.push(this.getCourseFromDB(url2, courseCode.code).subscribe(course=>{

            
            let x= course.postsNumber - courseCode.postsNumber
            let y=course.assignmentsNumber - courseCode.assignmentsNumber
            console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||| ",x)
            console.log("course.postsNumber - courseCode.postsNumber "+course.postsNumber+" - "+courseCode.postsNumber)
            let object={};
            let notification=NotificationService.notification.get(university.id+college.id+courseCode.code)
            if(!notification){
              NotificationService.notification.set(university.id+college.id+courseCode.code, {"postsNumber":0, "assignmentsNumber":0, "categoriesNumber":0})
              notification=NotificationService.notification.get(university.id+college.id+courseCode.code)
            }
            
            if(x){
              object={"postsNumber":x};
              notification.postsNumber=x;
            }
            if(y){
              object={...object, ...{"assignmentsNumber":y}}
              notification.assignmentsNumber=y
            }
          }))
        })
      })
    })
  }*/

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
