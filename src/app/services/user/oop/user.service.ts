import { Injectable, OnDestroy } from '@angular/core';
import { User, university } from '../../auth/user.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AuthenticationService } from '../../auth/authentication.service';
import { Post } from './class/Post';
import { Category } from './class/category';
import { DocumentReference } from '@angular/fire/firestore/interfaces';
interface Course{
  posts: Post,
  categories: Category,
  assignments: Observable<Assignment[]>;
  isCategoryLoad:Observable<boolean>;
};

interface HasGroups{
  name:string,
  group:string[]
}
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  static userObservable:Observable<User>
  static user:User= new User();
  private static removeSubscribe;
  static getUser(){
    return UserService.user
  }
  static setUser(){
    //return UserService.user;
    if(UserService.removeSubscribe)
        UserService.removeSubscribe.unsubscribe();
    UserService.removeSubscribe= UserService.userObservable.subscribe(user=>{
      if(user){
          UserService.user=user
          //console.log("}}}}}}}}} "+UserService.user.emailVerified)
          UserService.hasGroups=user.universities
      }else UserService.user.emailVerified=false;
    })
  }
  //static loadedCourses:Map<string, Course> = new Map<string, Course>();
  //static hasGroups:HasGroups[];
  static hasGroups:university[]=[]; 
 
  constructor() {
    //console.log("+++++++++++++++++++++++++++++++++++")
    // this.removeSubscribe= UserService.userObservable.subscribe(user=>{
    //   if(user){
    //       UserService.user=user
    //       console.log("}}}}}}}}} "+UserService.user.emailVerified)
    //       UserService.hasGroups=user.universities
    //   }else UserService.user.emailVerified=false;
    // })
  }

  getUserObservable():Observable<User>{
    if(UserService.userObservable)
    return UserService.userObservable;
  }
  ngOnDestroy(): void {
    if(UserService.removeSubscribe)
      UserService.removeSubscribe.unsubscribe();
  }




  /*public getCourses():Observable<Course[]>{
    return this.firestore.collection<Course>('courses').valueChanges();
  }*/

}
