import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Course } from './oop/models/CourseMode';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private currentId:string;
  private currentPosts:Observable<PostComment[]>;

  constructor(private firestore: AngularFirestore) {
  }

  public setCurrentId(id){
    this.currentId=id;
    //this.currentPosts=this.getCoursePosts(this.currentId);
  }

  /*public getCurrentPosts():Observable<PostComment[]>{
      return this.currentPosts;
  }*/
  public getCourses():Observable<Course[]>{
    return this.firestore.collection<Course>('courses').valueChanges();
  }

}
