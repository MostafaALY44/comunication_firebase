import { Injectable, OnDestroy } from '@angular/core';
import { User, university } from '../../auth/user.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../../auth/authentication.service';
import { Post } from './class/Post';
import { Category } from './class/category';
import { DocumentReference } from '@angular/fire/firestore/interfaces';
import { CourseService } from './course.service';
interface CourseTab{
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
  static indexNotification:string="";
  public static removeSubscribe;
  static temp:Observable<User>;
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
          UserService.hasGroups=user.univeristy
      }else UserService.user.emailVerified=false;
    })
  }
  //static loadedCourses:Map<string, CourseTab> = new Map<string, Course>();
  //static hasGroups:HasGroups[];
  static hasGroups =[]; 
 
  constructor(private firestore: AngularFirestore) {
    
  }

  getUserObservable():Observable<User>{
    if(UserService.userObservable)
    return UserService.userObservable;
  }
  ngOnDestroy(): void {
    if(UserService.removeSubscribe)
      UserService.removeSubscribe.unsubscribe();
  }

 update(data): Promise<void>{
  return this.firestore.doc('users/'+UserService.user.uid).update(data);
 }
 delete(id):Promise<void>{
   return this.firestore.doc('users/'+id).delete();
 }
  getAll(): Observable<User[]>{
    return this.firestore.collection<User>('users/').valueChanges();
 }
 getAllByUniversity(idUniversity,idCollege): Observable<User[]>{
  return this.firestore.collection<User>('users/',ref=>ref
  .where(`univeristy.${idUniversity}.colleages.${idCollege}`,'>',{})
  ).valueChanges();
}


  getUserById(userId: string): Observable<User> {
    return this.firestore.doc<User>('users/' + userId).valueChanges();
  }

 updatePerson(id,data): Promise<void>{
  return this.firestore.collection('users/').doc(id).update(data);
 }

}
