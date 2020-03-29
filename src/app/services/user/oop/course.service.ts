import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './class/Post';
import { Category } from 'src/app/services/user/oop/class/category';
import { PostFactoryService } from './factories/post-factory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoryFactoryService } from './class/category-factory.service';
import { PostModel } from './models/PostModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  static posts:Observable<Post[]>;
  static categories:Observable<Category[]>;

  courseId;
  constructor(private firestore: AngularFirestore) { }

  setCouserId(id:string){
    this.courseId=id;
    this.setPosts(); 
    this.setCategories()
  }

  setPosts(){
    CourseService.posts=new PostFactoryService('/courses/'+this.courseId, this.firestore).posts;
  }
  setCategories(){
    CourseService.categories=new CategoryFactoryService('/courses/'+this.courseId, this.firestore).categories;
  }

}
